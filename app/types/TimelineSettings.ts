import {TimeInterval} from '../enums/TimeInterval';

export interface TimelineSettings {
    timeInterval: TimeInterval.MONTH | TimeInterval.YEAR;
}
