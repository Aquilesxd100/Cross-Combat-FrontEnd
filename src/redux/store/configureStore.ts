import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch } from "react-redux";
import storageSession from "redux-persist/lib/storage/session";
import storage from "redux-persist/lib/storage";
import setCardsReducer from "../slices/setCardsSlice";
import setModoReducer from "../slices/setModoSlice";
import infosCombateReducer from "../slices/infosCombateSlice";
import playerCardTypeSliceReducer from "../slices/playerCardTypeSlice";
import saveGameSliceReducer from "../slices/saveGameSlice";
import modalReducer from "../slices/modalSlice";
import pontuacaoReducer from "../slices/pontuacaoSlice";
import soundsReducer from "../slices/soundSlice";

const playerCardTypeConfig = {
    key: 'playerCardType',
    storage : storageSession
};

const saveGameConfig = {
    key: 'saveGame',
    storage
};

const playerCardTypeReducer = persistReducer(playerCardTypeConfig, playerCardTypeSliceReducer);
const saveGameReducer = persistReducer(saveGameConfig, saveGameSliceReducer);

const store = configureStore({
    reducer:{
        setCards: setCardsReducer,
        setModo: setModoReducer,
        setInfosCombate: infosCombateReducer,
        playerCardType: playerCardTypeReducer,
        saveGame: saveGameReducer,
        modalStatus: modalReducer,
        pontuacao: pontuacaoReducer,
        sounds: soundsReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
});
const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type DefaultStore = typeof store.dispatch;
export const useStoreDispatch: () => DefaultStore = useDispatch;
export { store, persistor };
export default store;