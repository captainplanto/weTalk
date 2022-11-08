import mongoose, { Schema } from "mongoose";
import { ITopic } from "../types/types";

const topicSchema = new Schema<ITopic>(
  {
   
    topic: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
        default: [],
      },
    ],
    votes: [
      {
        type: Schema.Types.ObjectId,
        default: [],
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
 
);

const Topic = mongoose.model<ITopic>("Topic", topicSchema);
export const schema = Topic.schema;
export default Topic;
