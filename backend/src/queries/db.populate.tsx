import CommentModel from "../models/comment.model";
import TopicModel from "../models/topic.model";
import UserModel from "../models/user.model";

export const TOPIC_MODEL_COMMENT = {
  path: "comments",
  model: CommentModel,
  select: "reply votes author",
};

export const TOPIC_MODEL_AUTHOR = {
  path: "author",
  model: UserModel,
  select: "username firstName lastName avatar",
};

export const USER_TOPICS_MODEL = {
  path: "topics",
  model: TopicModel,
  populate: {
    path: "author",
    model: UserModel,
    select: "username firstName lastName avatar",
  },
};

export const USER_MODEL_COMMENTS = {
  path: "topics",
  model: TopicModel,
  populate: {
    path: "comments",
    model: CommentModel,
  },
};
