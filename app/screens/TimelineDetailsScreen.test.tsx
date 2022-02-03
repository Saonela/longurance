import {render, within} from '@testing-library/react-native';
import React from 'react';
import TimelineDetailsScreen from './TimelineDetailsScreen';
import {TimelineEntry} from '../types/TimelineEntry';
import {TimeInterval} from '../types/TimeInterval';

describe('TimelineDetailsScreen', () => {
    let currentEntry: TimelineEntry;
    let previousEntry: TimelineEntry;

    beforeEach(() => {
        currentEntry = {
            title: 'January, 2022',
            distance: 25,
            duration: 36000,
            effort: 3,
            entryIds: ['5', '4', '3', '2', '1'],
            trophiesCount: 2
        };
        previousEntry = {
            title: 'December, 2021',
            distance: 20,
            duration: 30000,
            effort: 4,
            entryIds: ['8', '7', '6'],
            trophiesCount: 0
        };
    });

    it('should display current entry details', () => {
        const params = {currentEntry};
        const component = <TimelineDetailsScreen route={{params}} />;
        const {getByText, queryByTestId} = render(component);
        getByText(/25km/);
        getByText(/10h 00min/);
        getByText(/24'00"/);
        getByText(/3\/5/);
        expect(queryByTestId('chart-legend')).toBeNull();
    });

    it('should set monthly chart legend labels', () => {
        const params = {
            currentEntry,
            previousEntry,
            timeInterval: TimeInterval.MONTH
        };
        const component = <TimelineDetailsScreen route={{params}} />;
        const {getByTestId} = render(component);
        const legend = getByTestId('chart-legend');
        within(legend).getByText('Current month');
        within(legend).getByText('Previous month');
    });

    it('should set yearly chart legend labels', () => {
        const params = {
            currentEntry,
            previousEntry,
            timeInterval: TimeInterval.YEAR
        };
        const component = <TimelineDetailsScreen route={{params}} />;
        const {getByTestId} = render(component);
        const legend = getByTestId('chart-legend');
        within(legend).getByText('Current year');
        within(legend).getByText('Previous year');
    });
});
