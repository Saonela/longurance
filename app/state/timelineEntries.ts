import moment from 'moment';
import {Activity} from '../types/Activity';
import {TimeInterval} from '../types/TimeInterval';
import {TimelineEntry} from '../types/TimelineEntry';
import {getEntryTrophies, useTrophiesStore} from './trophies';
import {
    getAverageIntensity,
    getTotalDistance,
    getTotalDuration
} from '../lib/statistics';
import {TrophyType} from '../types/Trophy';
import {EntriesState} from './entries';

export const getTimelineEntries =
    (activity: Activity | null, timeInterval: TimeInterval) =>
    (state: EntriesState): TimelineEntry[] => {
        const keyFunc = (date: string) => {
            if (timeInterval === TimeInterval.YEAR) {
                return new Date(date).getFullYear().toString();
            }
            return moment(date).format('MMMM, YYYY');
        };

        const entriesMap = new Map();
        state.entries
            .filter((entry) => activity === null || entry.activity === activity)
            .forEach((entry) => {
                const key = keyFunc(entry.date);
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
                workoutsCount: entries.length,
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
