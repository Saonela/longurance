import {Activity} from '../types/Activity';
import {
    addEntry,
    deleteEntry,
    loadEntries,
    updateEntry,
    useEntriesStore
} from './entries';
import {Entry} from '../types/Entry';
import * as api from '../lib/api';

jest.mock('../lib/storage');

describe('Entries state', () => {
    const initialState = {
        entries: [
            {
                id: '1',
                createdAt: '2021-01-01T00:00:00.00Z',
                activity: Activity.RUNNING,
                distance: 15,
                duration: 92,
                date: '2021-01-07T09:10:02.207Z',
                effort: 2,
                note: 'Was really enjoying. Got into flow state.',
                title: 'First run.'
            }
        ]
    };

    let saveEntrySpy;
    let deleteEntrySpy;

    beforeEach(() => {
        saveEntrySpy = jest.spyOn(api, 'saveEntry');
        deleteEntrySpy = jest.spyOn(api, 'deleteEntry');
        useEntriesStore.setState(initialState);
    });

    it('should load entries', async () => {
        deleteEntrySpy = jest
            .spyOn(api, 'fetchEntries')
            .mockImplementation(() => Promise.resolve([]));
        await loadEntries();
        expect(useEntriesStore.getState().entries).toEqual([]);
    });

    it('should add entry', () => {
        const entry: Entry = {id: '2'} as Entry;
        addEntry(entry);
        expect(useEntriesStore.getState().entries).toEqual([
            ...initialState.entries,
            entry
        ]);
        expect(saveEntrySpy).toHaveBeenCalled();
    });

    it('should update entry', () => {
        const entry: Entry = {id: '1', activity: Activity.SWIMMING} as Entry;
        updateEntry(entry);
        expect(useEntriesStore.getState().entries).toEqual([
            {...initialState.entries[0], ...entry}
        ]);
        expect(saveEntrySpy).toHaveBeenCalled();
    });

    it('should delete entry', () => {
        deleteEntry('1');
        expect(useEntriesStore.getState().entries).toEqual([]);
        expect(deleteEntrySpy).toHaveBeenCalled();
    });
});
