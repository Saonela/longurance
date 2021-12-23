import AsyncStorage from '@react-native-async-storage/async-storage';

const FILTERS_KEY = 'filters';

function logError(error: unknown) {
    // eslint-disable-next-line no-console
    console.log('API Storage error', error);
}

export async function saveFilters(filters) {
    try {
        return AsyncStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
    } catch (e) {
        logError(e);
        return Promise.reject();
    }
}

export async function fetchFilters() {
    try {
        const filters = await AsyncStorage.getItem(FILTERS_KEY);
        return filters ? JSON.parse(filters) : {};
    } catch (e) {
        logError(e);
        return Promise.reject();
    }
}
