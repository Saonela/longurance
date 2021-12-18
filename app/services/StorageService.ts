import {Entry} from '../types/Entry';
import {Trophy} from '../types/Trophy';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StatisticsOptions} from '../types/StatisticsOptions';

const TROPHIES_KEY = 'trophies';
const ENTRIES_KEY = 'entries';
const STATISTICS_OPTIONS_KEY = 'statisticsOptions';

class StorageService {
    static async saveStatisticsOptions(options: StatisticsOptions) {
        return this.saveGenericListItem(STATISTICS_OPTIONS_KEY, options);
    }

    static async loadStatisticsOptions(): Promise<StatisticsOptions | null> {
        return this.loadGenericItem<StatisticsOptions>(STATISTICS_OPTIONS_KEY);
    }

    static async loadTrophies(): Promise<Trophy[]> {
        return this.loadGenericList(TROPHIES_KEY);
    }

    static async saveTrophy(trophy: Trophy) {
        return this.saveGenericListItem(TROPHIES_KEY, trophy);
    }

    static async saveTrophies(trophies: Trophy[]) {
        trophies.forEach((trophy) => this.saveTrophy(trophy));
    }

    static async deleteTrophy(id: string) {
        return this.deleteGenericListItem(TROPHIES_KEY, id);
    }

    static async loadEntries(): Promise<Entry[]> {
        return this.loadGenericList(ENTRIES_KEY);
    }

    static async saveEntry(entry: Entry) {
        return this.saveGenericListItem(ENTRIES_KEY, entry);
    }

    static async deleteEntry(id: string) {
        return this.deleteGenericListItem(ENTRIES_KEY, id);
    }

    static async loadGenericItem<T>(key: string): Promise<T | null> {
        try {
            const entries = await AsyncStorage.getItem(key);
            return entries ? JSON.parse(entries) : null;
        } catch (e) {
            this.handleError(e);
            return null;
        }
    }

    static async loadGenericList(key: string): Promise<any[]> {
        try {
            const entries = await AsyncStorage.getItem(key);
            return entries ? JSON.parse(entries) : [];
        } catch (e) {
            this.handleError(e);
            return [];
        }
    }

    static async saveGenericList(key: string, list: any[]) {
        try {
            AsyncStorage.setItem(key, JSON.stringify(list));
        } catch (e) {
            this.handleError(e);
        }
    }

    static async saveGenericListItem(key: string, item: any) {
        const items = await this.loadGenericList(key);
        const _item = items.find((x) => x.id === item.id);

        if (_item) {
            Object.assign(_item, item);
        } else {
            items.unshift(item);
        }

        this.saveGenericList(key, items);
    }

    static async deleteGenericListItem(key: string, id: string) {
        let items = await this.loadGenericList(key);
        items = items.filter((entry) => entry.id !== id);
        this.saveGenericList(key, items);
    }

    private static handleError(error) {
        console.log('Storage error', error);
    }

    static clearEverything() {
        AsyncStorage.clear(() => {
            console.log('Storage cleared');
        });
    }
}

export default StorageService;
