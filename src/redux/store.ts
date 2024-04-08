import { configureStore } from "@reduxjs/toolkit";
import chatSlice from './slices/chatSlice'
import userSlice from "./slices/userSlice";

const store = configureStore({
  reducer: {
    chat: chatSlice,
    user: userSlice,
  }
})

export default store

