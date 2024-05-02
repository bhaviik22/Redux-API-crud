import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetailSlice";

export const store = configureStore({
    reducer: {
        app: userDetail
    }
})
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;