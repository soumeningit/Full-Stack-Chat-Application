import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./Slices/AuthSlice"
import profileReducer from "./Slices/ProfileSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer
    }
})