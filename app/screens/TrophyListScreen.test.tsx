import {render} from '@testing-library/react-native';
import React from 'react';
import {Activity} from '../types/Activity';
import {Trophy, TrophyType} from '../types/Trophy';
import TrophyListScreen from './TrophyListScreen';
import {useTrophiesStore} from '../state/trophies';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

const trophies: Trophy[] = [
    {
        id: '1',
        type: TrophyType.TOTAL,
        activity: Activity.RUNNING,
        distance: 21,
        duration: 0,
        createdAt: '2021-01-07T09:10:02.207Z',
        completedAt: '2021-01-07T09:10:02.207Z',
        completed: true,
        markedAsRead: false,
        entryIds: [],
        title: 'My first half marathon !'
    },
    {
        id: '2',
        type: TrophyType.INDIVIDUAL,
        activity: Activity.CYCLING,
        distance: 100,
        duration: 180,
        createdAt: '2021-01-07T09:10:02.207Z',
        completedAt: null,
        completed: false,
        markedAsRead: false,
        entryIds: [],
        title: 'Sweet 100.'
    },
    {
        id: '3',
        type: TrophyType.INDIVIDUAL,
        activity: Activity.SWIMMING,
        distance: 5000,
        duration: 57,
        createdAt: '2020-12-08T09:10:02.207Z',
        completedAt: '2020-12-08T09:10:02.207Z',
        completed: true,
        markedAsRead: true,
        entryIds: ['11'],
        title: 'IRONMAN'
    }
];

const navigation = {
    setOptions: () => null
};

describe('TrophyListScreen', () => {
    it('should display list', () => {
        useTrophiesStore.setState({trophies});
        const component = <TrophyListScreen navigation={navigation} />;
        const {getByText} = render(component);
        getByText('My first half marathon !');
        getByText('Sweet 100.');
        getByText('IRONMAN');
    });
});
