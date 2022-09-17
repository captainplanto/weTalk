import express, { Request, Response } from "express";
import User from "../../../models/user.model";
import Topic from "../../../models/topic.model";
import Comment from "../../../models/topic.model";
//import { VOTES_ON_TOPIC } from "../../../queries/db.populate";


// The votes component for the Topic created.

export const upVoteTopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  const sessionId = req.body.increaseVote;
  const findVoteOnTopic = await Topic.findById(topicId).where({
    votes: sessionId,
  });

  try {
    if (req.session.user.id) {
      if (!findVoteOnTopic) {
        const upVoteTopic = await Topic.findByIdAndUpdate(
          topicId,
          { $push: { votes: sessionId } },
          { upsert: true }
        );

        res.status(200).json({
          message: "Topic successfully upvoted",
          success: true,
        });
      } else if (findVoteOnTopic) {
        res.status(300).json({
          message: "You liked this topic already",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message:
          "Cannot vote Topic at this time, please login or register to vote",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server error....",
      e,
      success: false,
    });
  }
};

export const downVoteTopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  const sessionId = req.body.increaseVote;
  const findVoteOnTopic = await Topic.findById(topicId, { votes: sessionId });
  try {
    if (req.session.user.id) {
      if (findVoteOnTopic) {
        const downVote = await Topic.findByIdAndUpdate(topicId, {
          $pull: { votes: sessionId },
        });
        res.status(200).json({
          message: "Topic successfully down-voted",
          success: true,
        });
      } else if (!findVoteOnTopic) {
        res.status(300).json({
          message: "You downvoted this topic already",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message:
          "Cannot down vote Topic at this time, please login or register to vote",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server error....",
      e,
      success: false,
    });
  }
};

export const getUpVoteTopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  const getVotesOnTopic = await Topic.findById(topicId);
  try {
    if (getVotesOnTopic) {
      res.status(200).json({
        message: "Votes data",
        success: true,
        data: getVotesOnTopic,
      });
    } else {
      res.status(400).json({
        message: "Cannot get votes at this time, try again later",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot vote Topic at this time, please try again later....",
      e,
      success: false,
    });
  }
};












// The votes component for the Comment created.
export const upVoteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const sessionId = req.body.increaseVote;
  const session = req.session.user;
  const findVoteOnComment = await Comment.findById(commentId).where({
    votes: sessionId,
  });
  try {
    if (session) {
      if (!findVoteOnComment) {
        const upVoteComment = await Comment.findByIdAndUpdate(
          commentId,
          { $push: { votes: sessionId } },
          { upsert: true }
        );

        res.status(200).json({
          message: "Comment successfully upvoted",
          success: true,
        });
      } else if (findVoteOnComment) {
        res.status(300).json({
          message: "You liked this comment already",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message:
          "Cannot vote Comment at this time, please login or register to vote",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server error....",
      e,
      success: false,
    });
  }
};















export const downVoteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const sessionId = req.body.increaseVote;
  const findVoteOnComment = await Comment.findById(commentId, { votes: sessionId });
  try {
    if (req.session.user.id) {
      if (findVoteOnComment) {
        const downVote = await Comment.findByIdAndUpdate(commentId, {
          $pull: { votes: sessionId },
        });
        res.status(200).json({
          message: "Comment successfully down-voted",
          success: true,
        });
      } else if (!findVoteOnComment) {
        res.status(300).json({
          message: "You downvoted this comment already",
          success: false,
        });
      }
    } else {
      res.status(400).json({
        message:
          "Cannot down vote Comment at this time, please login or register to vote",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Server error....",
      e,
      success: false,
    });
  }
};

export const getUpVoteComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const getVotesOnComment = await Comment.findById(commentId);
 
  try {
    if (getVotesOnComment) {
      res.status(200).json({
        message: "Votes data",
        success: true,
        data: getVotesOnComment,
      });
    } else {
      res.status(400).json({
        message: "Cannot get votes at this time, try again later",
        success: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Cannot vote Comment at this time, please try again later....",
      e,
      success: false,
    });
  }
};