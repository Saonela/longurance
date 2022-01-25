import create from 'zustand';
import {TrophiesSettings} from '../types/TrophiesSettings';
import {fetchTrophiesSettings, saveTrophiesSettings} from '../lib/api';
import {TrophiesStateFilter} from '../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../enums/TrophiesTypeFilter';

interface TrophiesSettingsState {
    settings: TrophiesSettings;
}

export const useTrophiesSettingsStore = create<TrophiesSettingsState>(() => ({
    settings: {
        stateFilter: TrophiesStateFilter.ALL,
        typeFilter: TrophiesTypeFilter.ALL
    }
}));

export function setTrophiesSettings(settings: TrophiesSettings) {
    saveTrophiesSettings(settings);
    useTrophiesSettingsStore.setState(() => ({settings}));
}

export async function loadTrophiesSettings() {
    const settings = await fetchTrophiesSettings();
    if (settings) {
        useTrophiesSettingsStore.setState(() => ({settings}));
    }
}
