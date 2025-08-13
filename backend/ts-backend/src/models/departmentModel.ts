// import mongoose, { Schema, Document } from 'mongoose';

// interface FacultyMember {
//   sno: number;
//   name: string;
//   designation: string;
// }

// export interface DepartmentDocument extends Document {
//   code: string; // like 'cse', 'ece', etc.
//   name: string;
//   heroImage: string;
//   about: string;
//   hodMessage: string;
//   hodName: string;
//   hodImage: string;
//   vision: string;
//   mission: string[];
//   faculty: FacultyMember[];
// }

// const FacultySchema: Schema = new Schema({
//   sno: { type: Number, required: true },
//   name: { type: String, required: true },
//   designation: { type: String, required: true }
// });

// const DepartmentSchema: Schema = new Schema({
//   code: { type: String, required: true, unique: true }, // e.g., 'cse', 'ece'
//   name: { type: String, required: true },
//   heroImage: { type: String, required: true },
//   about: { type: String, required: true },
//   hodMessage: { type: String, required: true },
//   hodName: { type: String, required: true },
//   hodImage: { type: String, required: true },
//   vision: { type: String, required: true },
//   mission: { type: [String], required: true },
//   faculty: { type: [FacultySchema], required: true }
// });

// const departmentModel = (mongoose.models.department as mongoose.Model<DepartmentDocument>) 
//   || mongoose.model<DepartmentDocument>("department", DepartmentSchema);

// export default departmentModel;


import mongoose, { Schema, Document } from 'mongoose';

interface FacultyMember {
  sno: number;
  name: string;
  designation: string;
}

export interface DepartmentDocument extends Document {
  code: string;
  name: string;
  heroImage: string;
  about: string;
  hodMessage: string;
  hodName: string;
  hodImage: string;
  vision: string;
  mission: string[];
  faculty: FacultyMember[];
}

const FacultySchema: Schema = new Schema({
  sno: { type: Number, required: true },
  name: { type: String, required: true },
  designation: { type: String, required: true }
});

const DepartmentSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  heroImage: { type: String, required: true },
  about: { type: String, required: true },
  hodMessage: { type: String, required: true },
  hodName: { type: String, required: true },
  hodImage: { type: String, required: true },
  vision: { type: String, required: true },
  mission: { type: [String], required: true },
  faculty: { type: [FacultySchema], required: true }
});

const departmentModel = mongoose.models.department || mongoose.model<DepartmentDocument>("department", DepartmentSchema);

export default departmentModel;
