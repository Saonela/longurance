import * as api from '../lib/api';
import {EntriesSettings} from '../types/EntriesSettings';
import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';
import {
    loadEntriesSettings,
    setEntriesSettings,
    useEntriesSettingsStore
} from './entries-settings';

jest.mock('../lib/storage');

describe('Entries settings state', () => {
    const settings: EntriesSettings = {
        sortBy: EntriesSortBy.DATE,
        sortDirection: SortDirection.ASCENDING
    };

    it('should load entries settings', async () => {
        jest.spyOn(api, 'fetchEntriesSettings').mockImplementation(() =>
            Promise.resolve(settings)
        );
        await loadEntriesSettings();
        expect(useEntriesSettingsStore.getState().settings).toEqual(settings);
    });

    it('should set entries settings', () => {
        const spy = jest.spyOn(api, 'saveEntriesSettings');
        const newSettings: EntriesSettings = {
            sortBy: EntriesSortBy.DISTANCE,
            sortDirection: SortDirection.DESCENDING
        };
        setEntriesSettings(newSettings);
        expect(useEntriesSettingsStore.getState().settings).toEqual(
            newSettings
        );
        expect(spy).toHaveBeenCalledWith(newSettings);
    });
});
