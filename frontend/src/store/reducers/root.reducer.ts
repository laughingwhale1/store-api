
import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "./user.reducer.ts";
export const rootReducer = combineReducers({
    userReducer,
})
