import {configureStore} from "@reduxjs/toolkit";
import entriesReducer from './slices/entriesSlice';
import entriesFilterReducer from './slices/entriesFilterSlice';
import trophiesReducer from './slices/trophiesSlice';
import {useDispatch} from 'react-redux';

const store = configureStore({
    reducer: {
        entriesFilter: entriesFilterReducer,
        entries: entriesReducer,
        trophies: trophiesReducer
    }
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export default store;
