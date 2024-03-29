import {
    getAverageDistance,
    getAverageDuration,
    getAverageIntensity,
    getAveragePace,
    getFarthestDistanceEntry,
    getFastestPaceEntry,
    getLongestDurationEntry,
    getTotalDistance,
    getTotalDuration
} from './statistics';
import {Entry} from '../types/Entry';

const entries: Entry[] = [
    {
        distance: 15,
        duration: 92,
        effort: 5
    },
    {
        distance: 0,
        duration: 180,
        effort: 3
    },
    {
        distance: 5,
        duration: 0,
        effort: 4
    }
] as Entry[];

describe('Statistics service', () => {
    describe('entries', () => {
        it('should get total distance', () => {
            expect(getTotalDistance(entries)).toEqual(20);
        });

        it('should get total duration', () => {
            expect(getTotalDuration(entries)).toEqual(272);
        });

        it('should get average distance', () => {
            expect(getAverageDistance(entries)).toEqual(10);
        });

        it('should get average duration', () => {
            expect(getAverageDuration(entries)).toEqual(136);
        });

        it('should get average pace', () => {
            expect(getAveragePace(entries)).toEqual('0\'06"');
        });

        it('should get average intensity', () => {
            expect(getAverageIntensity(entries)).toEqual(4);
        });

        it('should get farthest distance entry', () => {
            expect(getFarthestDistanceEntry(entries)).toEqual(entries[0]);
            expect(getFarthestDistanceEntry([entries[1]])).toEqual(undefined);
        });

        it('should get longest duration entry', () => {
            expect(getLongestDurationEntry(entries)).toEqual(entries[1]);
            expect(getLongestDurationEntry([entries[2]])).toEqual(undefined);
        });

        it('should get fastest pace entry', () => {
            expect(getFastestPaceEntry(entries)).toEqual(entries[0]);
        });
    });
});
