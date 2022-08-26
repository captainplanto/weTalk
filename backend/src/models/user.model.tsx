import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/types";
const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: false,
    },
    topics: [{ type: Schema.Types.ObjectId, default: [], ref: "Topic" }],
    comments: [{ type: Schema.Types.ObjectId, default: [], ref: "Comment" }],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export const schema = User.schema;
export default User;
