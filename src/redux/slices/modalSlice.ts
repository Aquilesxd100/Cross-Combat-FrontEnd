import { createSlice } from '@reduxjs/toolkit';
import { ModalStateType } from '../../types/types';

const initialState : ModalStateType = {
    modalMenuActive: false,
    modalInfosActive: false
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
        }
    }
});

export const { setMenuModal, setInfosModal } = modalSlice.actions;
export default modalSlice.reducer;