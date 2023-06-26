import { createSlice } from "@reduxjs/toolkit";
import { StateSaveGameType } from "../../types/types";

const initialState : StateSaveGameType = {
    saveGame : undefined,
    saveGameRequest : false,
    loadedGameType: false
};
export const saveGameSlice = createSlice({
    name: "saveGame",
    initialState,
    reducers: {
        setSaveGameRequest: (state, action) => {
            state.saveGameRequest = action.payload;
        },
        setLoadedGameType: (state, action) => {
            state.loadedGameType = action.payload;
        },
        saveGame: (state, action) => {
            state.saveGame = action.payload;
            state.saveGameRequest = false;
        },
        deleteSaveGame: (state) => {
            state.saveGame = undefined;
        }
    }
});
export const { saveGame, deleteSaveGame, setSaveGameRequest, setLoadedGameType } = saveGameSlice.actions;
export default saveGameSlice.reducer;