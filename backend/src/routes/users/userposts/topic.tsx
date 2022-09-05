import express, { Request, Response } from "express";
import Topic from "../../../models/topic.model";
import Comment from "../../../models/comment.model";
import { TOPIC_MODEL, TOPIC_TOPIC_MODEL } from "../../../queries/db.populate";

/*export const isAuthor = async (req: Request, res: Response, next: any) => {
  const id = req.params.id;
  const topic = await Topic.findById(id);
  try {
    if (!topic.author === req.session.user.id) {
      res.status(402).json({
        message: "You cannot edit this topic, it belongs to another user",
      });
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

*/
export const createTopic = async (req: Request, res: Response) => {
  const topic = req.body.createTopic;
  const userTopic = new Topic({ topic: topic });
  userTopic.author = req.session.user.id;
  try {
    if (req.session.user.id) {
      const savedTopic = await userTopic.save();
      return res.status(200).json({
        message: "Topic successfully created",
        success: true,
        data: savedTopic,
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
  const dbTopics = await Topic.find({}).populate("author");

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

export const createReplyToTopic = async (req: Request, res: Response) => {
  const topicToReplyToId = req.params.id;
  const reply = req.body.TopicResponse;
  const session = req.session.user;
  if (session) {
    try {
      const createReply = new Comment({ reply: reply });
      createReply.author = session.id;
      const saveReply = await createReply.save();
      const saveReplyToTopic = await Topic.findByIdAndUpdate(
        topicToReplyToId,
        { $push: { comments: createReply } },
        { upsert: true }
      );
      return res.status(200).json({
        message: "Reply successfully created",
        success: true,
        data: saveReplyToTopic,
      });
    } catch (e) {
      res.status(500).json({
        message: "Reply to post cannot be created into database",
        e,
        success: false,
      });
    }
  } else {
    res.status(400).json({
      message: "Log in or create account to comment or reply to a post",
      success: true,
    });
    console.log("error");
  }
};

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

export const getReplyToTopic = async (req: Request, res: Response) => {
  const id = req.params.id;
  const dbReplyTopics = await Topic.findById(id)
    .populate(TOPIC_MODEL)
    .populate(TOPIC_TOPIC_MODEL)
    .exec();
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

export const deleteUserCommentOnATopic = async (
  req: Request,
  res: Response
) => {
  const commentToDeleteId = req.params.id;
  const topicToRemoveCommentFrom = req.body.topicID;
  try {
    if (req.session.user.id) {
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
