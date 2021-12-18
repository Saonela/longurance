import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ASYNC_STATE_STATUS} from '../asyncStateStatus';
import {Entry} from '../../types/Entry';
import StorageService from '../../services/StorageService';
import {EntriesSliceState} from '../../types/SliceState';
import {generateId} from '../../lib/utility';

export const loadEntries = createAsyncThunk('entries/loadEntries', async () => {
    return await StorageService.loadEntries();
});

export const saveEntry = createAsyncThunk(
    'entries/saveEntry',
    async (entry: Entry) => {
        if (!entry.id) {
            entry.id = generateId();
        }
        StorageService.saveEntry(entry).then();
        return entry;
    }
);

export const deleteEntry = createAsyncThunk(
    'entries/deleteEntry',
    async (id: string) => {
        StorageService.deleteEntry(id).then();
        return id;
    }
);

const entriesSlice = createSlice({
    name: 'entries',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: []
    } as EntriesSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadEntries.pending, (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        });
        builder.addCase(loadEntries.fulfilled, (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            state.data = action.payload;
        });
        builder.addCase(saveEntry.fulfilled, (state, action) => {
            const entry = state.data.find(
                (entry) => entry.id === action.payload.id
            );
            if (entry) {
                Object.assign(entry, action.payload);
            } else {
                state.data.unshift(action.payload);
            }
        });
        builder.addCase(deleteEntry.fulfilled, (state, action) => {
            state.data = state.data.filter(
                (item) => item.id !== action.payload
            );
        });
    }
});

export const getEntry = (state, id) =>
    state.entries.data.find((entry) => entry.id === id);
export const getEntries = (state) =>
    state.entries.data.filter(
        (entry) =>
            entry.activity === state.entriesFilter || !state.entriesFilter
    );
export const getEntriesStatus = (state) => state.entries.status;

const entriesReducer = entriesSlice.reducer;
export default entriesReducer;
