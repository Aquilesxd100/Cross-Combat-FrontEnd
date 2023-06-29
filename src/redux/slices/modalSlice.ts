import { createSlice } from '@reduxjs/toolkit';
import { ModalStateType } from '../../types/types';

const initialState : ModalStateType = {
    modalMenuActive: false,
    modalInfosActive: false,
    modalVitoriaActive: false,
    modalDerrotaActive: false,
    modalErroConexao: false
};

export const modalSlice = createSlice({
    name: 'modalHandler',
    initialState,
    reducers: {
        setMenuModal: (state, action) => {
            state.modalMenuActive = action.payload;
        },
        setInfosModal: (state, action) => {
            state.modalInfosActive = action.payload;
        },
        setVitoriaModal: (state, action) => {
            state.modalVitoriaActive = action.payload;
        },
        setDerrotaModal: (state, action) => {
            state.modalDerrotaActive = action.payload;
        },
        setErroConexaoModal: (state, action) => {
            state.modalErroConexao = action.payload;
        },
        clearAllModalStates: (state) => {
            state.modalMenuActive = false;
            state.modalInfosActive = false;
            state.modalVitoriaActive = false;
            state.modalDerrotaActive = false;
        }
    }
});

export const { setMenuModal, setInfosModal, setVitoriaModal, setDerrotaModal, clearAllModalStates, setErroConexaoModal } = modalSlice.actions;
export default modalSlice.reducer;