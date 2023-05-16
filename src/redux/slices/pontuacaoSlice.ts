import { createSlice } from "@reduxjs/toolkit";
import { PontuacaoStoreType } from "../../types/types";

const initialState : PontuacaoStoreType = {
    pontosJogador: 0
};

const pontuacaoSlice = createSlice({
    name: 'pontuacao',
    initialState,
    reducers: {
        aumentarPontuacao: (state) => {
            state.pontosJogador += 1;
        },
        setPontuacao: (state, action) => {
            state.pontosJogador = action.payload;
        }
    }
});

export const { aumentarPontuacao, setPontuacao } = pontuacaoSlice.actions;
export default pontuacaoSlice.reducer;
