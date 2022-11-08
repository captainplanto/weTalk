import express from "express";
import {
  logOutUser,
  registerUser,
  registerUserInfo,
  signInUser,
  UserProfileJpg,
} from "./userposts/user";
import {
  allCommentedTopicByUser,
  allLikedTopicByUser,
  createTopic,
  deleteUserCommentOnATopic,
  deleteUserTopic,
  editUserComment,
  editUserTopic,
  getTopic,
  replyToTopic,
  userData,
} from "./userposts/topic";
import {
  getVoteOnComment,
  getVoteOnTopic,
  voteComment,
  voteTopic,
} from "./userposts/votes";
import { CloudinaryMiddleware } from "../cloudinary/index";

export const router = express.Router();

//Register users
router.post("/create/new/user", registerUser);
router.get("/userprofile/:username", registerUserInfo);

//SignIN Users
router.post("/signin", signInUser);
//SignOut Users
router.post("/logout", logOutUser);

//Create, Read, Update, Delete Topic
router.post("/createtopic", createTopic);
router.get("/get/topic", getTopic);
router.put("/edittopic/:id", editUserTopic);
router.delete("/delete/topic/:id", deleteUserTopic);

//upVote && DownVote Topics && get TopicVotes from DB.
router.post("/vote/topic/:id", voteTopic);
router.get("/get/vote/on/topic/:id", getVoteOnTopic);

//upVote && DownVote Comments && get CommentVotes from DB.
router.post("/vote/comment/:id", voteComment);
router.get("/get/vote/on/comment/:id", getVoteOnComment);

//Create, Read, Update, Delete CommentsOnTopic.
router.post("/reply/to/topic/:id", replyToTopic);
router.get("/reply/to/topic/:id", replyToTopic);
router.put("/edittopiccomment/:id", editUserComment);

//delete comments on topic endpoint
router.post("/deletecomment/:id", deleteUserCommentOnATopic);

//Upload profile images
router.post(
  "/upload/profile/image/:currentUser",
  CloudinaryMiddleware,
  UserProfileJpg
);

//get userData
router.get("/user/topics/:id", userData);
router.get("/user/topics/comments/:id", allCommentedTopicByUser);
router.get("/user/topics/likes/:id", allLikedTopicByUser);
