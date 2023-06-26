import { createSlice } from "@reduxjs/toolkit";
import { ExtraAnimationsType } from "../../types/types";

const initialState : ExtraAnimationsType = {
    pendingStartAnimation: true
};

const extraAnimationsSlice = createSlice({
    name: 'soundManager',
    initialState,
    reducers: {
        setPendingStartAnimation: (state, action) => {
            state.pendingStartAnimation = action.payload;
        },
    }
});

export const { setPendingStartAnimation } = extraAnimationsSlice.actions;
export default extraAnimationsSlice.reducer;