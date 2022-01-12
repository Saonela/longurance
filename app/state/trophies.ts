import create from 'zustand';
import {Trophy} from '../types/Trophy';
import * as api from '../lib/api';
// eslint-disable-next-line import/extensions
import trophiesJson from '../../assets/data/trophies.json';
import {Activity} from '../types/Activity';

const predefinedTrophies = trophiesJson as Trophy[];

interface TrophiesState {
    trophies: Trophy[];
}

export const useTrophiesStore = create<TrophiesState>(() => ({
    trophies: []
}));

export async function loadTrophies() {
    const trophies = await api.fetchTrophies();
    useTrophiesStore.setState(() => ({
        trophies: [...predefinedTrophies, ...trophies]
    }));
}

export const getTrophies = (state, activity: Activity | null = null) => {
    return state.trophies.filter(
        (trophy) => !activity || trophy.activity === activity
    );
};
