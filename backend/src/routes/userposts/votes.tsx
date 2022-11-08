import { Request, Response } from "express";
import Topic from "../../models/topic.model";
import Comment from "../../models/comment.model";

// The votes component for the Topics created.
export const voteTopic = async (req: Request, res: Response) => {
  const PAYLOAD = req.headers.payload;
  const topicId = req.params.id;
  const sessionId = req.body.increaseVote;
  const checkForVote = await Topic.findById(topicId);
  const findVoteOnTopic = checkForVote.votes.includes(sessionId);
  if (PAYLOAD === "add") {
    try {
      if (req.session.user._id) {
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
  } else if (PAYLOAD === "remove") {
    try {
      if (req.session.user._id) {
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
  } else {
    return;
  }
};

export const getVoteOnTopic = async (req: Request, res: Response) => {
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
export const voteComment = async (req: Request, res: Response) => {
  const PAYLOAD = req.headers.payload;
  const commentId = req.params.id;
  const sessionId = req.body.increaseVote;
  const checkForVote = await Comment.findById(commentId);
  const findVoteOnComment = checkForVote.votes.includes(sessionId);
  const session = req.session.user;
  if (session && session._id) {
    try {
      if (PAYLOAD === "add") {
        if (!findVoteOnComment) {
          const upVoteComment = await Comment.findByIdAndUpdate(
            commentId,
            { $push: { votes: sessionId } },
            { upsert: true }
          );

          res.status(200).json({
            message: "Comment successfully up-voted",
            success: true,
          });
        } else if (findVoteOnComment) {
          res.status(300).json({
            message: "You liked this comment already",
            success: false,
          });
        }
      } else if (PAYLOAD === "remove") {
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
        } else {
          res.status(400).json({
            message: "You downvoted this comment already",
            success: false,
          });
        }
      } else {
        return;
      }
    } catch (error) {
      return error;
    }
  } else {
    res.status(500).json({
      message:
        "Cannot vote Comment at this time, please login or register to vote",
      success: false,
    });
  }
};

export const getVoteOnComment = async (req: Request, res: Response) => {
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
