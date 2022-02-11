import create from 'zustand';
import {TimeInterval} from '../enums/TimeInterval';
import {fetchTimelineSettings, saveTimelineSettings} from '../lib/api';
import {TimelineSettings} from '../types/TimelineSettings';

interface TimelineSettingsState {
    timeInterval: TimeInterval;
}

export const useTimelineSettingsStore = create<TimelineSettingsState>(() => ({
    timeInterval: TimeInterval.MONTH
}));

export function setTimelineSettings(settings: TimelineSettings) {
    saveTimelineSettings(settings);
    useTimelineSettingsStore.setState(() => settings);
}

export async function loadTimelineSettings() {
    const settings = await fetchTimelineSettings();
    if (settings) {
        useTimelineSettingsStore.setState(() => settings);
    }
}
