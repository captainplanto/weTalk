import express from "express";
import {
  logOutUser,
  registerUser,
  registerUserInfo,
  signInUser,
  UserProfileJpg,
} from "./users/userposts/user";
import {
  createReplyToTopic,
  createTopic,
  deleteUserCommentOnATopic,
  deleteUserTopic,
  editUserComment,
  editUserTopic,
  getReplyToTopic,
  getTopic,
} from "./users/userposts/topic";
import {
  downVoteComment,
  downVoteTopic,
  getUpVoteComment,
  getUpVoteTopic,
  upVoteComment,
  upVoteTopic,
} from "./users/userposts/votes";
import { CloudinaryMiddleware } from "../cloudinary/index";

export const router = express.Router();

//Register users
router.post("/newuser", registerUser);
router.get("/userprofile/:username", registerUserInfo);

//SignIN Users
router.post("/signin", signInUser);
//router.get("/signin", signInUser);
//SignOut Users
router.post("/logout", logOutUser);

//Create, Read, Update, Delete Topic
router.post("/createtopic", createTopic);
router.get("/gettopic", getTopic);
router.put("/edittopic/:id", editUserTopic);
router.delete("/deletetopic/:id", deleteUserTopic);

//upVote && DownVote Topics && get TopicVotes from DB.
router.post("/upvotetopic/:id", upVoteTopic);
router.post("/downvotetopic/:id", downVoteTopic);
router.get("/get/vote/:id", getUpVoteTopic);

//upVote && DownVote Comments && get CommentVotes from DB.
router.post("/upvote/comment/:id", upVoteComment);
router.post("/downvote/comment/:id", downVoteComment);
router.get("/get/vote/on/comment/:id", getUpVoteComment);

//Create, Read, Update, Delete CommentsOnTopic.
router.post("/replytotopic/:id", createReplyToTopic);
router.post("/gettopicreply/:id", getReplyToTopic);
router.put("/edittopiccomment/:id", editUserComment);

//delete comments on topic endpoint
router.post("/deletecomment/:id", deleteUserCommentOnATopic);

//Upload profile images
router.post(
  "/upload/profile/image/:currentUser",
  CloudinaryMiddleware,
  UserProfileJpg
);
