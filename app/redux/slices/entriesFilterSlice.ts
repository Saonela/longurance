import {createSlice} from "@reduxjs/toolkit";
import {Activity} from '../../types/Activity';

const entriesFilterSlice = createSlice({
    name: 'entriesFilter',
    initialState: null as Activity | null,
    reducers: {
        setEntriesFilter(state, action) {
            return action.payload;
        },
    },
});

export const getEntriesFilter = state => state.entriesFilter;

export const { setEntriesFilter } = entriesFilterSlice.actions

const entriesFilterReducer = entriesFilterSlice.reducer;
export default entriesFilterReducer;
