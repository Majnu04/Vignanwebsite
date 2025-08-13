import { Request, Response } from 'express';
import NewsEvent from '../models/newsEventsModel';
import fs from 'fs';
import path from 'path';

export const createEvent = async (req: Request, res: Response) => {
  try {
    const { type, title, date, description, pathlink, bgColor } = req.body;
    const image = req.file?.filename;

    const newEvent = await NewsEvent.create({
      type,
      title,
      date,
      description,
      pathlink,
      bgColor,
      image
    });

    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await NewsEvent.find().sort({ createdAt: -1 });
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { _id } = req.params;
    const { type, title, date, description, pathlink, bgColor } = req.body;

    const newsEvents = await NewsEvent.findById(_id);
    if (!newsEvents) {
      return res.status(404).json({ error: 'News Event not found' });
    }

    // Update text fields
    newsEvents.title = title || newsEvents.title;
    newsEvents.date = date || newsEvents.date;
    newsEvents.type = type || newsEvents.type;
    newsEvents.description = description || newsEvents.description;
    newsEvents.pathlink = pathlink || newsEvents.pathlink;
    newsEvents.bgColor = bgColor || newsEvents.bgColor;

    // If new image is uploaded, delete old one
    if (req.file && req.file.filename) {
      const oldImagePath = path.join(__dirname, '..', 'uploads', newsEvents.image);
      console.log("Old image path:", oldImagePath);

      if (newsEvents.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
        console.log("Old image deleted successfully");
      } else {
        console.log("Old image does not exist or path incorrect");
      }

      newsEvents.image = req.file.filename;
    }

    const updated = await newsEvents.save();
    res.status(200).json(updated);
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: err.message || 'Something went wrong while updating' });
  }
};



export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const event = await NewsEvent.findOne({_id});

    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Delete image from disk
    const imagePath = path.join(__dirname, '..', 'uploads', event.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    await event.deleteOne();
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
