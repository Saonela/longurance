import create from 'zustand';
import moment from 'moment';
import {Entry} from '../types/Entry';
import {generateId} from '../lib/utility';
import * as api from '../lib/api';
import {Activity} from '../enums/Activity';
import {TimeInterval} from '../enums/TimeInterval';
import {EntriesSettings} from '../types/EntriesSettings';
import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';
import {calculatePace, sortEntryList} from '../lib/entry';

export interface EntriesState {
    entries: Entry[];
}

export const useEntriesStore = create<EntriesState>(() => ({
    entries: []
}));

export function addEntry(entry: Entry) {
    Object.assign(entry, {id: generateId()});
    api.saveEntries([entry]);
    useEntriesStore.setState((state) => ({
        entries: sortEntryList([entry, ...state.entries])
    }));
}

export function updateEntry(entry: Entry) {
    api.saveEntries([entry]);
    useEntriesStore.setState((state) => ({
        entries: sortEntryList(
            state.entries.map((stateEntry) => {
                if (stateEntry.id === entry.id) {
                    return {...stateEntry, ...entry};
                }
                return stateEntry;
            })
        )
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
    useEntriesStore.setState(() => ({entries: sortEntryList(entries)}));
}

export const getEntry = (id: string) => (state: EntriesState) =>
    state.entries.find((entry) => entry.id === id);

export const getEntriesByActivity =
    (activity: Activity | null) => (state: EntriesState) =>
        state.entries.filter(
            (entry) => !activity || entry.activity === activity
        );

export const getEntriesByTimeInterval =
    (timeInterval: TimeInterval | null) => (state: EntriesState) => {
        if (timeInterval === TimeInterval.YEAR) {
            const year = new Date().getFullYear();
            return state.entries.filter(
                (entry) => new Date(entry.date).getFullYear() === year
            );
        }
        if (timeInterval === TimeInterval.MONTH) {
            const month = new Date().getMonth();
            return state.entries.filter(
                (entry) => new Date(entry.date).getMonth() === month
            );
        }
        if (timeInterval === TimeInterval.WEEK) {
            const week = moment().format('W');
            return state.entries.filter(
                (entry) => moment(entry.date).format('W') === week
            );
        }
        return state.entries;
    };

export const getEntries =
    (
        activity: Activity | null = null,
        timeInterval: TimeInterval | null = null
    ) =>
    (state: EntriesState) =>
        getEntriesByTimeInterval(timeInterval)({
            entries: getEntriesByActivity(activity)(state)
        });

export const getEntriesByIds = (ids: string[]) => (state: EntriesState) =>
    state.entries.filter((entry) => ids.includes(entry.id));

export const getSortedEntries =
    (activity: Activity | null, settings: EntriesSettings) =>
    (state: EntriesState) =>
        [...getEntriesByActivity(activity)(state)].sort((entry1, entry2) => {
            let diff = 0;
            if (settings.sortBy === EntriesSortBy.DATE) {
                diff =
                    new Date(entry1.date).getTime() -
                    new Date(entry2.date).getTime();
            }
            if (settings.sortBy === EntriesSortBy.DISTANCE) {
                diff = entry1.distance - entry2.distance;
            }
            if (settings.sortBy === EntriesSortBy.DURATION) {
                diff = entry1.duration - entry2.duration;
            }
            if (settings.sortBy === EntriesSortBy.PACE) {
                diff =
                    calculatePace(entry1.duration, entry1.distance) -
                    calculatePace(entry2.duration, entry2.distance);
            }
            if (settings.sortBy === EntriesSortBy.EFFORT) {
                diff = entry1.effort - entry2.effort;
            }
            return settings.sortDirection === SortDirection.ASCENDING
                ? diff
                : -diff;
        });
