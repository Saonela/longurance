import {Activity} from '../enums/Activity';
import {splitSecondsIntoChunks} from './utility';
import {Entry} from '../types/Entry';

export function calculatePace(duration: number, distance: number) {
    if (duration && distance) {
        return Math.round(duration / distance);
    }
    return 0;
}

export function getPaceText(duration: number, distance: number) {
    const pace = calculatePace(duration, distance);
    return getCalculatedPaceText(pace);
}

export function getCalculatedPaceText(pace: number) {
    const minutes = Math.round(pace / 60) % 60;
    const seconds = pace % 60;
    return `${minutes}'${seconds < 10 ? `0${seconds}` : seconds}"`;
}

export function getDurationText(duration: number) {
    const {hours, minutes} = splitSecondsIntoChunks(duration);
    const hh = hours < 10 ? `${hours}` : `${hours}`;
    const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hh}h ${mm}min`;
}

export function getDistanceText(distance: number) {
    return `${distance || 0}km`;
}

export function getIntensityText(intensity: number) {
    return `${intensity || 0}/5`;
}

export function getWorkoutsLabel(count: number) {
    return count === 1 ? 'Workout' : 'Workouts';
}

export function getTrophiesLabel(count: number) {
    return count === 1 ? 'Trophy' : 'Trophies';
}

export function getActivityTypeText(type: Activity) {
    if (type === Activity.CYCLING) return 'CYCLE';
    if (type === Activity.SWIMMING) return 'SWIM';
    if (type === Activity.RUNNING) return 'RUN';
}

export function getEntriesFieldValues(entries: Entry[]) {
    return entries.reduce(
        (values, {distance, duration, effort}) => {
            values.distance.push(distance);
            values.duration.push(duration);
            values.intensity.push(effort);
            values.pace.push(calculatePace(duration, distance));
            return values;
        },
        {
            distance: [],
            duration: [],
            intensity: [],
            pace: []
        } as {
            distance: number[];
            duration: number[];
            intensity: number[];
            pace: number[];
        }
    );
}

export const sortEntryList = (entries: Entry[]) =>
    [...entries].sort(
        (entry1, entry2) =>
            new Date(entry2.date).getTime() - new Date(entry1.date).getTime()
    );
