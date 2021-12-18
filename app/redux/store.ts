import {useDispatch} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import entriesReducer from './slices/entriesSlice';
import entriesFilterReducer from './slices/entriesFilterSlice';
import trophiesReducer from './slices/trophiesSlice';
import statisticsOptionsReducer from './slices/statisticsOptionsSlice';

const store = configureStore({
    reducer: {
        entriesFilter: entriesFilterReducer,
        entries: entriesReducer,
        trophies: trophiesReducer,
        statisticsOptions: statisticsOptionsReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); // Export a hook that can be reused to resolve types

export default store;
