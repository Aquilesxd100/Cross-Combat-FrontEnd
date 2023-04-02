import { createSlice } from "@reduxjs/toolkit";
import { CombateInfosType } from "../../types/types";

const initialState : CombateInfosType = {
    infosAtacante: {
        idCard: undefined,
        atributo: undefined,
        valorAtributo: undefined
    }
};
export const infosCombateSlice = createSlice({
    name: "infosCombate",
    initialState,
    reducers: {
        setInfosCombate: (state, action) => {
          state.infosAtacante.idCard = action.payload.idCard; 
          state.infosAtacante.atributo = action.payload.atributo;
          state.infosAtacante.valorAtributo = action.payload.valorAtributo;    
        },
    }
});
export const { setInfosCombate } = infosCombateSlice.actions;
export default infosCombateSlice.reducer;