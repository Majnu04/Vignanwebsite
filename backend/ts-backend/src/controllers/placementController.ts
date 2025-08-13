import { Request, Response } from 'express';
import Placement from '../models/placementModel';
import fs from 'fs';
import path from 'path';

export const createPlacement = async (req: Request, res: Response) => {
  try {
    const { student, company, package: pkg } = req.body;

    const image = req.files && (req.files as any).image ? (req.files as any).image[0].filename : '';
    const companyLogo = req.files && (req.files as any).companyLogo ? (req.files as any).companyLogo[0].filename : '';

    const newPlacement = await Placement.create({
      student,
      company,
      package: pkg,
      image,
      companyLogo,
    });

    res.status(201).json(newPlacement);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getAllPlacements = async (_req: Request, res: Response) => {
  try {
    const placements = await Placement.find().sort({ createdAt: -1 });
    res.status(200).json(placements);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const updatePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const { student, company, package: pkg } = req.body;

    const placement = await Placement.findById(_id);
    if (!placement) {
      return res.status(404).json({ error: 'Placement not found' });
    }

    // Update text fields
    placement.student = student || placement.student;
    placement.company = company || placement.company;
    placement.package = pkg || placement.package;

    // Replace image if uploaded
    if (req.files && (req.files as any).image) {
      const newImage = (req.files as any).image[0].filename;
      const oldImagePath = path.join(__dirname, '..', 'uploads', placement.image);
      if (placement.image && fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
      placement.image = newImage;
    }

    // Replace companyLogo if uploaded
    if (req.files && (req.files as any).companyLogo) {
      const newLogo = (req.files as any).companyLogo[0].filename;
      const oldLogoPath = path.join(__dirname, '..', 'uploads', placement.companyLogo);
      if (placement.companyLogo && fs.existsSync(oldLogoPath)) {
        fs.unlinkSync(oldLogoPath);
      }
      placement.companyLogo = newLogo;
    }

    const updatedPlacement = await placement.save();
    res.status(200).json(updatedPlacement);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const deletePlacement = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params;
    const placement = await Placement.findById(_id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }

    // Delete image files
    const imagePath = path.join(__dirname, '..', 'uploads', placement.image);
    if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

    const logoPath = path.join(__dirname, '..', 'uploads', placement.companyLogo);
    if (fs.existsSync(logoPath)) fs.unlinkSync(logoPath);

    await placement.deleteOne();
    res.status(200).json({ message: 'Placement deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
