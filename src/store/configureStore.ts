import { configureStore } from "@reduxjs/toolkit";
import setCardsReducer from "./slices/setCardsSlice";
const store = configureStore({
    reducer:{
        setCards: setCardsReducer,
    }
});
export default store;