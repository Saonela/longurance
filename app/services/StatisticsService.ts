import {Entry} from '../types/Entry';

class StatisticsService {

    static getTotalDistance(entries: Entry[]) {
        return entries.reduce((accumulator: number, value: Entry) => {
            if (value.distance) {
                return accumulator + (value.distance);
            }
            return accumulator;
        }, 0);
    }

    static getTotalDuration(entries: Entry[]) {
        return entries.reduce((accumulator: number, value: Entry) => {
            if (value.duration) {
                return accumulator + (value.duration);
            }
            return accumulator;
        }, 0);
    }
}

export default StatisticsService;
