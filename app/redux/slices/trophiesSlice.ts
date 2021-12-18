import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {ASYNC_STATE_STATUS} from '../asyncStateStatus';
import StorageService from '../../services/StorageService';
import {TrophiesSliceState} from '../../types/SliceState';
import {generateId} from '../../lib/utility';
import {Trophy} from '../../types/Trophy';
import {Entry} from '../../types/Entry';

export const loadTrophies = createAsyncThunk(
    'trophies/loadTrophies',
    async () => {
        return await StorageService.loadTrophies();
    }
);

export const saveTrophy = createAsyncThunk(
    'trophies/saveTrophy',
    async (trophy: Trophy, thunkAPI) => {
        const state: any = thunkAPI.getState();

        if (!trophy.id) {
            trophy.id = generateId();
        }

        const trophyEntry = state.entries.data.find(
            (entry) => entry.id === trophy.entryId
        );
        if (trophyEntry && !isTrophyCompletedByEntry(trophyEntry, trophy)) {
            trophy = setTrophyToNotCompleted(trophy);
        }

        const entry = state.entries.data.find((entry) =>
            isTrophyCompletedByEntry(entry, trophy)
        );
        if (entry) {
            trophy = setTrophyToCompleted(trophy, entry);
        }

        StorageService.saveTrophy(trophy).then();

        return trophy;
    }
);

export const saveEntryTrophies = createAsyncThunk(
    'trophies/saveEntryTrophies',
    async (entry: Entry, thunkAPI) => {
        const state: any = thunkAPI.getState();

        const completedTrophies = state.trophies.data
            .filter(isTrophyCompletedByEntry.bind(this, entry))
            .map((trophy) => setTrophyToCompleted(trophy, entry));

        if (completedTrophies.length) {
            StorageService.saveTrophies(completedTrophies).then();
        }

        const uncompletedTrophies = state.trophies.data
            .filter((trophy) => trophy.entryId === entry.id)
            .filter((trophy) => !isTrophyCompletedByEntry(entry, trophy))
            .map((trophy) => setTrophyToNotCompleted(trophy));

        if (uncompletedTrophies.length) {
            StorageService.saveTrophies(uncompletedTrophies).then();
        }

        return completedTrophies.concat(uncompletedTrophies);
    }
);

export const markTrophyAsRead = createAsyncThunk(
    'trophies/markTrophyAsRead',
    async (trophy: Trophy) => {
        StorageService.saveTrophy({...trophy, markedAsRead: true}).then();
        return trophy;
    }
);

export const deleteTrophy = createAsyncThunk(
    'trophies/deleteTrophy',
    async (id: string) => {
        StorageService.deleteTrophy(id).then();
        return id;
    }
);

const trophiesSlice = createSlice({
    name: 'trophies',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: []
    } as TrophiesSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(loadTrophies.pending, (state, action) => {
            state.status = ASYNC_STATE_STATUS.LOADING;
        });
        builder.addCase(loadTrophies.fulfilled, (state, action) => {
            state.status = ASYNC_STATE_STATUS.SUCCEEDED;
            state.data = action.payload;
        });
        builder.addCase(saveTrophy.fulfilled, (state, action) => {
            const trophy = state.data.find(
                (trophy) => trophy.id === action.payload.id
            );
            if (trophy) {
                Object.assign(trophy, action.payload);
            } else {
                state.data.unshift(action.payload);
            }
        });
        builder.addCase(markTrophyAsRead.fulfilled, (state, action) => {
            const trophy = state.data.find(
                (trophy) => trophy.id === action.payload.id
            );
            Object.assign(trophy, {markedAsRead: true});
        });
        builder.addCase(deleteTrophy.fulfilled, (state, action) => {
            state.data = state.data.filter(
                (item) => item.id !== action.payload
            );
        });
        builder.addCase(saveEntryTrophies.fulfilled, (state, action) => {
            action.payload.forEach((trophy: Trophy) => {
                const item = state.data.find((item) => item.id === trophy.id);
                if (item) {
                    Object.assign(item, trophy);
                }
            });
        });
    }
});

const isMoreDistance = (x, y) => x.distance >= y.distance;
const isLongerDuration = (x, y) => x.duration >= y.duration;

const isTrophyCompletedByDistance = (entry, trophy) =>
    trophy.distance &&
    !trophy.duration &&
    entry.distance &&
    isMoreDistance(entry, trophy);
const isTrophyCompletedByDuration = (entry, trophy) =>
    trophy.duration &&
    !trophy.distance &&
    entry.duration &&
    isLongerDuration(entry, trophy);
const isTrophyCompletedByDistanceAndDuration = (entry, trophy) =>
    trophy.distance &&
    trophy.duration &&
    entry.distance &&
    entry.duration &&
    isMoreDistance(entry, trophy) &&
    isLongerDuration(trophy, entry);

const isTrophyCompletedByEntry = (entry: Entry, trophy: Trophy) =>
    trophy.activity === entry.activity &&
    (isTrophyCompletedByDistanceAndDuration(entry, trophy) ||
        isTrophyCompletedByDistance(entry, trophy) ||
        isTrophyCompletedByDuration(entry, trophy));

const setTrophyToCompleted = (trophy: Trophy, entry: Entry) => {
    return Object.assign({}, trophy, {
        entryId: entry.id,
        completedAt: new Date().toISOString(),
        completed: true
    });
};

const setTrophyToNotCompleted = (trophy: Trophy) => {
    return Object.assign({}, trophy, {
        entryId: null,
        completedAt: null,
        completed: false,
        markedAsRead: false
    });
};

export const getTrophy = (state, id) =>
    state.trophies.data.find((trophy) => trophy.id === id);
export const getTrophies = (state) => state.trophies.data;
export const getTrophiesByEntry = (state, entry) =>
    state.trophies.data.filter((trophy) => trophy.entryId === entry.id);
export const getFilteredCompletedTrophies = (state) =>
    state.trophies.data.filter(
        (trophy) =>
            trophy.completed &&
            (!state.entriesFilter || state.entriesFilter === trophy.activity)
    );
export const getUnreadTrophies = (state) =>
    state.trophies.data.filter(
        (trophy) => trophy.completed && !trophy.markedAsRead
    );
export const getTrophiesStatus = (state) => state.trophies.status;

const trophiesReducer = trophiesSlice.reducer;
export default trophiesReducer;
