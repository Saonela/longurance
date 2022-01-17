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

function isTrophyCompleted(
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
                entry.distance >= trophy.distance &&
                entry.duration <= trophy.duration;

            return (
                isDistanceCompleted || isDurationCompleted || isPaceCompleted
            );
        });
}

export function updateCompletedTrophies() {
    const {entries} = useEntriesStore.getState();
    const {trophies} = useTrophiesStore.getState();

    const entriesMap = entries.reduce((map, entry) => {
        map.set(entry.id, entry);
        return map;
    }, new Map<string, Entry>());

    const individualTrophies = trophies.filter(
        (trophy) => trophy.type === TrophyType.INDIVIDUAL
    );

    individualTrophies.forEach((trophy) => {
        const entry = isTrophyCompleted(trophy, entries);
        updateTrophy({
            ...trophy,
            completed: !!entry,
            completedAt: entry ? entry.date : null,
            entryIds: entry ? [entry.id] : []
        });
    });

    individualTrophies
        .filter((trophy) => trophy.completed)
        .forEach((trophy) => {
            if (!entriesMap.has(trophy.entryIds[0] as string)) {
                updateTrophy({
                    ...trophy,
                    completed: false,
                    completedAt: null,
                    entryIds: []
                });
            }
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
