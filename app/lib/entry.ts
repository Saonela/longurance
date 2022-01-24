import {Activity} from '../types/Activity';
import {splitSecondsIntoChunks} from './utility';

export function calculatePace(duration: number, distance: number) {
    if (duration && distance) {
        return Math.round(duration / distance);
    }
    return 0;
}

export function getPaceText(duration: number, distance: number) {
    const pace = calculatePace(duration, distance);
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

export function getActivityTypeText(type: Activity) {
    if (type === Activity.CYCLING) return 'CYCLE';
    if (type === Activity.SWIMMING) return 'SWIM';
    if (type === Activity.RUNNING) return 'RUN';
}
