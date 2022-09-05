import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { IDbcomments } from "../../types/type";

const initialState: IDbcomments = {
  databaseTopics: [],
  newtopic: "",
  toggleMode: false,
  userProfile: undefined,
  loginSuccessful: false,
  openReplyToBox: true,
  replyTopic: "",
  databaseReplyTopic: undefined,
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

    userProfileInfo: (state, action: PayloadAction<any>) => {
      state.userProfile = action.payload;
    },
    loginState: (state, action: PayloadAction<boolean>) => {
      state.loginSuccessful = action.payload;
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
  userProfileInfo,
  loginState,
} = topicSlice.actions;
export const topic = (state: AppState) => state.topic;
export default topicSlice.reducer;
