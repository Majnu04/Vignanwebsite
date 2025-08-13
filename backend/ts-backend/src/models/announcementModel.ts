import mongoose, { Schema, Document } from "mongoose";

export interface IAnnouncement extends Document {
  date: string;
  title: string;
  description: string;
  path: string;
}

const AnnouncementSchema = new mongoose.Schema<IAnnouncement>(
  {
    date: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    path: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    }
  },
  { timestamps: true }
);

// export default mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

const announcementModel = mongoose.models.Announcement || mongoose.model<IAnnouncement>("Announcement", AnnouncementSchema);

export default announcementModel;
