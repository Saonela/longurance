/* eslint-disable no-global-assign */
import {Activity} from '../types/Activity';
import {
    addEntry,
    deleteEntry,
    getEntries,
    loadEntries,
    updateEntry,
    useEntriesStore
} from './entries';
import {Entry} from '../types/Entry';
import * as api from '../lib/api';
import {TimeInterval} from '../types/TimeInterval';

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

    describe('actions', () => {
        let saveEntrySpy;
        let deleteEntrySpy;

        beforeEach(() => {
            saveEntrySpy = jest.spyOn(api, 'saveEntry');
            deleteEntrySpy = jest.spyOn(api, 'deleteEntry');
            useEntriesStore.setState(initialState);
        });

        it('should load entries', async () => {
            jest.spyOn(api, 'fetchEntries').mockImplementation(() =>
                Promise.resolve([])
            );
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
            const entry: Entry = {
                id: '1',
                activity: Activity.SWIMMING
            } as Entry;
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

    describe('selectors', () => {
        let RealDate;

        beforeAll(() => {
            RealDate = Date;
            setFakeDate(new Date().toISOString());
        });

        afterAll(() => {
            Date = RealDate;
        });

        const setFakeDate = (isoDate: string) => {
            (jest.spyOn(global, 'Date') as any).mockImplementation((args) => {
                return new RealDate(args || isoDate);
            });
        };

        it('should get entries filtered by activity', () => {
            expect(getEntries(initialState, null)).toEqual(
                initialState.entries
            );
            expect(getEntries(initialState, Activity.RUNNING)).toEqual(
                initialState.entries
            );
            expect(getEntries(initialState, Activity.CYCLING)).toEqual([]);
            expect(getEntries(initialState, Activity.SWIMMING)).toEqual([]);
        });

        it('should get entries filtered by time interval', () => {
            setFakeDate('2021-01-19T09:00:00.000');
            expect(getEntries(initialState, null, TimeInterval.MONTH)).toEqual(
                initialState.entries
            );
            expect(getEntries(initialState, null, TimeInterval.YEAR)).toEqual(
                initialState.entries
            );

            setFakeDate('2021-09-19T09:00:00.000');
            expect(getEntries(initialState, null, TimeInterval.MONTH)).toEqual(
                []
            );
            expect(getEntries(initialState, null, TimeInterval.YEAR)).toEqual(
                initialState.entries
            );
        });
    });
});
