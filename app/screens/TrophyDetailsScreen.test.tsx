import React from 'react';
import {render} from '@testing-library/react-native';
import {Activity} from '../enums/Activity';
import {Trophy} from '../types/Trophy';
import {useTrophiesStore} from '../state/trophies';
import TrophyDetailsScreen from './TrophyDetailsScreen';
import {useEntriesStore} from '../state/entries';
import {Entry} from '../types/Entry';
import {TrophyType} from '../enums/TrophyType';

const entries: Entry[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 20,
        duration: 4000,
        createdAt: '2021-01-07T09:10:02.207Z',
        date: '2021-01-07T09:10:02.207Z',
        effort: 2,
        title: 'My best run',
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

describe('TrophyDetailsScreen', () => {
    it('should show trophy details', async () => {
        useTrophiesStore.setState({trophies});
        const component = (
            <TrophyDetailsScreen
                navigation={navigation}
                route={{params: {id: '200'}}}
            />
        );
        const {getByText} = render(component);
        getByText('Half marathon trophy');
        getByText('20km');
        getByText('RUN');
    });

    it('should show associated individual entries', () => {
        useEntriesStore.setState({entries});
        useTrophiesStore.setState({trophies});
        const component = (
            <TrophyDetailsScreen
                navigation={navigation}
                route={{params: {id: '200'}}}
            />
        );
        const {getByText} = render(component);
        getByText('My best run');
    });

    it('should show associated total entries', () => {
        useEntriesStore.setState({entries});
        useTrophiesStore.setState({trophies});
        const component = (
            <TrophyDetailsScreen
                navigation={navigation}
                route={{params: {id: '300'}}}
            />
        );
        const {getByText} = render(component);
        getByText('My best run');
    });
});
