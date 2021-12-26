import create from 'zustand';
import {Activity} from '../types/Activity';
import {saveActivityFilter} from '../lib/api';
import * as api from '../lib/api';

interface ActivityFilterState {
    filter: Activity | null;
}

export const useActivityFilterStore = create<ActivityFilterState>(() => ({
    filter: null
}));

export function setActivityFilter(activity: Activity | null) {
    saveActivityFilter(activity);
    useActivityFilterStore.setState(() => ({filter: activity}));
}

export async function loadActivityFilter() {
    const filter = await api.fetchActivityFilter();
    useActivityFilterStore.setState(() => ({filter}));
}
