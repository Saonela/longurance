import React from 'react';
import {render} from '@testing-library/react-native';
import {Activity} from '../enums/Activity';
import {Entry} from '../types/Entry';
import {useEntriesStore} from '../state/entries';
import TimelineScreen from './TimelineScreen';
import {useActivityFilterStore} from '../state/activity-filter';
import {useTimelineSettingsStore} from '../state/timeline-settings';
import {TimeInterval} from '../enums/TimeInterval';

const entries: Entry[] = [
    {
        id: '4',
        activity: Activity.SWIMMING,
        distance: 2.5,
        duration: 3000,
        date: '2022-01-01T09:10:02.207Z',
        effort: 4
    },
    {
        id: '3',
        activity: Activity.CYCLING,
        distance: 50,
        duration: 7200,
        date: '2021-09-01T09:10:02.207Z',
        effort: 5
    },
    {
        id: '2',
        activity: Activity.SWIMMING,
        distance: 2,
        duration: 3600,
        date: '2021-04-10T09:10:02.207Z',
        effort: 1
    },
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 10,
        duration: 3600,
        date: '2021-04-07T09:10:02.207Z',
        effort: 3
    }
] as Entry[];

const navigation = {};

describe('TimelineScreen', () => {
    it('should display monthly timeline entries', () => {
        useTimelineSettingsStore.setState({timeInterval: TimeInterval.MONTH});
        useEntriesStore.setState({entries});
        const component = <TimelineScreen navigation={navigation} />;
        const {getByText} = render(component);
        getByText('January, 2022');
        getByText('September, 2021');
        getByText('April, 2021');
    });

    it('should display yearly timeline entries', () => {
        useTimelineSettingsStore.setState({timeInterval: TimeInterval.YEAR});
        useEntriesStore.setState({entries});
        const component = <TimelineScreen navigation={navigation} />;
        const {getByText} = render(component);
        getByText('2022');
        getByText('2021');
    });

    it('should filter timeline entries by activity', () => {
        useActivityFilterStore.setState({filter: Activity.CYCLING});
        useEntriesStore.setState({entries});
        const component = <TimelineScreen navigation={navigation} />;
        const {queryByText, getByText} = render(component);
        getByText('September, 2021');
        expect(queryByText('January, 2022')).toBeNull();
        expect(queryByText('April, 2021')).toBeNull();
    });

    it('should show message if no activity', () => {
        useEntriesStore.setState({entries: []});
        const component = <TimelineScreen navigation={navigation} />;
        const {getByText} = render(component);
        getByText('There is no activity yet!');
    });
});
