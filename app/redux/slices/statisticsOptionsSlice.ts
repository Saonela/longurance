import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
    ChartDataType,
    ChartTimeInterval,
    StatisticsOptions
} from '../../types/StatisticsOptions';
import StorageService from '../../services/StorageService';

export const loadStatisticsOptions = createAsyncThunk(
    'statisticsOptions/loadStatisticsOptions',
    async () => {
        return await StorageService.loadStatisticsOptions();
    }
);

export const updateStatisticsOptions = createAsyncThunk(
    'statisticsOptions/updateStatisticsOptions',
    async (options: Partial<StatisticsOptions>, thunkAPI) => {
        const state: any = thunkAPI.getState();
        options = Object.assign({}, state.statisticsOptions, options);
        StorageService.saveStatisticsOptions(
            options as StatisticsOptions
        ).then();
        return options;
    }
);

const statisticsOptionsSlice = createSlice({
    name: 'statisticsOptions',
    initialState: {
        chartTimeInterval: ChartTimeInterval.DAYS_30,
        chartDataType: ChartDataType.DISTANCE
    } as StatisticsOptions,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            loadStatisticsOptions.fulfilled,
            (state: StatisticsOptions, action) => {
                if (state) {
                    state = <StatisticsOptions>action.payload;
                }
                return state;
            }
        );
        builder.addCase(updateStatisticsOptions.fulfilled, (state, action) => {
            Object.assign(state, action.payload);
        });
    }
});

export const getStatisticsOptions = (state): StatisticsOptions =>
    state.statisticsOptions;

const statisticsOptionsReducer = statisticsOptionsSlice.reducer;
export default statisticsOptionsReducer;
