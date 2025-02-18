import * as type from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tasks: <type.Task[]>[]
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.tasks = action.payload
        },
        addTask: (state, action) => {
            const newTask:type.Task = {
                ...action.payload
            }
            state.tasks.push(newTask)
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task._id !== action.payload)
        },
        updateTask: (state, action) => {
            const { _id, newValue } = action.payload
            state.tasks = state.tasks.filter(task => task._id !== _id)
            state.tasks.push(newValue)
        }
    }
})


export const {addTask, removeTask} = taskSlice.actions
export default taskSlice.reducer