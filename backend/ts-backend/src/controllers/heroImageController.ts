import { Request, Response } from "express";
import HeroImage from "../models/heroImageModel";
import path from 'path';
import fs from 'fs';

// Add new hero image
export const createHeroImage = async (req: Request, res: Response) => {
  try {
    const {title}=req.body;
    const desktopImage = req.files?.desktopImage?.[0]?.filename;
    const mobileImage = req.files?.mobileImage?.[0]?.filename;

    if (!desktopImage || !mobileImage) {
      return res.status(400).json({ message: "Both images are required." });
    }

    const newImage = new HeroImage({ title, desktopImage, mobileImage });
    await newImage.save();

    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ error: "Failed to upload hero image" });
  }
};

// Get all hero images
export const getHeroImages = async (_req: Request, res: Response) => {
  try {
    const images = await HeroImage.find();
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch hero images" });
  }
};

export const updateHeroImage = async (req, res) => {
  try {
    const { _id } = req.params;
    const {title}=req.body;
    const desktopImage = req.files?.desktopImage?.[0]?.filename;
    const mobileImage = req.files?.mobileImage?.[0]?.filename;

    const heroImage = await HeroImage.findOne({ _id });
    if (!heroImage) {
      return res.status(404).json({ error: 'Hero Image not found' });
    }

    heroImage.title = title || heroImage.title;

    // Replace images if uploaded
    if (req.files?.desktopImage) {
      const heroPath = path.join(__dirname, '..', 'uploads', heroImage.desktopImage);
      if (heroImage.desktopImage && fs.existsSync(heroPath)) {
      fs.unlinkSync(heroPath);
      }

      heroImage.desktopImage = req.files.desktopImage[0].filename;
    }

    if (req.files?.mobileImage) {
        const hodPath = path.join(__dirname, '..', 'uploads', heroImage.mobileImage);
        if (heroImage.mobileImage && fs.existsSync(hodPath)) {
        fs.unlinkSync(hodPath);
      }
      heroImage.mobileImage = req.files.mobileImage[0].filename;
    }

    const updated = await heroImage.save();
    res.status(200).json(updated);

  } catch (err) {
  console.error('Update error:', err);  // already done ✅
  res.status(500).json({ error: err.message || 'Something went wrong while updating' }); // <-- update this
}

};


// Delete hero image
export const deleteHeroImage = async (req: Request, res: Response) => {
 
  try {
    const { _id } = req.params;
    const heroImage = await HeroImage.findOne({_id});
    console.log("sorry");

    if (!heroImage) return res.status(404).json({ message: 'hero image not found' });

    // Delete image from disk
    const imagePathM = path.join(__dirname, '..', 'uploads', heroImage.mobileImage);
    if (fs.existsSync(imagePathM)) fs.unlinkSync(imagePathM);

    const imagePathD = path.join(__dirname, '..', 'uploads', heroImage.desktopImage);
    if (fs.existsSync(imagePathD)) fs.unlinkSync(imagePathD);


    await heroImage.deleteOne();
    res.status(200).json({ message: 'hero image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }

};
