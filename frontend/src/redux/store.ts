import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import topicSlice from "./features/topics";
import profileSlice from "./features/userprofile";
export const store = configureStore({
  reducer: {
    topic: topicSlice,
    profile: profileSlice,
  },
});
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
