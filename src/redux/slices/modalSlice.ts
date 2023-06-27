import { createSlice } from '@reduxjs/toolkit';
import { ModalStateType } from '../../types/types';

const initialState : ModalStateType = {
    modalMenuActive: false,
    modalInfosActive: false,
    modalVitoriaActive: false,
    modalDerrotaActive: false
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
        }
    }
});

export const { setMenuModal, setInfosModal, setVitoriaModal, setDerrotaModal } = modalSlice.actions;
export default modalSlice.reducer;