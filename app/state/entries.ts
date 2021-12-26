import create from 'zustand';
import {Entry} from '../types/Entry';
import {generateId} from '../lib/utility';
import {deleteEntry, fetchEntries, saveEntry} from '../lib/api';

interface EntriesState {
    entries: Entry[];
    addEntry: (entry: Entry) => void;
    updateEntry: (entry: Entry) => void;
    deleteEntry: (id: string) => void;
    loadEntries: () => void;
}

const useEntriesStore = create<EntriesState>((set) => ({
    entries: [],
    addEntry: (entry: Entry) => {
        Object.assign(entry, {id: generateId()});
        saveEntry(entry);
        set((state) => ({entries: [...state.entries, entry]}));
    },
    updateEntry: (entry: Entry) => {
        saveEntry(entry);
        set((state) => ({
            entries: state.entries.map((stateEntry) => {
                if (stateEntry.id === entry.id) {
                    return {...stateEntry, ...entry};
                }
                return stateEntry;
            })
        }));
    },
    deleteEntry: (id: string) => {
        deleteEntry(id);
        set((state) => ({
            entries: state.entries.filter((entry) => entry.id !== id)
        }));
    },
    loadEntries: async () => {
        const entries = await fetchEntries();
        set(() => ({entries}));
    }
}));

export default useEntriesStore;
