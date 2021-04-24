import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ASYNC_STATE_STATUS} from "../asyncStateStatus";
import StorageService from '../../services/StorageService';
import {TrophiesSliceState} from '../../types/SliceState';
import UtilityService from '../../services/UtilityService';
import {Trophy} from '../../types/Trophy';
import {Activity} from '../../types/Activity';
import {saveEntry} from './entriesSlice';

export const loadTrophies = createAsyncThunk('trophies/loadTrophies', async () => {
    return await StorageService.loadTrophies();
});

export const saveTrophy = createAsyncThunk('trophies/saveTrophy', async (trophy: Trophy) => {
    if (!trophy.id) {
        trophy.id = UtilityService.generateId();
    }
    StorageService.saveTrophy(trophy).then();
    return trophy;
});

export const markTrophyAsRead = createAsyncThunk('trophies/markTrophyAsRead', async (trophy: Trophy) => {
    StorageService.saveTrophy({...trophy, markedAsRead: true}).then();
    return trophy;
});

export const deleteTrophy = createAsyncThunk('trophies/deleteTrophy', async (id: string) => {
    StorageService.deleteTrophy(id).then();
    return id;
});

const trophiesSlice = createSlice({
    name: 'trophies',
    initialState: {
        status: ASYNC_STATE_STATUS.IDLE,
        error: null,
        data: [{
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                completedAt: '2021-01-07T09:10:02.207Z',
                completed: true,
                markedAsRead: false,
                title: 'My first half marathon !',
            },
            {
                id: '2',
                activity: Activity.CYCLING,
                distance: 100,
                duration: 180,
                completedAt: null,
                completed: false,
                markedAsRead: false,
                title: 'Sweet 100.',
            },
            {
                id: '3',
                activity: Activity.SWIMMING,
                distance: 5000,
                duration: 57,
                completedAt: '2020-12-08T09:10:02.207Z',
                completed: true,
                markedAsRead: false,
                title: 'IRONMAN',
            }]
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
            const trophy = state.data.find(trophy => trophy.id === action.payload.id);
            if (trophy) {
                Object.assign(trophy, action.payload);
            } else {
                state.data.unshift(action.payload);
            }
        });
        builder.addCase(markTrophyAsRead.fulfilled, (state, action) => {
            const trophy = state.data.find(trophy => trophy.id === action.payload.id);
            Object.assign(trophy, {markedAsRead: true});
        });
        builder.addCase(deleteTrophy.fulfilled, (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        });
        builder.addCase(saveEntry.fulfilled, (state, action) => {
            const entry = action.payload;
            state.data
                .filter(trophy => trophy.activity === entry.activity && !trophy.completed)
                .filter(trophy => trophy.distance && entry.distance && entry.distance >= trophy.distance ||
                                  trophy.duration && entry.duration && entry.duration >= trophy.duration)
                .forEach(trophy => {
                    trophy.entryId = entry.id;
                    trophy.completedAt = entry.createdAt;
                    trophy.completed = true;
                });
        });
    }
});

export const getTrophy = (state, id) => state.trophies.data.find(trophy => trophy.id === id);
export const getTrophies = state => state.trophies.data;
export const getUnreadTrophies = state => state.trophies.data.filter(trophy => trophy.completed && !trophy.markedAsRead);
export const getTrophiesStatus = state => state.trophies.status;

const trophiesReducer = trophiesSlice.reducer;
export default trophiesReducer;
