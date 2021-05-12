import {Entry} from '../types/Entry';
import {Activity} from '../types/Activity';
import StatisticsService from './StatisticsService';

describe('StatisticsService', () => {

    const entries = [
        {
            id: '1',
            activity: Activity.RUNNING,
            distance: 15,
            duration: 92,
            date: '2021-01-07T09:10:02.207Z',
            energy: 2,
            title: 'MY RUN',
            note: 'Was really enjoying. Got into flow state.',
        },
        {
            id: '2',
            activity: Activity.CYCLING,
            duration: 180,
            date: '2021-01-01T00:10:02.207Z',
            energy: 0,
            note: '',
        },
        {
            id: '3',
            activity: Activity.SWIMMING,
            distance: 99,
            date: '2021-01-01T00:10:02.207Z',
            energy: -2,
            note: '',
        }
    ] as Entry[];

    it('should get total distance', () => {
        expect(StatisticsService.getTotalDistance(entries)).toEqual(114);
    });

    it('should get total duration', () => {
        expect(StatisticsService.getTotalDuration(entries)).toEqual(272);
    });

    it('should get farthest distance', () => {
        expect(StatisticsService.getFarthestDistance(entries)).toEqual(99);
    });

    it('should get longest duration', () => {
        expect(StatisticsService.getLongestDuration(entries)).toEqual(180);
    });

});
