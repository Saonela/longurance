import {configureStore} from "@reduxjs/toolkit";
import entriesReducer from './slices/entriesSlice';

export default configureStore({
    reducer: {
        entries: entriesReducer
    }
});
