/* eslint-disable @typescript-eslint/no-unused-vars */
async function setItem(key: string, value: unknown): Promise<void> {
    return Promise.resolve();
}

async function getItem<T>(key: string): Promise<T> {
    return Promise.resolve(null as unknown as T);
}

async function upsertToArray<T>(key: string, value: T): Promise<void> {
    return Promise.resolve();
}

async function deleteFromArray<T>(key: string, id: string): Promise<void> {
    return Promise.resolve();
}

const Storage = {
    setItem,
    getItem,
    upsertToArray,
    deleteFromArray
};

export default Storage;
