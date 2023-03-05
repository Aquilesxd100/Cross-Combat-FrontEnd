import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from "react-redux";
import cardSlice from '../store/slices/slices';
import charactersSlice from "../store/characters";
import charactersSearchSlice from "../store/searchCharacter";

const reducer = combineReducers({
    setAttributes: cardSlice,
    setCharacters: charactersSlice,
    setSearch: charactersSearchSlice,
})

const store = configureStore({
    reducer
});
export type RootState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export const useStoreDispatch: () => StoreDispatch = useDispatch;
export default store;