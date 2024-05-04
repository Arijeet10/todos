
import { configureStore } from "@reduxjs/toolkit";
import TodoSlice from "./slices/TodoSlice";
import AuthSlice from "./slices/AuthSlice";
import ApiSlice from "./slices/ApiSlice";

export const store=configureStore({
    reducer:{
        TodoSlice,
        AuthSlice,
        ApiSlice,
    }
})




