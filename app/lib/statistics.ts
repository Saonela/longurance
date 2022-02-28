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

export function getAverageDistance(entries: Entry[]) {
    const filteredEntries = entries.filter((entry) => entry.distance);
    const average = getTotalDistance(filteredEntries) / filteredEntries.length;
    return parseFloat(average.toFixed(1));
}

export function getAverageDuration(entries: Entry[]) {
    const filteredEntries = entries.filter((entry) => entry.duration);
    const average = getTotalDuration(filteredEntries) / filteredEntries.length;
    return parseFloat(average.toFixed(0));
}

export const getAveragePace = (entries: Entry[]) => {
    const filteredEntries = entries.filter(
        (entry) => entry.distance && entry.duration
    );
    const distance = getTotalDistance(filteredEntries);
    const duration = getTotalDuration(filteredEntries);
    return getPaceText(duration, distance);
};

export const getAverageIntensity = (entries: Entry[]) =>
    Math.round(
        entries
            .map((entry) => entry.effort)
            .reduce((total, value) => total + value, 0) / entries.length
    );

export const getFarthestDistanceEntry = (
    entries: Entry[]
): Entry | undefined => {
    let distance = 0;
    let result;
    entries.forEach((entry: Entry) => {
        if (entry.distance > distance) {
            distance = entry.distance;
            result = entry;
        }
    });
    return result;
};

export const getLongestDurationEntry = (
    entries: Entry[]
): Entry | undefined => {
    let duration = 0;
    let result;
    entries.forEach((entry: Entry) => {
        if (entry.duration > duration) {
            duration = entry.duration;
            result = entry;
        }
    });
    return result;
};

export function getFastestPaceEntry(entries: Entry[]): Entry | undefined {
    let fastestPace = 0;
    let result;
    entries.forEach((entry) => {
        const pace = calculatePace(entry.duration, entry.distance);
        if (pace > fastestPace) {
            fastestPace = pace;
            result = entry;
        }
    });
    return result;
}
