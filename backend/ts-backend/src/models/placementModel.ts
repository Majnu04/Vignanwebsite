import mongoose from 'mongoose';

export interface IPlacement extends mongoose.Document {
  student: string;
  company: string;
  package: string;
  image: string;
  companyLogo: string;
}

const PlacementSchema = new mongoose.Schema<IPlacement>(
  {
    student: { type: String, required: true },
    company: { type: String, required: true },
    package: { type: String, required: true },
    image: { type: String, required: true },        // Uploaded student image
    companyLogo: { type: String, required: true },  // Uploaded company logo
  },
  { timestamps: true }
);

const placementModel =
  mongoose.models.Placement || mongoose.model<IPlacement>('Placement', PlacementSchema);

export default placementModel;
