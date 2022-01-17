import create from 'zustand';
import {Trophy, TrophySubtype, TrophyType} from '../types/Trophy';
import * as api from '../lib/api';
// eslint-disable-next-line import/extensions
import trophiesJson from '../../assets/data/trophies.json';
import {Activity} from '../types/Activity';
import {generateId} from '../lib/utility';
import {useEntriesStore} from './entries';
import {getTrophySubtype} from '../lib/trophy';
import {Entry} from '../types/Entry';

const predefinedTrophies = trophiesJson as Trophy[];

interface TrophiesState {
    trophies: Trophy[];
}

export const useTrophiesStore = create<TrophiesState>(() => ({
    trophies: []
}));

export function addTrophy(trophy: Trophy) {
    Object.assign(trophy, {id: generateId()});
    api.saveTrophy(trophy);
    useTrophiesStore.setState((state) => ({
        trophies: [trophy, ...state.trophies]
    }));
}

export function updateTrophy(trophy: Trophy) {
    api.saveTrophy(trophy);
    useTrophiesStore.setState((state) => ({
        trophies: state.trophies.map((stateTrophy) => {
            if (stateTrophy.id === trophy.id) {
                return {...stateTrophy, ...trophy};
            }
            return stateTrophy;
        })
    }));
}

export function deleteTrophy(id: string) {
    api.deleteTrophy(id);
    useTrophiesStore.setState((state) => ({
        trophies: state.trophies.filter((trophy) => trophy.id !== id)
    }));
}

export async function loadTrophies() {
    const trophies = await api.fetchTrophies();
    useTrophiesStore.setState(() => ({
        trophies: [...predefinedTrophies, ...trophies]
    }));
}

function isIndividualTrophyCompleted(
    trophy: Trophy,
    entries: Entry[]
): Entry | undefined {
    const subtype = getTrophySubtype(trophy);
    return entries
        .filter((entry) => entry.activity === trophy.activity)
        .find((entry) => {
            const isDistanceCompleted =
                subtype === TrophySubtype.DISTANCE &&
                entry.distance >= trophy.distance;

            const isDurationCompleted =
                subtype === TrophySubtype.DURATION &&
                entry.duration >= trophy.duration;

            const isPaceCompleted =
                subtype === TrophySubtype.PACE &&
                entry.duration !== 0 &&
                entry.distance >= trophy.distance &&
                entry.duration <= trophy.duration;

            return (
                isDistanceCompleted || isDurationCompleted || isPaceCompleted
            );
        });
}

function isTotalTrophyCompleted(trophy: Trophy, entries: Entry[]): Entry[] {
    const subtype = getTrophySubtype(trophy);
    const trophyEntries: Entry[] = [];

    let totalDistance = 0;
    let totalDuration = 0;

    const isCompleted = entries
        .filter((entry) => entry.activity === trophy.activity)
        .some((entry) => {
            trophyEntries.push(entry);
            totalDistance += entry.distance;
            totalDuration += entry.duration;

            const isDistanceCompleted =
                subtype === TrophySubtype.DISTANCE &&
                totalDistance >= trophy.distance;

            const isDurationCompleted =
                subtype === TrophySubtype.DURATION &&
                totalDuration >= trophy.duration;

            return isDistanceCompleted || isDurationCompleted;
        });

    return isCompleted ? trophyEntries : [];
}

export function updateCompletedTrophies() {
    const {entries} = useEntriesStore.getState();
    const {trophies} = useTrophiesStore.getState();

    trophies
        .filter((trophy) => trophy.type === TrophyType.TOTAL)
        .forEach((trophy) => {
            const trophyEntries = isTotalTrophyCompleted(trophy, entries);
            updateTrophy({
                ...trophy,
                completed: trophyEntries.length !== 0,
                completedAt:
                    trophyEntries[trophyEntries.length - 1]?.date || null,
                markedAsRead: trophyEntries.length
                    ? trophy.markedAsRead
                    : false,
                entryIds: trophyEntries.map((entry) => entry.id)
            });
        });

    trophies
        .filter((trophy) => trophy.type === TrophyType.INDIVIDUAL)
        .forEach((trophy) => {
            const entry = isIndividualTrophyCompleted(trophy, entries);
            updateTrophy({
                ...trophy,
                completed: !!entry,
                completedAt: entry ? entry.date : null,
                markedAsRead: entry ? trophy.markedAsRead : false,
                entryIds: entry ? [entry.id] : []
            });
        });
}

export const getTrophy = (state: TrophiesState, id: string) =>
    state.trophies.find((trophy) => trophy.id === id);

export const getTrophies = (
    state: TrophiesState,
    activity: Activity | null = null
) => {
    return state.trophies.filter(
        (trophy) => !activity || trophy.activity === activity
    );
};
