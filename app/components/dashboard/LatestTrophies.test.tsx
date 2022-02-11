import {render} from '@testing-library/react-native';
import React from 'react';
import {useTrophiesStore} from '../../state/trophies';
import {Trophy} from '../../types/Trophy';
import {Activity} from '../../enums/Activity';
import LatestTrophies from './LatestTrophies';

const trophies: Trophy[] = [
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 21,
        completedAt: '2021-01-07T09:10:02.207Z',
        completed: true,
        markedAsRead: false,
        title: 'My first half marathon !'
    },
    {
        id: '2',
        activity: Activity.CYCLING,
        distance: 100,
        duration: 180,
        completedAt: null,
        completed: false,
        markedAsRead: false,
        title: 'Sweet 100.'
    }
] as Trophy[];

const emptyMessage = 'There are no achieved trophies yet!';

describe('LatestTrophies', () => {
    it('should display trophies', () => {
        useTrophiesStore.setState({trophies});
        const component = (
            <LatestTrophies
                itemsCount={2}
                onPress={jest.fn}
                onAddNew={jest.fn}
                onSeeMore={jest.fn}
            />
        );
        const {getByText, queryByText} = render(component);
        getByText('My first half marathon !');
        expect(queryByText('Sweet 100.')).toBeNull();
        expect(queryByText(emptyMessage)).toBeNull();
    });

    it('should display message if no data', () => {
        useTrophiesStore.setState({trophies: []});
        const component = (
            <LatestTrophies
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
