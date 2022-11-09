import { Schema } from "mongoose";
import { ReactNode } from "react";

export interface IUser {
  _id?: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  dob: string;
  email: string;
  password: string;
  createdAt?: string;
  avatar: string;
}

export interface ITopic {
  username: string;
  topic: string;
  _id: Schema.Types.ObjectId;
  createdAt: string;
  author: { [key: string]: any };
  updatedTopic?: string;
  reply: string;
  comments: [];
}

export interface IComment {
  _id: Schema.Types.ObjectId;
  reply: string;
  votes: any;
  createdAt?: string;
  author: { [key: string]: any };
}

export interface IDatabasedata {
  id: Schema.Types.ObjectId;
  comment?: string;
}

export interface IDbcomments {
  databaseTopics: [];
  databaseReplyTopic: ITopic | undefined;
  newtopic: string;
  replyTopic: string;
  openReplyToBox: boolean;
  toggleMode: boolean;
  userProfileClicked: IUser | undefined;
  loginSuccessful: boolean;
  querySearchResult:ITopic[];
  query:string;
  mobileSearchBar:boolean;
  commentVotes:Schema.Types.ObjectId[];
}

export interface IRegister {
  fill: string;
  size?: string;
  height?: string;
  width?: string;
}
export interface SessionData {
  user: { [key: string]: any };
}
export interface ITopicReplyButton {
  id: Schema.Types.ObjectId;
  children: ReactNode;
  showTopicReplyButton: boolean;
  className?: string;
}

export interface ITopicEditedButton {
  id: Schema.Types.ObjectId;
  showTopicEditButton: boolean;
  children: ReactNode;
  className?: string;
  onClick?: (e: any) => void;
  topicCommentID?: any;
  topicOwner: string;
}

export interface IUserTopics {
  user: IUser,
  currentTab: number,
  showUploadButton:boolean,
  topicsLikedByUser: ITopic[];
  usernameClicked:boolean;
  userNameParams:string|ReactNode|undefined;

}
