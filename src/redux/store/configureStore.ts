import { configureStore } from "@reduxjs/toolkit";
import setCardsReducer from "../slices/setCardsSlice";
const store = configureStore({
    reducer:{
        setCards: setCardsReducer,
    }
});
export type RootState = ReturnType<typeof store.getState>;
export default store;