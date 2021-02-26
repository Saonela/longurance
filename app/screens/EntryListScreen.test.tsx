import {configureStore} from '@reduxjs/toolkit';
import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import React from 'react';
import {Provider} from "react-redux";
import EntryListScreen from './EntryListScreen';
import {fireEvent, render} from '@testing-library/react-native';
import entriesReducer from '../redux/slices/entriesSlice';
import entriesFilterReducer from '../redux/slices/entriesFilterSlice';
import {Activity} from '../types/Activity';
import {Entry} from '../types/Entry';

const entries: Partial<Entry>[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 92,
        date: '2021-01-07T09:10:02.207Z',
        energy: 2,
        note: 'Was really enjoying. Got into flow state.',
    },
    {
        id: '2',
        activity: Activity.CYCLING,
        distance: 99,
        duration: 180,
        date: '2021-01-01T00:10:02.207Z',
        energy: 0,
        note: '',
    },
    {
        id: '3',
        activity: Activity.SWIMMING,
        distance: 5,
        duration: 57,
        date: '2020-12-08T09:10:02.207Z',
        energy: -1,
        note: 'Almost drowned!',
    }
];

describe('EntryListScreen', () => {
    test('it should display list', () => {
        const initialState: any = {
            entries: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: entries
            },
            entriesFilter: null
        };
        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer
            },
            preloadedState: initialState
        });

        const component = (
            <Provider store={store}>
                <EntryListScreen navigation={{}}/>
            </Provider>
        );

        const { getByText } = render(component);

        getByText('2021-01-07');
        getByText('Was really enjoying. Got into flow state.');
        getByText('5 KM');
    });

    test('it should filter list', async () => {
        const initialState: any = {
            entries: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: entries
            },
            entriesFilter: Activity.SWIMMING
        };

        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer
            },
            preloadedState: initialState
        });

        const component = (
            <Provider store={store}>
                <EntryListScreen navigation={{}}/>
            </Provider>
        );

        const {getByText, queryByText} = render(component);

        expect(queryByText('2021-01-01')).toBeFalsy();
        expect(queryByText('Was really enjoying. Got into flow state.')).toBeFalsy();
        getByText('Almost drowned!');

        fireEvent.press(getByText('Running'));

        expect(queryByText('2021-01-01')).toBeFalsy();
        expect(queryByText('Almost drowned!')).toBeFalsy();
        getByText('Was really enjoying. Got into flow state.');

    });
});
