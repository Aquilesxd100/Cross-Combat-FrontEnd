import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoadingStoreType } from "../../types/types";

export const connectionTest = createAsyncThunk(
    "connectionTest",
    async () => {
        const response = await fetch('https://cross-combat-api.onrender.com/testarConexao',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
        })
        .then((res) => res.json())
        .then((data) => data)
        .catch((error) => console.log(error))

        return response;
    }
);

const initialState : LoadingStoreType = {
    resourcesLoadingState: true,
    serverLoadingState: true,
    cardsLoadingState: true,
    cardsPreLoadingState: false,
    connectionError: false
};

const loadingSlice = createSlice({
    name: "loadingScreen",
    initialState,
    reducers: {
        setResourcesLoadingState: (state, action) => {
            state.resourcesLoadingState = action.payload;
        },
        setServerLoadingState: (state, action) => {
            state.serverLoadingState = action.payload;
        },
        setCardsLoadingState: (state, action) => {
            state.cardsLoadingState = action.payload;
        },
        setCardsPreLoadingState: (state, action) => {
            state.cardsPreLoadingState = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(connectionTest.fulfilled, (state : any, action : any) => {
            if (action.payload && action.payload.message === "Conectado!") {
                state.serverLoadingState = false;
            } else {
                state.connectionError = true;
            };
        });
        builder.addCase(connectionTest.rejected, (state : any, action : any) => {
            if (action.payload && action.payload.message === "Conectado!") {
                state.serverLoadingState = false;
            } else {
                state.connectionError = true;
            };
        });
    }
});

export const { setResourcesLoadingState, setServerLoadingState, setCardsLoadingState, setCardsPreLoadingState } = loadingSlice.actions;
export default loadingSlice.reducer;