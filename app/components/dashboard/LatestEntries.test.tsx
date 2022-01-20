import {render} from '@testing-library/react-native';
import React from 'react';
import {Activity} from '../../types/Activity';
import {Entry} from '../../types/Entry';
import LatestEntries from './LatestEntries';
import {useEntriesStore} from '../../state/entries';

const entries: Entry[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 15,
        duration: 92,
        createdAt: '2021-01-01T00:00:00.00Z',
        date: '2021-01-07T09:10:02.207Z',
        effort: 2,
        note: 'Was really enjoying. Got into flow state.'
    },
    {
        id: '2',
        title: '',
        activity: Activity.CYCLING,
        distance: 99,
        duration: 180,
        createdAt: '2021-01-01T00:00:00.00Z',
        date: '2021-01-01T00:10:02.207Z',
        effort: 1,
        note: ''
    },
    {
        id: '3',
        title: '',
        activity: Activity.SWIMMING,
        distance: 99,
        duration: 180,
        createdAt: '2021-01-01T00:00:00.00Z',
        date: '2021-01-01T00:10:02.207Z',
        effort: 3,
        note: ''
    }
] as Entry[];

const emptyMessage = 'There is no activity yet!';

describe('LatestEntries', () => {
    it('should display entries', () => {
        useEntriesStore.setState({entries});
        const component = (
            <LatestEntries
                itemsCount={2}
                onPress={jest.fn}
                onSeeMore={jest.fn}
                onAddNew={jest.fn}
            />
        );
        const {getByText, queryByText} = render(component);
        getByText('RUN');
        getByText('CYCLE');
        expect(queryByText('SWIM')).toBeNull();
        expect(queryByText(emptyMessage)).toBeNull();
    });

    it('should display message if no data', () => {
        useEntriesStore.setState({entries: []});
        const component = (
            <LatestEntries
                itemsCount={2}
                onPress={jest.fn}
                onAddNew={jest.fn}
                onSeeMore={jest.fn}
            />
        );
        const {getByText} = render(component);
        getByText(emptyMessage);
    });
});
