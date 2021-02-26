import {configureStore} from "@reduxjs/toolkit";
import entriesReducer from './slices/entriesSlice';
import entriesFilterReducer from './slices/entriesFilterSlice';

export default configureStore({
    reducer: {
        entriesFilter: entriesFilterReducer,
        entries: entriesReducer
    }
});
