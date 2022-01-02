import create from 'zustand';
import moment from 'moment';
import {Entry} from '../types/Entry';
import {generateId} from '../lib/utility';
import * as api from '../lib/api';
import {Activity} from '../types/Activity';
import {TimeInterval} from '../types/TimeInterval';

interface EntriesState {
    entries: Entry[];
}

export const useEntriesStore = create<EntriesState>(() => ({
    entries: []
}));

export function addEntry(entry: Entry) {
    Object.assign(entry, {id: generateId()});
    api.saveEntry(entry);
    useEntriesStore.setState((state) => ({entries: [entry, ...state.entries]}));
}

export function updateEntry(entry: Entry) {
    api.saveEntry(entry);
    useEntriesStore.setState((state) => ({
        entries: state.entries.map((stateEntry) => {
            if (stateEntry.id === entry.id) {
                return {...stateEntry, ...entry};
            }
            return stateEntry;
        })
    }));
}

export function deleteEntry(id: string) {
    api.deleteEntry(id);
    useEntriesStore.setState((state) => ({
        entries: state.entries.filter((entry) => entry.id !== id)
    }));
}

export async function loadEntries() {
    const entries = await api.fetchEntries();
    useEntriesStore.setState(() => ({entries}));
}

function filterEntriesByActivity(entries: Entry[], activity: Activity | null) {
    if (activity === null) {
        return entries;
    }
    return entries.filter((entry) => entry.activity === activity);
}

function filterEntriesByTimeInterval(
    entries: Entry[],
    timeInterval: TimeInterval | null
) {
    if (timeInterval === TimeInterval.YEAR) {
        const year = new Date().getFullYear();
        return entries.filter(
            (entry) => new Date(entry.date).getFullYear() === year
        );
    }
    if (timeInterval === TimeInterval.MONTH) {
        const month = new Date().getMonth();
        return entries.filter(
            (entry) => new Date(entry.date).getMonth() === month
        );
    }
    if (timeInterval === TimeInterval.WEEK) {
        const week = moment().format('W');
        return entries.filter(
            (entry) => moment(entry.date).format('W') === week
        );
    }
    return entries;
}

export const getEntry = (state: EntriesState, id: string) =>
    state.entries.find((entry) => entry.id === id);

export const getEntries = (
    state,
    activity: Activity | null = null,
    timeInterval: TimeInterval | null = null
) => {
    const activityEntries = filterEntriesByActivity(state.entries, activity);
    return filterEntriesByTimeInterval(activityEntries, timeInterval);
};
