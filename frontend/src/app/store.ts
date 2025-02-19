import { configureStore } from "@reduxjs/toolkit";
import taskReducer from '../features/taskSlice'
import userReducer from '../features/userSlice'
import authReducer from '../features/authSlice'

export const store = configureStore({
    reducer: {
        taskStore: taskReducer,
        userStore: userReducer,
        auth: authReducer
    }
})