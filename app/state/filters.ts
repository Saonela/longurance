import create from 'zustand';
import {fetchFilters, saveFilters} from '../lib/api';
import {FilterTimeInterval} from '../types/FilterTimeInterval';

interface FiltersState {
    dashboardTimeInterval: FilterTimeInterval;
    setDashboardTimeInterval: (number) => void;
    loadDashboardTimeInterval: () => void;
}

const useFiltersStore = create<FiltersState>((set) => ({
    dashboardTimeInterval: FilterTimeInterval.WEEK,
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
