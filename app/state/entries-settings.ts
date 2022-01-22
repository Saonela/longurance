import create from 'zustand';
import {EntriesSettings} from '../types/EntriesSettings';
import {fetchEntriesSettings, saveEntriesSettings} from '../lib/api';
import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';

interface EntriesSettingsState {
    settings: EntriesSettings;
}

export const useEntriesSettingsStore = create<EntriesSettingsState>(() => ({
    settings: {
        sortBy: EntriesSortBy.DATE,
        sortDirection: SortDirection.DESCENDING
    }
}));

export function setEntriesSettings(settings: EntriesSettings) {
    saveEntriesSettings(settings);
    useEntriesSettingsStore.setState(() => ({settings}));
}

export async function loadEntriesSettings() {
    const settings = await fetchEntriesSettings();
    if (settings) {
        useEntriesSettingsStore.setState(() => ({settings}));
    }
}
