import {Entry} from '../types/Entry';
import {calculatePace, getPaceText} from './entry';

export const getTotalDistance = (entries: Entry[]) =>
    entries
        .map((entry) => entry.distance)
        .filter((value) => value)
        .reduce((total, value) => total + value, 0);

export const getTotalDuration = (entries: Entry[]) =>
    entries
        .map((entry) => entry.duration)
        .filter((value) => value)
        .reduce((total, value) => total + value, 0);

export const getAverageIntensity = (entries: Entry[]) =>
    Math.round(
        entries
            .map((entry) => entry.effort)
            .reduce((total, value) => total + value, 0) / entries.length
    );

export const getFarthestDistanceEntry = (entries: Entry[]) =>
    entries.reduce((result: Entry, entry: Entry) => {
        return entry.distance > result.distance ? entry : result;
    }, entries[0]);

export const getLongestDurationEntry = (entries: Entry[]) =>
    entries.reduce((result: Entry, entry: Entry) => {
        return entry.duration > result.duration ? entry : result;
    }, entries[0]);

export function getFastestPaceEntry(entries: Entry[]) {
    let fastestPace = 0;
    let fastestPaceEntry;
    entries.forEach((entry) => {
        const pace = calculatePace(entry.duration, entry.distance);
        if (pace > fastestPace) {
            fastestPace = pace;
            fastestPaceEntry = entry;
        }
    });
    return fastestPaceEntry;
}
