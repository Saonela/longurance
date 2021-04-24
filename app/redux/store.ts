import {configureStore} from "@reduxjs/toolkit";
import entriesReducer from './slices/entriesSlice';
import entriesFilterReducer from './slices/entriesFilterSlice';
import trophiesReducer from './slices/trophiesSlice';

export default configureStore({
    reducer: {
        entriesFilter: entriesFilterReducer,
        entries: entriesReducer,
        trophies: trophiesReducer
    }
});
