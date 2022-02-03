import {Entry} from '../types/Entry';
import Storage from './storage';
import {Activity} from '../types/Activity';
import {Trophy} from '../types/Trophy';
import {EntriesSettings} from '../types/EntriesSettings';
import {TrophiesSettings} from '../types/TrophiesSettings';
import {TimelineSettings} from '../types/TimelineSettings';

const FILTERS_KEY = 'filters';
const ACTIVITY_FILTER_KEY = 'activityFilter';
const ENTRIES_KEY = 'entries';
const TROPHIES_KEY = 'trophies';
const ENTRIES_SETTINGS_KEY = 'entriesSettings';
const TROPHIES_SETTINGS_KEY = 'trophiesSettings';
const TIMELINE_SETTINGS_KEY = 'timelineSettings';

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

export async function saveEntries(entries: Entry[]) {
    return Storage.upsertToArray<Entry>(ENTRIES_KEY, entries);
}

export async function deleteEntry(id: string) {
    return Storage.deleteFromArray<Entry>(ENTRIES_KEY, id);
}

export async function fetchTrophies(): Promise<Trophy[]> {
    const trophies = await Storage.getItem<Trophy[]>(TROPHIES_KEY);
    return trophies || [];
}

export async function saveTrophies(trophies: Trophy[]) {
    return Storage.upsertToArray<Trophy>(TROPHIES_KEY, trophies);
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

export async function fetchTrophiesSettings(): Promise<TrophiesSettings | null> {
    return Storage.getItem<TrophiesSettings | null>(TROPHIES_SETTINGS_KEY);
}

export async function saveTrophiesSettings(settings: TrophiesSettings | null) {
    return Storage.setItem(TROPHIES_SETTINGS_KEY, settings);
}

export async function fetchTimelineSettings(): Promise<TimelineSettings | null> {
    return Storage.getItem<TimelineSettings | null>(TIMELINE_SETTINGS_KEY);
}

export async function saveTimelineSettings(settings: TimelineSettings | null) {
    return Storage.setItem(TIMELINE_SETTINGS_KEY, settings);
}
