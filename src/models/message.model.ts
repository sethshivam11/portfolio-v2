import mongoose, { Schema, Document } from "mongoose";

interface Message extends Document {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
  name: { type: String, require: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"] },
  message: { type: String, required: [true, "Message is required"] },
  createdAt: { type: Date, default: new Date() },
});

export const MessageModel =
  (mongoose.models.Message as mongoose.Model<Message>) ||
  mongoose.model<Message>("Message", messageSchema);
