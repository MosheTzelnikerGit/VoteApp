import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import candidatesReducer from "./candidatesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    candidates: candidatesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

