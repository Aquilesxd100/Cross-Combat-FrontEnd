import { createSlice } from "@reduxjs/toolkit";
import { LoadingStoreType } from "../../types/types";

const initialState : LoadingStoreType = {
    loadingState: true,
    pagesLoaded: {
        telaInicial: false,
        telaSelecao: false,
        telaCombate: false
    }
};

const loadingSlice = createSlice({
    name: "loadingScreen",
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        },
        telaInicialCarregada: (state) => {
            state.pagesLoaded.telaInicial = true;
        },
        telaSelecaoCarregada: (state) => {
            state.pagesLoaded.telaSelecao = true;
        },
        telaCombateCarregada: (state) => {
            state.pagesLoaded.telaCombate = true;
        }
    }
});

export const { setLoadingState, telaInicialCarregada, telaSelecaoCarregada, telaCombateCarregada } = loadingSlice.actions;
export default loadingSlice.reducer;