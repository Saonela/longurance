export enum ChartTimeInterval {
    DAYS_30 = '30D',
    MONTHS_3 = '3M',
    MONTHS_6 = '6M'
}

export enum ChartDataType {
    DISTANCE = 'DISTANCE',
    DURATION = 'DURATION'
}

export interface StatisticsOptions {
    chartTimeInterval: ChartTimeInterval;
    chartDataType: ChartDataType;
}
