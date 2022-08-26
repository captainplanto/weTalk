import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

import { profileState } from "../../constant/state";

const initialState = {
  user: profileState,
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
  },
});

export const {
  createDob,
  createEmail,
  createFirstName,
  createLastName,
  createPassword,
  createUserName,
} = profileSlice.actions;
export const profile = (state: AppState) => state.profile.user;
export default profileSlice.reducer;
