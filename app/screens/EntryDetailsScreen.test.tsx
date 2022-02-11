import React from 'react';
import {render} from '@testing-library/react-native';
import {Activity} from '../enums/Activity';
import {Entry} from '../types/Entry';
import EntryDetailsScreen from './EntryDetailsScreen';
import {useEntriesStore} from '../state/entries';
import {Trophy} from '../types/Trophy';
import {useTrophiesStore} from '../state/trophies';
import {TrophyType} from '../enums/TrophyType';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const entries: Entry[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 4000,
        createdAt: '2021-01-07T09:10:02.207Z',
        date: '2021-01-07T09:10:02.207Z',
        effort: 2,
        title: 'YES',
        note: 'Was really enjoying. Got into flow state.'
    }
];

const trophies: Trophy[] = [
    {
        id: '200',
        title: 'Half marathon trophy',
        activity: Activity.RUNNING,
        type: TrophyType.INDIVIDUAL,
        entryIds: ['1'],
        distance: 20,
        duration: 0,
        createdAt: '2022-01-01',
        completedAt: '2022-01-01',
        completed: true,
        markedAsRead: false,
        predefined: false
    },
    {
        id: '300',
        title: '10 hours of running',
        activity: Activity.RUNNING,
        type: TrophyType.TOTAL,
        entryIds: ['1', '2', '3'],
        distance: 0,
        duration: 36000,
        createdAt: '2021-01-01',
        completedAt: '2022-01-01',
        completed: true,
        markedAsRead: false,
        predefined: false
    }
];

const navigation = {
    setOptions: () => null
};

describe('EntryDetailsScreen', () => {
    it('should show entry details', async () => {
        useEntriesStore.setState({entries});
        const component = (
            <EntryDetailsScreen
                navigation={navigation}
                route={{params: {id: '1'}}}
            />
        );
        const {getByText} = render(component);
        getByText('Was really enjoying. Got into flow state.');
    });

    it('should show associated completed individual trophies', () => {
        useEntriesStore.setState({entries});
        useTrophiesStore.setState({trophies});
        const component = (
            <EntryDetailsScreen
                navigation={navigation}
                route={{params: {id: '1'}}}
            />
        );
        const {queryByText, getByText} = render(component);
        getByText('Half marathon trophy');
        expect(queryByText('10 hours of running')).toBeNull();
    });
});
