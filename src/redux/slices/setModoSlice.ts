import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    modoAtual : "normal"
};
export const setModoSlice = createSlice({
    name: "setModo",
    initialState,
    reducers: {
        setModoCombate: (state) => {
            state.modoAtual = "combate";
        },
        setModoNormal: (state) => {
            state.modoAtual = "normal";
        },
        setModoAnimacao: (state) => {
            state.modoAtual = "animacao";
        },
        setModoUpgradeCristal: (state) => {
            state.modoAtual = "upgradeCristal";
        }
    }
});
export const { setModoCombate, setModoNormal, setModoAnimacao, setModoUpgradeCristal } = setModoSlice.actions;
export default setModoSlice.reducer;