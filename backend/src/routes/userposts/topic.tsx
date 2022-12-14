import express, { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Comment from "../../models/comment.model";
import {
  TOPIC_MODEL_AUTHOR,
  TOPIC_MODEL_COMMENT,
  USER_MODEL_COMMENTS,
  USER_TOPICS_MODEL,
} from "../../queries/db.populate";
import User from "../../models/user.model";
import mongoose from "mongoose";

export const AuthenticateUser = async (
  req: Request,
  res: Response,
  next: any
) => {
  const session = req.session.user;
  try {
    if (session) {
      res.status(200).json({
        message: "You are logged in",
        success: true,
      });
    } else {
      res.status(400).json({
        message: "Please log in or Register to perform this action",
        success: false,
      });
      next();
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error, try again later",
      success: false,
    });
    console.log(error);
  }
};

export const createTopic = async (req: Request, res: Response) => {
  const topic = req.body.createTopic;
  const userTopic = new Topic({ topic: topic });
  const sessionId = req.session.user._id;
  userTopic.author = sessionId;
  try {
    if (sessionId) {
      const saveTopic = await userTopic.save();
      const topicByUser = await User.findByIdAndUpdate(
        sessionId,
        { $push: { topics: userTopic } },
        { runValidators: true }
      );
      return res.status(200).json({
        message: "Topic successfully created",
        success: true,
        data: saveTopic,
      });
    } else {
      res.status(202).json({
        message: "Log in or create account to create a topic",
        success: true,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Topic cannot be created into database",
      e,
      success: false,
    });
  }
};

export const getTopic = async (req: Request, res: Response) => {
  const dbTopics = await Topic.find({})
    .populate(TOPIC_MODEL_COMMENT)
    .populate(TOPIC_MODEL_AUTHOR);
  try {
    if (dbTopics && dbTopics.length > 0) {
      res.status(200).json({
        message: "All saved topics successfully fetched from database",
        success: true,
        data: dbTopics,
      });
    } else {
      res.status(400).json({
        message: "No topic created yet",
        success: false,
      });
    }
  } catch (e) {
    res.status(400).json({
      message:
        "Cannot fetched topics from database at this time, please try again....",
      e,
      success: false,
    });
  }
};

export const editUserTopic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const topic = req.body.createTopic;
  const editedTopic = await Topic.findByIdAndUpdate(
    id,
    { $set: { topic: topic } },
    { runValidators: true }
  );

  try {
    const saveEditedPost = await editedTopic.save();
    res.status(200).json({
      message: "Topic Edited and saved in database",
      success: true,
      data: saveEditedPost,
    });
  } catch (e) {
    res.status(400).json({
      message: "Topic cannot be edited, please try again later.....",
      e,
    });
  }
};

export const deleteUserTopic = async (req: Request, res: Response) => {
  const deletetopic = await Topic.findByIdAndDelete(req.params.id);
  try {
    res.status(200).json({
      message: "Topic successfully deleted",
      success: true,
      data: deletetopic,
    });
  } catch (e) {
    res.status(400).json({
      message: "Cannot delete Topic at this time, please try again later....",
      e,
      success: false,
    });
  }
};

export const replyToTopic = async (req: Request, res: Response) => {
  const topicToReplyToId = req.params.id;
  const reply = req.body.TopicResponse;
  const method = req.method;
  const session = req.session.user;
  if (session && method === "POST") {
    try {
      const createReply = new Comment({ reply: reply });
      createReply.author = session._id;
      const saveReply = await createReply.save();
      const saveReplyToTopic = await Topic.findByIdAndUpdate(
        topicToReplyToId,
        { $push: { comments: createReply } },
        { upsert: true }
      );

      const topicByUser = await User.findByIdAndUpdate(
        session.id,
        { $push: { comments: createReply } },
        { upsert: true }
      );
      return res.status(200).json({
        message: "Your comment to this topic was successfully created",
        success: true,
      });
    } catch (e) {
      res.status(400).json({
        message:
          "cannot create comment to this topic at this time, please try again later.",
        e,
        success: false,
      });
    }
  } else if (session && method === "GET") {
    try {
      const getTopicAndComments = await Topic.findById(topicToReplyToId)
        .populate(TOPIC_MODEL_COMMENT)
        .populate(TOPIC_MODEL_AUTHOR)
        .exec();
      console.log(getTopicAndComments);
      return res.status(200).json({
        message: "Your comment to this topic was successfully created",
        success: true,
        data: getTopicAndComments,
      });
    } catch (error) {
      res.status(400).json({
        message: " Cannot fetch comments at this time, try again later;",
        error,
        success: false,
      });
    }
  } else {
    res.status(500).json({
      message: "Log in or create account to comment or reply to a post",
      success: true,
    });
    console.log("error");
  }
};

