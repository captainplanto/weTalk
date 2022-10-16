import { Schema } from "mongoose";

export interface IUser {
  email: { type: string; required: boolean; unique: boolean };
  username: { type: string; required: boolean };
  firstName: { type: string; required: boolean };
  password: string;
  lastName: string;
  topics: ITopic[];
  comments: IComment[];
  dob: { type: string; required: boolean };
  timestamps: boolean;
  avatar:string;
}
export interface IProfileImage {
  avatar:{
    type:string;
    required:boolean;
  },
  author:{
    type:Schema.Types.ObjectId,
    required:boolean;
    ref:string;
  }
}
export interface ITopic {
  topic: string;
  comments: IComment[];
  author: { [key: string]: any; };
  votes: number;
  updatedTopic?: string;
}

export interface IComment {
  _id:Schema.Types.ObjectId;
  reply: string;
  votes: Schema.Types.ObjectId[];
  author: { [key: string]: any; };
  timestamps: boolean;
}
export interface ISession {
  id: any;
}
export const contentType = "application/json";

declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
     
  }
}



/*

  comments: IComment[];
  commentRepliedTo: IComment[];
  authorRepliedTo: IUser;
*/









//export interface UserModelType extends PassportLocalModel<IUser>{};
