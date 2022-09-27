import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";
import { profileState } from "../../constant/state";
import { IUserTopics } from "../../types/type";
import { ReactNode } from "react";


const initialState: IUserTopics = {
  user: profileState,
  currentTab: 1,
  showUploadButton: false,
  topicsByUser: [],
  usernameClicked: false,
  userNameParams:''
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    createFirstName: (state, action: PayloadAction<string>) => {
      state.user.firstName = action.payload;
    },

    createLastName: (state, action: PayloadAction<string>) => {
      state.user.lastName = action.payload;
    },

    createUserName: (state, action: PayloadAction<string>) => {
      state.user.username = action.payload;
    },
    createDob: (state, action: PayloadAction<string>) => {
      state.user.dob = action.payload;
    },

    createEmail: (state, action: PayloadAction<string>) => {
      state.user.email = action.payload;
    },
    createPassword: (state, action: PayloadAction<string>) => {
      state.user.password = action.payload;
    },
    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
    setShowUploadButton: (state, action: PayloadAction<boolean>) => {
      state.showUploadButton = action.payload;
    },
    setTopicsByUser: (state, action: PayloadAction<[]>) => {
      state.topicsByUser = action.payload;
    },
    setUsernameClicked: (state, action: PayloadAction<boolean>) => {
      state.usernameClicked = action.payload;
    },
     setUserNameParams: (state, action: PayloadAction<ReactNode>) => {
      state.userNameParams = action.payload;
    },
  },
});

export const {
  createDob,
  setShowUploadButton,
  setUsernameClicked,
  setUserNameParams,
  createEmail,
  createFirstName,
  createLastName,
  createPassword,
  setTopicsByUser,
  setCurrentTab,
  createUserName,
} = profileSlice.actions;
export const profile = (state: AppState) => state.profile.user;
export default profileSlice.reducer;
