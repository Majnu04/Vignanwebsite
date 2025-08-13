import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
        name: string;
        email: string;
        password: string;
}

const userSchema: Schema = new Schema<IUser>({
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
});

// SAFE EXPORT (avoid OverwriteModelError)
const userModel = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default userModel;
