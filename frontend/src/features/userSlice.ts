import * as type from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: <type.User>{}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        updateUser: (state, action) => {
            const { key, newValue } = action.payload
            state.user = {...state.user, [key] : newValue}
        }
    }
})


export const {setUser, updateUser} = userSlice.actions
export default userSlice.reducer