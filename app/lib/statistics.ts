import {Entry} from '../types/Entry';

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
