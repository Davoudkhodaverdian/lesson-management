import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState: any[] = [];

const lessonsUsersSlice = createSlice({
    name: "lessonsUsers",
    initialState: initialState,
    reducers: {
        setLessonsUsers: (state, action: PayloadAction<any[]>) => {
            state = action.payload;
            return state;
        }
    }
})

export const { setLessonsUsers } = lessonsUsersSlice.actions;

export default lessonsUsersSlice.reducer;