/*
export const getReplyToTopic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dbReplyTopics = await Topic.findById(id)
    .populate(TOPIC_MODEL_COMMENT)
    .populate(TOPIC_MODEL_AUTHOR);
  //.exec();

  try {
    if (dbReplyTopics) {
      res.status(200).json({
        message: "All saved Comments successfully fetched from database",
        success: true,
        data: dbReplyTopics,
      });
    } else {
      res.status(400).json({
        message: "No reply created yet",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message:
        "Cannot fetched topics from database at this time, please try again....",
      e,
      success: false,
    });
  }
};
*/

export const editUserComment = async (req: Request, res: Response) => {
  const id = req.params.id;
  const comment = req.body.createTopic;
  const editedComment = await Comment.findByIdAndUpdate(
    id,
    { $set: { reply: comment } },
    { runValidators: true }
  );

  try {
    const saveEditedComment = await editedComment.save();
    res.status(200).json({
      message: "Comment successfully Edited and saved in database",
      success: true,
      data: saveEditedComment,
    });
  } catch (e) {
    res.status(400).json({
      message: "Comment cannot be edited, please try again later.....",
      e,
    });
  }
};

export const deleteUserCommentOnATopic = async (
  req: Request,
  res: Response
) => {
  const commentToDeleteId = req.params.id;
  const topicToRemoveCommentFrom = req.body.topicID;
  try {
    if (req.session.user._id) {
      const deleteCommentOnTopic = await Topic.findByIdAndUpdate(
        topicToRemoveCommentFrom,
        {
          $pull: { comments: commentToDeleteId },
        }
      );
      return res.status(200).json({
        message: "comment successfully deleted",
        success: true,
      });
    } else {
      res.status(202).json({
        message: "Log in or create account to comment or reply to a post",
        success: true,
      });
    }
  } catch (e) {
    res.status(400).json({
      message:
        "comment  to post cannot be deleted at this moment. Try again later",
      e,
      success: false,
    });
  }
};

export const userData = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userObject = await User.findOne({ _id: id })
    .populate(USER_TOPICS_MODEL)
    .populate(USER_MODEL_COMMENTS);
  const userDetails = userObject;
  try {
    if (userDetails) {
      res.status(200).json({
        message: "All user topics successfully fetched from database",
        success: true,
        data: userDetails,
      });
    } else {
      res.status(400).json({
        message: "No topic created yet by this user.",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message:
        "Cannot fetch user details from database at this time, please try again....",
      e,
      success: false,
    });
  }
};

export const allLikedTopicByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userClickedId = new mongoose.Types.ObjectId(id);
  const topicsLikedByUser = await Topic.aggregate([
    { $project: { topic: 1, votes: 1, author: 1, createdAt: 1, comments: 1 } },

    { $match: { votes: userClickedId } },
    {
      $lookup: {
        from: "users",
        pipeline: [{ $project: { username: 1, avatar: 1 } }],
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    { $unwind: "$topic" },
  ]);

  try {
    if (topicsLikedByUser) {
      res.status(200).json({
        message: "All topics liked by user",
        success: true,
        data: topicsLikedByUser,
      });
    } else if (!topicsLikedByUser) {
      res.status(400).json({
        message: "The user has not liked any topic yet",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Error fetching liked topics by user from the database, Please try again later....",
      success: false,
    });
  }
};

export const allCommentedTopicByUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const userClickedId = new mongoose.Types.ObjectId(id);
  const topicsCommentedOnByUser = await Topic.aggregate([
    { $project: { topic: 1, comments: 1, avatar: 1, _id: 1 } },
    {
      $lookup: {
        from: "comments",
        pipeline: [{ $project: { reply: 1, author: 1 } }],
        localField: "comments",
        foreignField: "reply",
        as: "comments",
      },
    },
    { $match: { _id: userClickedId } },

    { $unwind: "$topic" },
  ]);

  try {
    if (topicsCommentedOnByUser) {
      res.status(200).json({
        message: "All topics liked by user",
        success: true,
        data: topicsCommentedOnByUser,
      });
    } else if (!topicsCommentedOnByUser) {
      res.status(400).json({
        message: "The user has not liked any topic yet",
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Error fetching liked topics by user from the database, Please try again later....",
      success: false,
    });
  }
};
