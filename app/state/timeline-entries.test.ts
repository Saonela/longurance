import {Activity} from '../enums/Activity';
import {Entry} from '../types/Entry';
import {useTrophiesStore} from './trophies';
import {Trophy, TrophyType} from '../types/Trophy';
import {TimeInterval} from '../types/TimeInterval';
import {EntriesState} from './entries';
import {getTimelineEntries} from './timeline-entries';

describe('Timeline entries state', () => {
    let state: EntriesState;

    beforeEach(() => {
        state = {
            entries: [
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
            ] as Entry[]
        };
        useTrophiesStore.setState({
            trophies: [
                {
                    id: '100',
                    completed: true,
                    duration: 5500,
                    entryIds: ['2', '4'],
                    type: TrophyType.TOTAL
                },
                {
                    id: '100',
                    completed: true,
                    distance: 40,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: ['3']
                }
            ] as unknown as Trophy[]
        });
    });

    it('should get entries timeline by month', () => {
        expect(getTimelineEntries(null, TimeInterval.MONTH)(state)).toEqual([
            {
                title: 'January, 2022',
                distance: 2.5,
                duration: 3000,
                effort: 4,
                entryIds: ['4'],
                trophiesCount: 1
            },
            {
                title: 'September, 2021',
                distance: 50,
                duration: 7200,
                effort: 5,
                entryIds: ['3'],
                trophiesCount: 1
            },
            {
                title: 'April, 2021',
                distance: 12,
                duration: 7200,
                effort: 2,
                entryIds: ['2', '1'],
                trophiesCount: 0
            }
        ]);
    });

    it('should get entries timeline by year', () => {
        expect(getTimelineEntries(null, TimeInterval.YEAR)(state)).toEqual([
            {
                title: '2022',
                distance: 2.5,
                duration: 3000,
                effort: 4,
                entryIds: ['4'],
                trophiesCount: 1
            },
            {
                title: '2021',
                distance: 62,
                duration: 14400,
                effort: 3,
                entryIds: ['3', '2', '1'],
                trophiesCount: 1
            }
        ]);
    });
});
