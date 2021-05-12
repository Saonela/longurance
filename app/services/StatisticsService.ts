import {Entry} from '../types/Entry';

class StatisticsService {

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

}

export default StatisticsService;
