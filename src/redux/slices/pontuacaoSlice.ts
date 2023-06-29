import { createSlice } from "@reduxjs/toolkit";
import { PontuacaoStoreType } from "../../types/types";

const initialState : PontuacaoStoreType = {
    pontosJogador: 0,
    quantidadeCristais: 0
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
        },
        aumentarCristais: (state) => {
            state.quantidadeCristais += 1;
        },
        setCristais: (state, action) => {
            state.quantidadeCristais = action.payload;
        }
    }
});

export const { aumentarPontuacao, setPontuacao, aumentarCristais, setCristais } = pontuacaoSlice.actions;
export default pontuacaoSlice.reducer;
