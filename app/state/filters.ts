import create from 'zustand';
import {fetchFilters, saveFilters} from '../lib/api';
import {TimeInterval} from '../enums/TimeInterval';

interface FiltersState {
    dashboardTimeInterval: TimeInterval;
    setDashboardTimeInterval: (number) => void;
    loadDashboardTimeInterval: () => void;
}

const useFiltersStore = create<FiltersState>((set) => ({
    dashboardTimeInterval: TimeInterval.WEEK,
    setDashboardTimeInterval: (value) => {
        saveFilters({dashboardTimeInterval: value});
        set((state) => ({...state, dashboardTimeInterval: value}));
    },
    loadDashboardTimeInterval: async () => {
        const filters = await fetchFilters();
        set((state) => ({...state, ...filters}));
    }
}));

export default useFiltersStore;
