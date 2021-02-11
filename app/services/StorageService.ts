import {Entry} from '../types/Entry';
import { AsyncStorage } from 'react-native';

const ENTRIES_KEY = 'entries';

class StorageService {

    static async loadEntries(): Promise<Entry[]> {
        try {
            const entries = await AsyncStorage.getItem(ENTRIES_KEY)
            return entries ? JSON.parse(entries) : [];
        } catch (e) {
            this.handleError(e);
            return [];
        }
    }

    static async saveEntry(entry: Entry) {
        const entries = await this.loadEntries();
        const _entry = entries.find(item => item.id === entry.id);

        if (_entry) {
            Object.assign(_entry, entry);
        } else {
            entries.unshift(entry);
        }

        this.saveEntries(entries);
    }

    static async deleteEntry(id: string) {
        let entries = await this.loadEntries();
        entries = entries.filter(entry => entry.id !== id);
        this.saveEntries(entries);
    }

    private static saveEntries(entries: Entry[]) {
        try {
            AsyncStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
        } catch (e) {
            this.handleError(e);
        }
    }

    private static handleError(error) {
        console.log('Storage error', error);
    }
}

export default StorageService;
