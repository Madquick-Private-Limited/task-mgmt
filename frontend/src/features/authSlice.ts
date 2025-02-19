import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: () => true,
        logout: () => false
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
