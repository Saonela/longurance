import {Entry} from '../types/Entry';
import Storage from './storage';
import {Activity} from '../types/Activity';

const FILTERS_KEY = 'filters';
const ACTIVITY_FILTER_KEY = 'activityFilter';
const ENTRIES_KEY = 'entries';

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
