import React from 'react';
import {render} from '@testing-library/react-native';
import {Activity} from '../types/Activity';
import {Trophy, TrophyType} from '../types/Trophy';
import {useTrophiesStore} from '../state/trophies';
import TrophyDetailsScreen from './TrophyDetailsScreen';

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
        markedAsRead: false
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
        markedAsRead: false
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
});
