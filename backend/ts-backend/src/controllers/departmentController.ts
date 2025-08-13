// import departmentModel from '../models/departmentModel';

// // Add Department
// export const addDepartment = async (req, res) => {
//   try {
//     const {
//       code, name, about, hodMessage, hodName,
//       vision, mission, faculty
//     } = req.body;

//     // Parse JSON strings if sent from form as string
//     const missionArray = JSON.parse(mission);
//     const facultyArray = JSON.parse(faculty);

//     const newDept = new departmentModel({
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       hodImage: req.files['hodImage']?.[0]?.path,
//       heroImage: req.files['heroImage']?.[0]?.path,
//       vision,
//       mission: missionArray,
//       faculty: facultyArray
//     });

//     await newDept.save();
//     res.status(201).json({ message: 'Department added successfully' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error adding department' });
//   }
// };

// // Edit/Update Department
// export const updateDepartment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       code, name, about, hodMessage, hodName,
//       vision, mission, faculty
//     } = req.body;

//     const missionArray = JSON.parse(mission);
//     const facultyArray = JSON.parse(faculty);

//     const updatedFields = {
//       code,
//       name,
//       about,
//       hodMessage,
//       hodName,
//       vision,
//       mission: missionArray,
//       faculty: facultyArray,
//     };

//     if (req.files['hodImage']) {
//       updatedFields.hodImage = req.files['hodImage'][0].path;
//     }

//     if (req.files['heroImage']) {
//       updatedFields.heroImage = req.files['heroImage'][0].path;
//     }

//     const updatedDept = await departmentModel.findByIdAndUpdate(id, updatedFields, { new: true });

//     if (!updatedDept) {
//       return res.status(404).json({ message: 'Department not found' });
//     }

//     res.status(200).json({ message: 'Department updated successfully', data: updatedDept });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error updating department' });
//   }
// };


import { Request, Response } from 'express';
import departmentModel from '../models/departmentModel';
import path from 'path';
import fs from 'fs';

export const getDepartment = async (req, res) => {
  try {
    const { code } = req.params;
    const department = await departmentModel.find();
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching department' });
  }
};


export const getDepartmentByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const department = await departmentModel.find({code});
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching department' });
  }
};


export const updateDepartmentByCode = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      name,
      about,
      hodName,
      hodMessage,
      vision,
      mission,
      faculty,
    } = req.body;

    const department = await departmentModel.findOne({ _id });
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }

    department.name = name || department.name;
    department.about = about || department.about;
    department.hodName = hodName || department.hodName;
    department.hodMessage = hodMessage || department.hodMessage;
    department.vision = vision || department.vision;
    department.mission = mission ? JSON.parse(mission) : department.mission;
    department.faculty = faculty ? JSON.parse(faculty) : department.faculty;

    // Replace images if uploaded
    if (req.files?.heroImage) {
      const heroPath = path.join(__dirname, '..', 'uploads', department.heroImage);
      if (department.heroImage && fs.existsSync(heroPath)) {
      fs.unlinkSync(heroPath);
      }

      department.heroImage = req.files.heroImage[0].filename;
    }

    if (req.files?.hodImage) {
        const hodPath = path.join(__dirname, '..', 'uploads', department.hodImage);
        if (department.hodImage && fs.existsSync(hodPath)) {
        fs.unlinkSync(hodPath);
      }
      department.hodImage = req.files.hodImage[0].filename;
    }

    const updated = await department.save();
    res.status(200).json(updated);

  } catch (err) {
  console.error('Update error:', err);  // already done ✅
  res.status(500).json({ error: err.message || 'Something went wrong while updating' }); // <-- update this
}

};


export const addDepartment = async (req: Request, res: Response) => {
  try {
    const {
      code,
      name,
      about,
      hodMessage,
      hodName,
      vision,
      mission,
      faculty
    } = req.body;

    const heroImage = req.files?.['heroImage']?.[0]?.filename;
    const hodImage = req.files?.['hodImage']?.[0]?.filename;

    if (!heroImage || !hodImage) {
      return res.status(400).json({ error: 'Images are required' });
    }

    const department = new departmentModel({
      code,
      name,
      heroImage,
      about,
      hodMessage,
      hodName,
      hodImage,
      vision,
      mission: JSON.parse(mission),
      faculty: JSON.parse(faculty)
    });

    await department.save();
    res.status(201).json({ message: 'Department added successfully', department });

  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
};


export const deleteDepartment = async (req: Request, res: Response) => {
 
  try {
    const { _id } = req.params;
    const department = await departmentModel.findOne({_id});
    console.log("sorry");

    if (!department) return res.status(404).json({ message: 'department not found' });

    // Delete image from disk
    const heroImage = path.join(__dirname, '..', 'uploads', department.heroImage);
    if (fs.existsSync(heroImage)) fs.unlinkSync(heroImage);

    const hodImage = path.join(__dirname, '..', 'uploads', department.hodImage);
    if (fs.existsSync(hodImage)) fs.unlinkSync(hodImage);


    await department.deleteOne();
    res.status(200).json({ message: 'hero image deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err });
  }

};

