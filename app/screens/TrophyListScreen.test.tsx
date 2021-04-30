import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {act, render} from '@testing-library/react-native';
import React from 'react';
import {Activity} from '../types/Activity';
import {Trophy} from '../types/Trophy';
import TrophyListScreen from './TrophyListScreen';
import trophiesReducer from '../redux/slices/trophiesSlice';
import * as reactRedux from 'react-redux'
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');


const trophies: Partial<Trophy>[] = [
    {
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
        markedAsRead: true,
        title: 'IRONMAN',
    }
];

describe('TrophyListScreen', () => {
    let initialState: any;
    let store: any;
    let navigation: any;

    jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(jest.fn())

    beforeEach(() => {
        initialState = {
            trophies: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: trophies
            }
        };
        store = configureStore({
            reducer: {
                trophies: trophiesReducer,
            },
            preloadedState: initialState
        });
        navigation = {
            setOptions: () => {}
        };
    });

    test('it should display list', async () => {
        const component = (
            <Provider store={store}>
                <TrophyListScreen navigation={navigation}/>
            </Provider>
        );

        const {getByText} = render(component);
        getByText('Sweet 100.');
        getByText('IRONMAN');
    });

    test('it should display trophy congratulations card', () => {
        const component = (
            <Provider store={store}>
                <TrophyListScreen navigation={navigation}/>
            </Provider>
        );

        const {getByText} = render(component);
        getByText('Trophy achieved!');
    });
});
