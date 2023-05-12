import { createSlice } from "@reduxjs/toolkit";
import { PlayerCardType } from "../../types/types";

const initialState : PlayerCardType = {
    playerCardType: 'aleatorio'
};

export const playerCardTypeSlice = createSlice({
    name: 'playerCardType',
    initialState,
    reducers: {
        setPlayerCardType: (state, action) => {
            state.playerCardType = action.payload;
        }
    }
});

export const { setPlayerCardType } = playerCardTypeSlice.actions;
export default playerCardTypeSlice.reducer;