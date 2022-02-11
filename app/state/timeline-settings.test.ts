import * as api from '../lib/api';
import {TimelineSettings} from '../types/TimelineSettings';
import {TimeInterval} from '../enums/TimeInterval';
import {
    loadTimelineSettings,
    setTimelineSettings,
    useTimelineSettingsStore
} from './timeline-settings';

jest.mock('../lib/storage');

describe('Timeline settings state', () => {
    const settings: TimelineSettings = {timeInterval: TimeInterval.YEAR};

    it('should load timeline settings', async () => {
        jest.spyOn(api, 'fetchTimelineSettings').mockImplementation(() =>
            Promise.resolve(settings)
        );
        await loadTimelineSettings();
        expect(useTimelineSettingsStore.getState()).toEqual(settings);
    });

    it('should set timeline settings', () => {
        const spy = jest.spyOn(api, 'saveTimelineSettings');
        const newSettings: TimelineSettings = {
            timeInterval: TimeInterval.MONTH
        };
        setTimelineSettings(newSettings);
        expect(useTimelineSettingsStore.getState()).toEqual(newSettings);
        expect(spy).toHaveBeenCalledWith(newSettings);
    });
});
