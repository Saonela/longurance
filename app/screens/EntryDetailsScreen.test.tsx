import {configureStore} from '@reduxjs/toolkit';
import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import React from 'react';
import {Provider} from 'react-redux';
import {render} from '@testing-library/react-native';
import entriesReducer from '../redux/slices/entriesSlice';
import entriesFilterReducer from '../redux/slices/entriesFilterSlice';
import {Activity} from '../types/Activity';
import {Entry} from '../types/Entry';
import EntryDetailsScreen from './EntryDetailsScreen';
import renderer from 'react-test-renderer';
import trophiesReducer from '../redux/slices/trophiesSlice';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

const entries: Partial<Entry>[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 4000,
        date: '2021-01-07T09:10:02.207Z',
        effort: 2,
        title: 'YES',
        note: 'Was really enjoying. Got into flow state.'
    }
];

describe('EntryDetailsScreen', () => {
    let store;

    const navigation = {
        setOptions: () => {}
    };

    beforeEach(() => {
        const initialState: any = {
            entries: {
                status: ASYNC_STATE_STATUS.SUCCEEDED,
                error: null,
                data: entries
            },
            entriesFilter: null,
            trophies: {
                data: []
            }
        };
        store = configureStore({
            reducer: {
                entries: entriesReducer,
                entriesFilter: entriesFilterReducer,
                trophies: trophiesReducer
            },
            preloadedState: initialState
        });
    });

    it('should show entry details', () => {
        const component = (
            <Provider store={store}>
                <EntryDetailsScreen
                    navigation={navigation}
                    route={{params: {id: '1'}}}
                />
            </Provider>
        );

        const {getByText} = render(component);

        getByText('Was really enjoying. Got into flow state.');
    });

    it('should match snapshot', () => {
        const component = (
            <Provider store={store}>
                <EntryDetailsScreen
                    navigation={navigation}
                    route={{params: {id: '1'}}}
                />
            </Provider>
        );

        const tree = renderer.create(component).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
