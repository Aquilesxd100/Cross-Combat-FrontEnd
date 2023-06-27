import { createSlice } from "@reduxjs/toolkit";
import { ExtraAnimationsType } from "../../types/types";

const initialState : ExtraAnimationsType = {
    pendingStartAnimation: true,
    pendingResetDefeatedCards: false
};

const extraAnimationsSlice = createSlice({
    name: 'soundManager',
    initialState,
    reducers: {
        setPendingStartAnimation: (state, action) => {
            state.pendingStartAnimation = action.payload;
        },
        setPendingResetDefeatedCards: (state, action) => {
            state.pendingResetDefeatedCards = action.payload;
        },
    }
});

export const { setPendingStartAnimation, setPendingResetDefeatedCards } = extraAnimationsSlice.actions;
export default extraAnimationsSlice.reducer;