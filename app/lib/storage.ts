import AsyncStorage from '@react-native-async-storage/async-storage';

async function setItem(key: string, value: unknown): Promise<void> {
    try {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        return Promise.reject();
    }
}

async function getItem<T>(key: string): Promise<T> {
    try {
        const value = await AsyncStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    } catch (e) {
        return Promise.reject();
    }
}

async function upsertToArray<T extends {id: string}>(
    key: string,
    values: T[]
): Promise<void> {
    const items = await getItem<T[]>(key);
    if (!items) {
        return setItem(key, values);
    }

    values.forEach((value) => {
        const toUpdate = items.find((item) => item.id === value.id);
        if (toUpdate) {
            Object.assign(toUpdate, value);
        } else {
            items.push(value);
        }
    });

    return setItem(key, items);
}

async function deleteFromArray<T extends {id: string}>(
    key: string,
    id: string
): Promise<void> {
    const items = await getItem<T[]>(key);
    if (!items) {
        return Promise.resolve();
    }

    const filtered = items.filter((item) => item.id !== id);
    return setItem(key, filtered);
}

async function clear() {
    return AsyncStorage.clear();
}

const Storage = {
    setItem,
    getItem,
    upsertToArray,
    deleteFromArray,
    clear
};

export default Storage;
