import {Entry} from '../types/Entry';
import Storage from './storage';
import {Activity} from '../types/Activity';
import {Trophy} from '../types/Trophy';
import {EntriesSettings} from '../types/EntriesSettings';

const FILTERS_KEY = 'filters';
const ACTIVITY_FILTER_KEY = 'activityFilter';
const ENTRIES_KEY = 'entries';
const TROPHIES_KEY = 'trophies';
const ENTRIES_SETTINGS_KEY = 'entriesSettings';

export async function fetchFilters(): Promise<object> {
    const filter = await Storage.getItem<object>(FILTERS_KEY);
    return filter || {};
}

export async function saveFilters(filters) {
    return Storage.setItem(FILTERS_KEY, filters);
}

export async function fetchActivityFilter(): Promise<Activity | null> {
    return Storage.getItem<Activity | null>(ACTIVITY_FILTER_KEY);
}

export async function saveActivityFilter(filter: Activity | null) {
    return Storage.setItem(ACTIVITY_FILTER_KEY, filter);
}

export async function fetchEntries(): Promise<Entry[]> {
    const entries = await Storage.getItem<Entry[]>(ENTRIES_KEY);
    return entries || [];
}

export async function saveEntry(entry: Entry) {
    return Storage.upsertToArray<Entry>(ENTRIES_KEY, entry);
}

export async function deleteEntry(id: string) {
    return Storage.deleteFromArray<Entry>(ENTRIES_KEY, id);
}

export async function fetchTrophies(): Promise<Trophy[]> {
    const trophies = await Storage.getItem<Trophy[]>(TROPHIES_KEY);
    return trophies || [];
}

export async function saveTrophy(trophy: Trophy) {
    return Storage.upsertToArray<Trophy>(TROPHIES_KEY, trophy);
}

export async function deleteTrophy(id: string) {
    return Storage.deleteFromArray<Trophy>(TROPHIES_KEY, id);
}

export async function fetchEntriesSettings(): Promise<EntriesSettings | null> {
    return Storage.getItem<EntriesSettings | null>(ENTRIES_SETTINGS_KEY);
}

export async function saveEntriesSettings(settings: EntriesSettings | null) {
    return Storage.setItem(ENTRIES_SETTINGS_KEY, settings);
}
