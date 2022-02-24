import {Activity} from '../enums/Activity';
import {Trophy} from '../types/Trophy';
import {
    filterByTrophyType,
    getTrophySubtype,
    sortTrophyList,
    trophiesCompletedAtComparator
} from './trophy';
import {TrophyType} from '../enums/TrophyType';
import {TrophySubtype} from '../enums/TrophySubtype';

describe('Trophy service', () => {
    const trophies: Trophy[] = [
        {
            id: '8',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 0,
            duration: 1000
        },
        {
            id: '7',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 0,
            duration: 1800
        },
        {
            id: '6',
            activity: Activity.CYCLING,
            type: TrophyType.INDIVIDUAL,
            distance: 35,
            duration: 3600
        },
        {
            id: '5',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 5,
            duration: 1800
        },
        {
            id: '4',
            activity: Activity.SWIMMING,
            type: TrophyType.TOTAL,
            distance: 0,
            duration: 7200
        },
        {
            id: '3',
            activity: Activity.CYCLING,
            type: TrophyType.INDIVIDUAL,
            distance: 0,
            duration: 3600
        },
        {
            id: '2',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 21,
            duration: 0
        },
        {
            id: '1',
            activity: Activity.RUNNING,
            type: TrophyType.TOTAL,
            distance: 0,
            duration: 1000
        }
    ] as Trophy[];

    it('should determine trophy subtype', () => {
        expect(
            getTrophySubtype({distance: 1000, duration: 0} as Trophy)
        ).toEqual(TrophySubtype.DISTANCE);
        expect(
            getTrophySubtype({distance: 0, duration: 1000} as Trophy)
        ).toEqual(TrophySubtype.DURATION);
        expect(
            getTrophySubtype({distance: 1000, duration: 1000} as Trophy)
        ).toEqual(TrophySubtype.PACE);
    });

    it('should filter trophies by type and subtype', () => {
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.TOTAL,
                TrophySubtype.DISTANCE
            )
        ).toEqual([]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.TOTAL,
                TrophySubtype.DURATION
            )
        ).toEqual([
            {
                id: '4',
                activity: Activity.SWIMMING,
                type: TrophyType.TOTAL,
                distance: 0,
                duration: 7200
            },
            {
                id: '1',
                activity: Activity.RUNNING,
                type: TrophyType.TOTAL,
                distance: 0,
                duration: 1000
            }
        ]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.DURATION
            )
        ).toEqual([
            {
                id: '8',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 1000
            },
            {
                id: '7',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 1800
            },
            {
                id: '3',
                activity: Activity.CYCLING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 3600
            }
        ]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.DISTANCE
            )
        ).toEqual([
            {
                id: '2',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 21,
                duration: 0
            }
        ]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.PACE
            )
        ).toEqual([
            {
                id: '6',
                activity: Activity.CYCLING,
                type: TrophyType.INDIVIDUAL,
                distance: 35,
                duration: 3600
            },
            {
                id: '5',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 5,
                duration: 1800
            }
        ]);
    });

    it('should sort trophy list by type and subtype difficulty', () => {
        const res = sortTrophyList(trophies);
        expect(res).toEqual([
            {
                id: '1',
                activity: Activity.RUNNING,
                type: TrophyType.TOTAL,
                distance: 0,
                duration: 1000
            },
            {
                id: '2',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 21,
                duration: 0
            },
            {
                id: '7',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 1800
            },
            {
                id: '8',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 1000
            },
            {
                id: '5',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                distance: 5,
                duration: 1800
            },
            {
                id: '4',
                activity: Activity.SWIMMING,
                type: TrophyType.TOTAL,
                distance: 0,
                duration: 7200
            },
            {
                id: '3',
                activity: Activity.CYCLING,
                type: TrophyType.INDIVIDUAL,
                distance: 0,
                duration: 3600
            },
            {
                id: '6',
                activity: Activity.CYCLING,
                type: TrophyType.INDIVIDUAL,
                distance: 35,
                duration: 3600
            }
        ]);
    });

    it('should sort trophies using completed at comparator', () => {
        const input = [
            {id: '2'},
            {id: '3', completedAt: '2021-01-01T12:11:10.000Z'},
            {id: '1', completedAt: '2021-12-01T12:11:10.000Z'}
        ] as Trophy[];
        expect(input.sort(trophiesCompletedAtComparator)).toEqual([
            {id: '1', completedAt: '2021-12-01T12:11:10.000Z'},
            {id: '3', completedAt: '2021-01-01T12:11:10.000Z'},
            {id: '2'}
        ]);
    });
});
