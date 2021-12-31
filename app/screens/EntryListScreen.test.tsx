import React from 'react';
import EntryListScreen from './EntryListScreen';
import {render} from '@testing-library/react-native';
import {Activity} from '../types/Activity';
import {Entry} from '../types/Entry';
import {useEntriesStore} from '../state/entries';

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
    setOptions: () => {}
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
});
