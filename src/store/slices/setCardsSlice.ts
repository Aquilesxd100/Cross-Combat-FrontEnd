import { createSlice } from "@reduxjs/toolkit";
import { SetCardsStateType } from "../../types/types";
const initialState : SetCardsStateType = {
    timeInimigo: [],
    timeJogador: []
}
export const setCardsSlice = createSlice({
    name: "setCards",
    initialState,
    reducers: {
        setTimeJogador: (state, action) => {
            state.timeJogador = action.payload;
        },
        setTimeInimigo: (state, action) => {
            state.timeInimigo = action.payload;
        }
    }
});
export const { setTimeJogador, setTimeInimigo } = setCardsSlice.actions;
export default setCardsSlice.reducer;