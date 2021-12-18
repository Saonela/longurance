import {Entry} from '../types/Entry';
import {
    ChartDataType,
    ChartTimeInterval,
    StatisticsOptions
} from '../types/StatisticsOptions';
import {TimelineChartData} from '../types/TimelineChartData';
import {format} from 'date-fns';
import {DistributionChartData} from '../types/DistributionChartData';
import {ActivityOptions} from '../types/Activity';

class StatisticsService {
    private static TimeIntervalMonths: Record<ChartTimeInterval, number> = {
        [ChartTimeInterval.DAYS_30]: 1,
        [ChartTimeInterval.MONTHS_3]: 3,
        [ChartTimeInterval.MONTHS_6]: 6
    };

    static getTotalDistance(entries: Entry[]) {
        return entries.reduce((accumulator: number, {distance}: Entry) => {
            if (distance) {
                return accumulator + distance;
            }
            return accumulator;
        }, 0);
    }

    static getTotalDuration(entries: Entry[]) {
        return entries.reduce((accumulator: number, {duration}: Entry) => {
            if (duration) {
                return accumulator + duration;
            }
            return accumulator;
        }, 0);
    }

    static getFarthestDistance(entries: Entry[]) {
        return entries.reduce((accumulator: number, {distance}: Entry) => {
            if (distance > accumulator) {
                return distance;
            }
            return accumulator;
        }, 0);
    }

    static getLongestDuration(entries: Entry[]) {
        return entries.reduce((accumulator: number, {duration}: Entry) => {
            if (duration > accumulator) {
                return duration;
            }
            return accumulator;
        }, 0);
    }

    static getAverageDistance(entries: Entry[]) {
        entries = entries.filter((entry) => entry.distance);
        const average = this.getTotalDistance(entries) / entries.length;
        return parseFloat(average.toFixed(1));
    }

    static getAverageDuration(entries: Entry[]) {
        entries = entries.filter((entry) => entry.duration);
        const average = this.getTotalDuration(entries) / entries.length;
        return parseFloat(average.toFixed(0));
    }

    static getDistributionChartData(
        statisticsOptions: StatisticsOptions,
        entries: Entry[]
    ): DistributionChartData {
        entries = this.filterEntriesByOptions(statisticsOptions, entries);
        return ActivityOptions.map(({label, value}) => {
            const activityEntries = entries.filter(
                (entry) => entry.activity === value
            );
            let total = 0;

            if (statisticsOptions.chartDataType === ChartDataType.DISTANCE) {
                total = this.getTotalDistance(activityEntries);
            }
            if (statisticsOptions.chartDataType === ChartDataType.DURATION) {
                total = this.getTotalDuration(activityEntries);
            }
            return {label, value: total};
        });
    }

    static getTimelineChartData(
        statisticsOptions: StatisticsOptions,
        entries: Entry[]
    ): TimelineChartData {
        entries = this.filterEntriesByOptions(statisticsOptions, entries);
        return {
            labels: this.getTimelineChartLabels(
                statisticsOptions.chartTimeInterval,
                entries
            ),
            values: this.getTimelineChartValues(
                statisticsOptions.chartDataType,
                entries
            )
        };
    }

    private static filterEntriesByOptions(
        {chartDataType, chartTimeInterval}: StatisticsOptions,
        entries: Entry[]
    ) {
        const date = new Date();
        date.setMonth(
            date.getMonth() - this.TimeIntervalMonths[chartTimeInterval]
        );
        const limitTime = date.getTime();

        return entries
            .filter((entry) => Date.parse(entry.date) > limitTime)
            .filter(
                ({distance}) =>
                    chartDataType !== ChartDataType.DISTANCE ||
                    (chartDataType === ChartDataType.DISTANCE && distance)
            )
            .filter(
                ({duration}) =>
                    chartDataType !== ChartDataType.DURATION ||
                    (chartDataType === ChartDataType.DURATION && duration)
            )
            .reverse();
    }

    private static getTimelineChartValues(
        chartDataType: ChartDataType,
        entries: Entry[]
    ): number[] {
        return entries
            .map((entry) => {
                if (chartDataType === ChartDataType.DISTANCE) {
                    return entry.distance;
                }
                if (chartDataType === ChartDataType.DURATION) {
                    return entry.duration;
                }
                return 0;
            })
            .filter((x) => x);
    }

    private static getTimelineChartLabels(
        chartTimeInterval: ChartTimeInterval,
        entries: Entry[]
    ): string[] {
        return entries
            .map((entry) => new Date(entry.date))
            .map((date) => {
                if (
                    chartTimeInterval === ChartTimeInterval.DAYS_30 ||
                    chartTimeInterval === ChartTimeInterval.MONTHS_3
                ) {
                    return format(date, 'MMM dd');
                }
                if (chartTimeInterval === ChartTimeInterval.MONTHS_6) {
                    return format(date, 'MMM yyyy');
                }
                return format(date, 'yyyy MMM dd');
            })
            .map((label, index, arr) => {
                if (index === 0 || index === arr.length - 1) {
                    return label;
                }
                return '';
            });
    }
}

export default StatisticsService;
