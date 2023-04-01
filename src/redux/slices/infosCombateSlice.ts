import { createSlice } from "@reduxjs/toolkit";
import { CombateInfosType } from "../../types/types";

const initialState : CombateInfosType = {
    idCard: undefined,
    atributo: undefined,
    valorAtributo: undefined
};
export const infosCombateSlice = createSlice({
    name: "infosCombate",
    initialState,
    reducers: {
        setInfosCombate: (state, action) => {
          state.idCard = action.payload.idCard; 
          state.atributo = action.payload.atributo;
          state.valorAtributo = action.payload.valorAtributo;    
        },
    }
});
export const { setInfosCombate } = infosCombateSlice.actions;
export default infosCombateSlice.reducer;