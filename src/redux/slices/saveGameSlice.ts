import { createSlice } from "@reduxjs/toolkit";
import { StateSaveGameType } from "../../types/types";

const initialState : StateSaveGameType = {
    saveGame : undefined
};
export const saveGameSlice = createSlice({
    name: "saveGame",
    initialState,
    reducers: {
        saveGame: (state, action) => {
            state.saveGame = action.payload;
        },
        deleteSaveGame: (state) => {
            state.saveGame = undefined;
        }
    }
});
export const { saveGame, deleteSaveGame } = saveGameSlice.actions;
export default saveGameSlice.reducer;