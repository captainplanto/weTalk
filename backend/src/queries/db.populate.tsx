import CommentModel from "../models/comment.model";
import TopicModel from "../models/topic.model";
import UserModel from "../models/user.model";

export const TOPIC_MODEL = {
  path: "comments",
  model: CommentModel,
  select: "reply votes author",
  populate: {
    path: "author",
    model: UserModel,
    select: "username avatar",
  },
};

export const TOPIC_TOPIC_MODEL = {
  path: "author",
  model: UserModel,
  select: "firstName username",
};





/*export const VOTES_ON_TOPIC ={
  path: '',
  model:TopicModel,
  select:'votes'
}
*/