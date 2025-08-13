import mongoose, { Schema, Document } from 'mongoose';

export interface HeroImageDocument extends Document {
  title: string;
  desktopImage: string;
  mobileImage: string;
}

const HeroImageSchema: Schema = new Schema({
  title: { type: String, required: true },
  desktopImage: { type: String, required: true },
  mobileImage: { type: String, required: true },
},
{ timestamps: true }
);

const heroImageModel =
  mongoose.models.heroImage ||
  mongoose.model<HeroImageDocument>('heroImage', HeroImageSchema);

export default heroImageModel;
