import create from 'zustand';
import {Trophy} from '../types/Trophy';
import * as api from '../lib/api';
// eslint-disable-next-line import/extensions
import trophiesJson from '../../assets/data/trophies.json';
import {Activity} from '../types/Activity';
import {generateId} from '../lib/utility';

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
