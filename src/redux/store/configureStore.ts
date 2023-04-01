import { configureStore } from "@reduxjs/toolkit";
import setCardsReducer from "../slices/setCardsSlice";
import setModoReducer from "../slices/setModoSlice";
import infosCombateReducer from "../slices/infosCombateSlice";
const store = configureStore({
    reducer:{
        setCards: setCardsReducer,
        setModo: setModoReducer,
        setInfosCombate: infosCombateReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;