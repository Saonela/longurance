import moment from 'moment';
import {Activity} from '../enums/Activity';
import {TimeInterval} from '../enums/TimeInterval';
import {TimelineEntry} from '../types/TimelineEntry';
import {getEntryTrophies, useTrophiesStore} from './trophies';
import {
    getAverageIntensity,
    getTotalDistance,
    getTotalDuration
} from '../lib/statistics';
import {EntriesState} from './entries';
import {TrophyType} from '../enums/TrophyType';

const keyFunc = (date: string, timeInterval) => {
    if (timeInterval === TimeInterval.YEAR) {
        return new Date(date).getFullYear().toString();
    }
    return moment(date).format('MMMM, YYYY');
};

export const getTimelineEntries =
    (activity: Activity | null, timeInterval: TimeInterval) =>
    (state: EntriesState): TimelineEntry[] => {
        const entriesMap = new Map();
        state.entries
            .filter((entry) => activity === null || entry.activity === activity)
            .forEach((entry) => {
                const key = keyFunc(entry.date, timeInterval);
                if (!entriesMap.has(key)) entriesMap.set(key, []);
                entriesMap.get(key).push(entry);
            });

        const trophiesState = useTrophiesStore.getState();
        return Array.from(entriesMap).map(([key, entries]) => {
            return {
                title: key,
                distance: getTotalDistance(entries),
                duration: getTotalDuration(entries),
                effort: getAverageIntensity(entries),
                entryIds: entries.map((entry) => entry.id),
                trophiesCount: entries.reduce((total, {id}) => {
                    const individualTrophies = getEntryTrophies(
                        id,
                        TrophyType.INDIVIDUAL
                    )(trophiesState);
                    const totalTrophies = getEntryTrophies(
                        id,
                        TrophyType.TOTAL
                    )(trophiesState).filter(
                        (trophy) =>
                            trophy.entryIds[trophy.entryIds.length - 1] === id
                    );
                    return (
                        total + individualTrophies.length + totalTrophies.length
                    );
                }, 0)
            };
        });
    };
