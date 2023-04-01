import { configureStore } from "@reduxjs/toolkit";
import setCardsReducer from "../slices/setCardsSlice";
import setModoReducer from "../slices/setModoSlice"
const store = configureStore({
    reducer:{
        setCards: setCardsReducer,
        setModo: setModoReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;