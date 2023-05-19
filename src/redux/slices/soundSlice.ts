import { createSlice } from "@reduxjs/toolkit";
import { SoundStorageType } from "../../types/types";

const initialState : SoundStorageType = {
    musicType: undefined,
    soundEffect: {
        effectType: undefined,
        effectActive: false
    }
};

const soundSlice = createSlice({
    name: 'soundManager',
    initialState,
    reducers: {
        changeMusic: (state, action) => {
            state.musicType = action.payload;
        },
        activateEffect: (state, action) => {
            state.soundEffect.effectType = action.payload;
            state.soundEffect.effectActive = true;
        },
        resetEffect: (state) => {
            state.soundEffect.effectType = undefined;
            state.soundEffect.effectActive = false;
        }
    }
});

export const { changeMusic, activateEffect, resetEffect } = soundSlice.actions;
export default soundSlice.reducer;