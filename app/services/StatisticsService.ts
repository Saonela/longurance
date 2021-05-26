import {Entry} from '../types/Entry';
import {ChartDataType, ChartTimeInterval, StatisticsOptions} from '../types/StatisticsOptions';
import {ChartData} from '../types/ChartData';
import { format } from 'date-fns';

class StatisticsService {

    private static TimeIntervalMonths: Record<ChartTimeInterval, number> = {
        [ChartTimeInterval.DAYS_30]: 1,
        [ChartTimeInterval.MONTHS_3]: 3,
        [ChartTimeInterval.MONTHS_6]: 6
    }

    static getTotalDistance(entries: Entry[]) {
        return entries.reduce((accumulator: number, {distance}: Entry) => {
            if (distance) {
                return accumulator + (distance);
            }
            return accumulator;
        }, 0);
    }

    static getTotalDuration(entries: Entry[]) {
        return entries.reduce((accumulator: number, {duration}: Entry) => {
            if (duration) {
                return accumulator + (duration);
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
        entries = entries.filter(entry => entry.distance);
        const average = this.getTotalDistance(entries) / entries.length;
        return parseFloat(average.toFixed(1));
    }

    static getAverageDuration(entries: Entry[]) {
        entries = entries.filter(entry => entry.duration);
        const average = this.getTotalDuration(entries) / entries.length;
        return parseFloat(average.toFixed(0));
    }

    static getEntriesChartData({chartDataType, chartTimeInterval}: StatisticsOptions, entries: Entry[]): ChartData {
        const date = new Date();
        date.setMonth(date.getMonth() - this.TimeIntervalMonths[chartTimeInterval]);
        const limitTime = date.getTime();

        entries = entries
            .filter(entry => Date.parse(entry.date) > limitTime)
            .filter(({distance}) => chartDataType !== ChartDataType.DISTANCE || chartDataType === ChartDataType.DISTANCE && distance)
            .filter(({duration}) => chartDataType !== ChartDataType.DURATION || chartDataType === ChartDataType.DURATION && duration)
            .reverse();

        return {
            labels: this.getEntriesChartDataLabels(chartTimeInterval, entries),
            values: this.getEntriesChartDataValues(chartDataType, entries)
        };
    }

    private static getEntriesChartDataValues(chartDataType: ChartDataType, entries: Entry[]): number[] {
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
            .filter(x => x)
    }

    private static getEntriesChartDataLabels(chartTimeInterval: ChartTimeInterval, entries: Entry[]): string[] {
        return entries
            .map(entry => new Date(entry.date))
            .map((date) => {
                if (chartTimeInterval === ChartTimeInterval.DAYS_30 ||
                    chartTimeInterval === ChartTimeInterval.MONTHS_3) {
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
