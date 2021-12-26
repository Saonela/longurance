import create from 'zustand';
import {Activity} from '../types/Activity';
import {saveActivityFilter} from '../lib/api';

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
