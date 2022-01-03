import React from 'react';
import {render} from '@testing-library/react-native';
import {Activity} from '../types/Activity';
import {Entry} from '../types/Entry';
import EntryDetailsScreen from './EntryDetailsScreen';
import {useEntriesStore} from '../state/entries';

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
});
