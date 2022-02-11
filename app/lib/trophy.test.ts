import {Activity} from '../enums/Activity';
import {Trophy, TrophySubtype, TrophyType} from '../types/Trophy';
import {filterByTrophyType, getTrophySubtype} from './trophy';

describe('Trophy service', () => {
    const trophies: Trophy[] = [
        {
            id: '1',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 21,
            duration: 0
        },
        {
            id: '2',
            activity: Activity.CYCLING,
            type: TrophyType.INDIVIDUAL,
            distance: 35,
            duration: 3600
        },
        {
            id: '3',
            activity: Activity.SWIMMING,
            type: TrophyType.TOTAL,
            distance: 0,
            duration: 7200
        },
        {
            id: '4',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            distance: 5,
            duration: 1800
        }
    ] as Trophy[];

    it('should determine trophy subtype', () => {
        expect(getTrophySubtype(trophies[0])).toEqual(TrophySubtype.DISTANCE);
        expect(getTrophySubtype(trophies[1])).toEqual(TrophySubtype.PACE);
        expect(getTrophySubtype(trophies[2])).toEqual(TrophySubtype.DURATION);
        expect(getTrophySubtype(trophies[3])).toEqual(TrophySubtype.PACE);
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
        ).toEqual([trophies[2]]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.DURATION
            )
        ).toEqual([]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.DISTANCE
            )
        ).toEqual([trophies[0]]);
        expect(
            filterByTrophyType(
                trophies,
                TrophyType.INDIVIDUAL,
                TrophySubtype.PACE
            )
        ).toEqual([trophies[1], trophies[3]]);
    });
});
