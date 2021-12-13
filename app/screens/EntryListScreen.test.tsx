import {configureStore} from '@reduxjs/toolkit';
import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import React from 'react';
import {Provider} from "react-redux";
import EntryListScreen from './EntryListScreen';
import {act, fireEvent, render} from '@testing-library/react-native';
import entriesReducer from '../redux/slices/entriesSlice';
import entriesFilterReducer from '../redux/slices/entriesFilterSlice';
import {Activity} from '../types/Activity';
import {Entry} from '../types/Entry';
import {Trophy} from '../types/Trophy';
import trophiesReducer from '../redux/slices/trophiesSlice';
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


const entries: Partial<Entry>[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 92,
        date: '2021-01-07T09:10:02.207Z',
        effort: 5,
        title: 'MY RUN',
        note: 'Was really enjoying. Got into flow state.',
    },
    {
        id: '2',
        activity: Activity.CYCLING,
        distance: 99,
        duration: 180,
        date: '2021-01-01T00:10:02.207Z',
        effort: 3,
        note: '',
    },
    {
        id: '3',
        activity: Activity.SWIMMING,
        distance: 5,
        duration: 57,
        date: '2020-12-08T09:10:02.207Z',
        effort: 4,
        title: 'Learn to Swim',
        note: 'Almost drowned!',
    }
];

const trophies: Partial<Trophy>[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 21,
        completedAt: '2021-01-07T09:10:02.207Z',
        completed: true,
        markedAsRead: false,
        title: 'My first half marathon !',
    }
];

const navigation = {
    setOptions: () => {}
};

const initialState: any = {
    entries: {
        status: ASYNC_STATE_STATUS.SUCCEEDED,
        error: null,
        data: entries
    },
    trophies: {
        status: ASYNC_STATE_STATUS.SUCCEEDED,
        error: null,
        data: trophies
    },
    entriesFilter: Activity.SWIMMING
};

describe('EntryListScreen', () => {
    it('should display list', () => {
        const state = Object.assign({}, initialState, {entriesFilter: null});

        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer,
                trophies: trophiesReducer
            },
            preloadedState: state
        });

        const component = (
            <Provider store={store}>
                <EntryListScreen navigation={navigation}/>
            </Provider>
        );

        const {getByText} = render(component);

        getByText('Thu, Jan 07');
        getByText('MY RUN');
        getByText('5km');
    });

    it('should filter list', async () => {
        const initialState: any = {
            entries: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: entries
            },
            trophies: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: trophies
            },
            entriesFilter: Activity.SWIMMING
        };

        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer,
                trophies: trophiesReducer
            },
            preloadedState: initialState
        });

        const component = (
            <Provider store={store}>
                <EntryListScreen navigation={navigation}/>
            </Provider>
        );

        const {getByText, queryByText} = render(component);

        expect(queryByText('2021-01-01')).toBeFalsy();
        expect(queryByText('MY RUN')).toBeFalsy();
        getByText('Learn to Swim');
    });

    it('should notify about completed trophy', async () => {
        const state = Object.assign({}, initialState);
        delete state.entriesFilter;

        const store = configureStore({
            reducer: {
                entries: entriesReducer,
                trophies: trophiesReducer
            },
            preloadedState: state
        });

        const component = (
            <Provider store={store}>
                <EntryListScreen navigation={navigation}/>
            </Provider>
        );

        const {getByText, queryByText} = render(component);

        getByText('Trophy achieved!');
        await act(async () => {
            fireEvent.press(getByText('Close'));
        });
        expect(queryByText('Trophy achieved!')).toBeFalsy();
    });

});
