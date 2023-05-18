import { createSlice } from "@reduxjs/toolkit";
import { SoundStorageType } from "../../types/types";

const initialState : SoundStorageType = {
    musicType: undefined
};

const soundSlice = createSlice({
    name: 'soundManager',
    initialState,
    reducers: {
        changeMusic: (state, action) => {
            state.musicType = action.payload;
        },
    }
});

export const { changeMusic } = soundSlice.actions;
export default soundSlice.reducer;