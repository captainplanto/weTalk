import express, { Request, Response } from "express";
import User from "../../../models/user.model";
import Topic from "../../../models/topic.model";
//import { VOTES_ON_TOPIC } from "../../../queries/db.populate";

// The upVote and downvote feature is not yet working.
export const upVoteTopic = async (req: Request, res: Response) => {
  const topicId = req.params.id;
  const sessionId = req.body.increaseVote;
  const findVoteOnTopic = await Topic.findById(topicId, { votes:sessionId });
  //const findVoteOnTopic = await Topic.findById(topicId, {votes:{$in:sessionId}});
  console.log(findVoteOnTopic, 'working?')
  try {
    if (req.session.user.id) {
    if (!findVoteOnTopic) {
    const upVoteTopic = await Topic.findByIdAndUpdate(topicId, { $push: { votes: sessionId } },
  { upsert: true }
        );
        res.status(200).json({
          message: "Topic successfully upvoted",
          success: true,
        });
     } 
      
    else if(findVoteOnTopic) {
        res.status(300).json({
         message: "You liked this topic already",
         success: false,
        });
     } 
    }
    
     else {
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
      } else if(!findVoteOnTopic) {
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
  console.log(getVotesOnTopic)
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
