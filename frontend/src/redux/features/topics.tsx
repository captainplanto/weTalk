import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IDbcomments } from "../../types/type";
import { Schema } from "mongoose";

const initialState: IDbcomments = {
  databaseTopics: [],
  newtopic: "",
  toggleMode: false,
  userProfileClicked: undefined,
  loginSuccessful: false,
  openReplyToBox: true,
  replyTopic: "",
  databaseReplyTopic: undefined,
  querySearchResult: [],
  query: "",
  mobileSearchBar:false,
  commentVotes:[],
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    dbTopics: (state, action: PayloadAction<[]>) => {
      state.databaseTopics = action.payload;
    },

    dbReplyTopic: (state, action: PayloadAction<any>) => {
      state.databaseReplyTopic = action.payload;
    },

    createTopic: (state, action: PayloadAction<string>) => {
      state.newtopic = action.payload;
    },

    replyToTopic: (state, action: PayloadAction<string>) => {
      state.replyTopic = action.payload;
    },

    ReplyToTopicBox: (state, action: PayloadAction<boolean>) => {
      state.openReplyToBox = action.payload;
    },
    ToggleSwitch: (state, action: PayloadAction<boolean>) => {
      state.toggleMode = action.payload;
    },

    userProfileClickedInfo: (state, action: PayloadAction<any>) => {
      state.userProfileClicked = action.payload;
    },
    loginState: (state, action: PayloadAction<boolean>) => {
      state.loginSuccessful = action.payload;
    },
    setQuerySearch: (state, action: PayloadAction<any>) => {
      state.querySearchResult = action.payload;
    },
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
     setMobileSearchBar: (state, action: PayloadAction<boolean>) => {
      state.mobileSearchBar= action.payload;
    },
     setCommentVotes: (state, action: PayloadAction<[]>) => {
      state.commentVotes= action.payload;
    },
  },
});

export const {
  dbTopics,
  createTopic,
  ReplyToTopicBox,
  dbReplyTopic,
  replyToTopic,
  ToggleSwitch,
  userProfileClickedInfo,
  setQuerySearch,
  setQuery,
  loginState,
  setMobileSearchBar,
  setCommentVotes
} = topicSlice.actions;
export const topic = (state: AppState) => state.topic;
export default topicSlice.reducer;
