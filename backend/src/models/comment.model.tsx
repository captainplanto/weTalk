import mongoose, { Schema } from "mongoose";
import { IComment } from "../types/types";

const commentSchema = new Schema<IComment>(
  {
    reply: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    votes: [{ type: Schema.Types.ObjectId, default: [] }],
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export const schema = Comment.schema;
export default Comment;


