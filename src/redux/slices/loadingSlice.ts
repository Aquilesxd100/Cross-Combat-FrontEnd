import { createSlice } from "@reduxjs/toolkit";
import { LoadingStoreType } from "../../types/types";

const initialState : LoadingStoreType = {
    loadingState: true,
};

const loadingSlice = createSlice({
    name: "loadingScreen",
    initialState,
    reducers: {
        setLoadingState: (state, action) => {
            state.loadingState = action.payload;
        }
    }
});

export const { setLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;