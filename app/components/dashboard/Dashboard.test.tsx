import {configureStore} from '@reduxjs/toolkit';
import {render} from '@testing-library/react-native';
import React from 'react';
import {Provider} from 'react-redux';
import entriesReducer from '../../redux/slices/entriesSlice';
import entriesFilterReducer from '../../redux/slices/entriesFilterSlice';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import {Activity} from '../../types/Activity';
import {Entry} from '../../types/Entry';
import Dashboard from './Dashboard';

const entries: Partial<Entry>[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 92,
        date: '2021-01-07T09:10:02.207Z',
        effort: 5,
        title: 'MY RUN',
        note: 'Was really enjoying. Got into flow state.'
    },
    {
        id: '2',
        activity: Activity.CYCLING,
        duration: 180,
        date: '2021-01-01T00:10:02.207Z',
        effort: 3,
        note: ''
    },
    {
        id: '3',
        activity: Activity.SWIMMING,
        distance: 5,
        date: '2020-12-08T09:10:02.207Z',
        effort: 4,
        title: 'Learn to Swim',
        note: 'Almost drowned!'
    }
];

const initialState = {
    entries: {
        status: ASYNC_STATE_STATUS.SUCCEEDED,
        error: null,
        data: entries
    },
    entriesFilter: null
};

describe('Dashboard', () => {
    it('should display period statistics', () => {
        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer
            },
            preloadedState: {...initialState}
        });

        const {getByText} = render(
            <Provider store={store}>
                <Dashboard />
            </Provider>
        );
        getByText('ALL ACTIVITY');
    });
});
