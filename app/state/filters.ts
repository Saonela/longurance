import create from 'zustand';
import {fetchFilters, saveFilters} from '../lib/api';

interface FiltersState {
    dashboardTimeInterval: number;
    setDashboardTimeInterval: (number) => void;
    loadDashboardTimeInterval: () => void;
}

const useFiltersStore = create<FiltersState>(set => ({
    dashboardTimeInterval: 1,
    setDashboardTimeInterval: value => {
        saveFilters({dashboardTimeInterval: value});
        set(state => ({...state, dashboardTimeInterval: value}));
    },
    loadDashboardTimeInterval: async () => {
        const filters = await fetchFilters();
        set(state => ({...state, ...filters}));
    }
}));

export default useFiltersStore;
