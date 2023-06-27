import { createSlice } from "@reduxjs/toolkit";
import { PropInfoCardCombateType, SetCardsStateType } from "../../types/types";
const initialState : SetCardsStateType = {
    timeInimigo: [],
    timeJogador: [],
    preLoadtimeInimigo: [],
    preLoadtimeJogador: [],
    userReadyState: false
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
        },
        revelarInimigo: (state, action) => {
            const indexInimigo = state.timeInimigo.findIndex((inimigo) => inimigo.id === action.payload)
            state.timeInimigo[indexInimigo].escondido = false;
        },
        resolverConflito: (state, action) => {
            const atacante : PropInfoCardCombateType = action.payload.atacante;
            const defensor : PropInfoCardCombateType = action.payload.defensor;
            if(!atacante.valorAtributo || !defensor.valorAtributo)return;
            const indexInimigoDerrotado = state.timeInimigo.findIndex((inimigo) => inimigo.id === defensor.idCard);
            const indexJogadorDerrotado = state.timeJogador.findIndex((jogador) => jogador.id === atacante.idCard);
            if(atacante.valorAtributo > defensor.valorAtributo) {
                state.timeInimigo[indexInimigoDerrotado].morto = true;
            }
            else if(atacante.valorAtributo === defensor.valorAtributo) {
                state.timeInimigo[indexInimigoDerrotado].morto = true;
                state.timeJogador[indexJogadorDerrotado].morto = true;
            }
            else {
                state.timeJogador[indexJogadorDerrotado].morto = true;
            }
        },
        setPreLoadTimeJogador: (state, action) => {
            state.preLoadtimeJogador = action.payload;
        },
        setPreLoadTimeInimigo: (state, action) => {
            state.preLoadtimeInimigo = action.payload;
        },
        setUserReadyState: (state, action) => {
            state.userReadyState = action.payload;
        },
    }
});
export const { setTimeJogador, setTimeInimigo, resolverConflito, revelarInimigo, setPreLoadTimeJogador, setPreLoadTimeInimigo } = setCardsSlice.actions;
export default setCardsSlice.reducer;