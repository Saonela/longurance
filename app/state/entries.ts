import create from 'zustand';
import {Entry} from '../types/Entry';
import {generateId} from '../lib/utility';
import * as api from '../lib/api';

interface EntriesState {
    entries: Entry[];
}

export const useEntriesStore = create<EntriesState>(() => ({
    entries: []
}));

export function addEntry(entry: Entry) {
    Object.assign(entry, {id: generateId()});
    api.saveEntry(entry);
    useEntriesStore.setState((state) => ({entries: [...state.entries, entry]}));
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

export const getEntry = (state: EntriesState, id: string) =>
    state.entries.find((entry) => entry.id === id);
