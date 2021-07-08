import {Entry} from '../types/Entry';
import {Activity} from '../types/Activity';
import StatisticsService from './StatisticsService';
import {ChartDataType, ChartTimeInterval, StatisticsOptions} from '../types/StatisticsOptions';

describe('StatisticsService', () => {

    const entries = [
        {
            id: '1',
            activity: Activity.RUNNING,
            distance: 16,
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
            date: '2020-12-15T00:10:02.207Z',
            energy: 0,
            note: '',
        },
        {
            id: '3',
            activity: Activity.RUNNING,
            distance: 10,
            duration: 10,
            date: '2020-12-02T00:10:02.207Z',
            energy: -2,
            note: '',
        },
        {
            id: '4',
            activity: Activity.SWIMMING,
            distance: 99,
            date: '2020-09-01T00:10:02.207Z',
            energy: -2,
            note: '',
        }
    ] as Entry[];

    beforeAll(() => {
        const realDate = Date;
        const spy = jest
            .spyOn(global, 'Date')
            .mockImplementation((...args): any => {
                if (args.length) {
                    // @ts-ignore
                    return new realDate(...args);
                }
                return new Date('2021-01-07T09:10:02.207Z');
            })
        Date.parse = realDate.parse;
        Date.UTC = realDate.UTC;
    });

    it('should get total distance', () => {
        expect(StatisticsService.getTotalDistance(entries)).toEqual(125);
    });

    it('should get total duration', () => {
        expect(StatisticsService.getTotalDuration(entries)).toEqual(282);
    });

    it('should get farthest distance', () => {
        expect(StatisticsService.getFarthestDistance(entries)).toEqual(99);
    });

    it('should get longest duration', () => {
        expect(StatisticsService.getLongestDuration(entries)).toEqual(180);
    });

    it('should get average distance', () => {
        expect(StatisticsService.getAverageDistance(entries)).toEqual(41.7);
    });

    it('should get average duration', () => {
        expect(StatisticsService.getAverageDuration(entries)).toEqual(94);
    });


    describe('distribution chart', () => {
        it('should get activities distance distribution', () => {
            let options: StatisticsOptions = {chartDataType: ChartDataType.DISTANCE, chartTimeInterval: ChartTimeInterval.MONTHS_6};
            expect(StatisticsService.getDistributionChartData(options, entries)).toEqual([
                {label: 'Running', value: 26},
                {label: 'Swimming', value: 99},
                {label: 'Cycling', value: 0}
            ]);

            Object.assign(options, {chartTimeInterval: ChartTimeInterval.MONTHS_3});
            expect(StatisticsService.getDistributionChartData(options, entries)).toEqual([
                {label: 'Running', value: 26},
                {label: 'Swimming', value: 0},
                {label: 'Cycling', value: 0}
            ]);
        });

        it('should get activities duration distribution', () => {
            let options: StatisticsOptions = {chartDataType: ChartDataType.DURATION, chartTimeInterval: ChartTimeInterval.MONTHS_6};
            expect(StatisticsService.getDistributionChartData(options, entries)).toEqual([
                {label: 'Running', value: 102},
                {label: 'Swimming', value: 0},
                {label: 'Cycling', value: 180}
            ]);

            Object.assign(options, {chartTimeInterval: ChartTimeInterval.DAYS_30});
            expect(StatisticsService.getDistributionChartData(options, entries)).toEqual([
                {label: 'Running', value: 92},
                {label: 'Swimming', value: 0},
                {label: 'Cycling', value: 180}
            ]);
        });
    });


    describe('timeline chart', () => {
        it('should get entries distance chart data', () => {
            const chartDataType = ChartDataType.DISTANCE;
            expect(StatisticsService.getTimelineChartData(
                {chartDataType, chartTimeInterval: ChartTimeInterval.DAYS_30},
                entries
            )).toEqual({
                labels: ['Jan 07'],
                values: [16]
            });
            expect(StatisticsService.getTimelineChartData(
                {chartDataType, chartTimeInterval: ChartTimeInterval.MONTHS_3},
                entries
            )).toEqual({
                labels: ['Dec 02', 'Jan 07'],
                values: [10, 16]
            });
            expect(StatisticsService.getTimelineChartData(
                {chartDataType, chartTimeInterval: ChartTimeInterval.MONTHS_6},
                entries
            )).toEqual({
                labels: ['Sep 2020', '', 'Jan 2021'],
                values: [99, 10, 16]
            });
        });

        it('should get entries duration chart data', () => {
            const chartDataType = ChartDataType.DURATION;
            expect(StatisticsService.getTimelineChartData(
                {chartDataType, chartTimeInterval: ChartTimeInterval.MONTHS_6},
                entries
            )).toEqual({
                labels: ['Dec 2020', '', 'Jan 2021'],
                values: [10, 180, 92]
            });
        });
    });

});
