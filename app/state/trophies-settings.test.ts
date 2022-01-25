import * as api from '../lib/api';
import {TrophiesSettings} from '../types/TrophiesSettings';
import {
    loadTrophiesSettings,
    setTrophiesSettings,
    useTrophiesSettingsStore
} from './trophies-settings';
import {TrophiesStateFilter} from '../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../enums/TrophiesTypeFilter';

jest.mock('../lib/storage');

describe('Trophies settings state', () => {
    const settings: TrophiesSettings = {
        stateFilter: TrophiesStateFilter.ALL,
        typeFilter: TrophiesTypeFilter.INDIVIDUAL
    };

    it('should load trophies settings', async () => {
        jest.spyOn(api, 'fetchTrophiesSettings').mockImplementation(() =>
            Promise.resolve(settings)
        );
        await loadTrophiesSettings();
        expect(useTrophiesSettingsStore.getState().settings).toEqual(settings);
    });

    it('should set entries settings', () => {
        const spy = jest.spyOn(api, 'saveTrophiesSettings');
        const newSettings: TrophiesSettings = {
            stateFilter: TrophiesStateFilter.PENDING,
            typeFilter: TrophiesTypeFilter.ALL
        };
        setTrophiesSettings(newSettings);
        expect(useTrophiesSettingsStore.getState().settings).toEqual(
            newSettings
        );
        expect(spy).toHaveBeenCalledWith(newSettings);
    });
});
