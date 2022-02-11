import React from 'react';
import {render, within} from '@testing-library/react-native';
import EntryListScreen from './EntryListScreen';
import {Activity} from '../enums/Activity';
import {Entry} from '../types/Entry';
import {useEntriesStore} from '../state/entries';
import {useEntriesSettingsStore} from '../state/entries-settings';
import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const entries: Entry[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 92,
        createdAt: '2021-01-07T09:10:02.207Z',
        date: '2021-01-07T09:10:02.207Z',
        effort: 5,
        title: 'MY RUN',
        note: 'Was really enjoying. Got into flow state.'
    },
    {
        id: '2',
        activity: Activity.CYCLING,
        distance: 99,
        duration: 180,
        createdAt: '2021-01-07T09:10:02.207Z',
        date: '2021-01-01T00:10:02.207Z',
        effort: 3,
        title: '',
        note: ''
    },
    {
        id: '3',
        activity: Activity.SWIMMING,
        distance: 5,
        duration: 57,
        createdAt: '2021-01-07T09:10:02.207Z',
        date: '2020-12-08T09:10:02.207Z',
        effort: 4,
        title: 'Learn to Swim',
        note: 'Almost drowned!'
    }
];

const navigation = {
    setOptions: () => null
};

describe('EntryListScreen', () => {
    it('should display list', () => {
        useEntriesStore.setState({entries});
        const component = <EntryListScreen navigation={navigation} />;
        const {getByText} = render(component);
        getByText('MY RUN');
        getByText('99km');
        getByText('Learn to Swim');
    });

    it('should sort list', () => {
        useEntriesStore.setState({entries});
        useEntriesSettingsStore.setState({
            settings: {
                sortBy: EntriesSortBy.EFFORT,
                sortDirection: SortDirection.ASCENDING
            }
        });
        const component = <EntryListScreen navigation={navigation} />;
        const {getAllByA11yLabel} = render(component);
        const cards = getAllByA11yLabel('Entry card');
        within(cards[0]).getByText('99km');
        within(cards[1]).getByText('Learn to Swim');
        within(cards[2]).getByText('MY RUN');
    });
});
