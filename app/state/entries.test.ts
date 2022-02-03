/* eslint-disable no-global-assign */
import {Activity} from '../types/Activity';
import {
    addEntry,
    deleteEntry,
    EntriesState,
    getEntries,
    getEntriesByIds,
    getSortedEntries,
    loadEntries,
    updateEntry,
    useEntriesStore
} from './entries';
import {Entry} from '../types/Entry';
import * as api from '../lib/api';
import {TimeInterval} from '../types/TimeInterval';
import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';

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
        let saveEntriesSpy;
        let deleteEntrySpy;

        beforeEach(() => {
            saveEntriesSpy = jest.spyOn(api, 'saveEntries');
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
                entry,
                ...initialState.entries
            ]);
            expect(saveEntriesSpy).toHaveBeenCalled();
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
            expect(saveEntriesSpy).toHaveBeenCalled();
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

        it('should get entries by ids', () => {
            expect(getEntriesByIds(['1', '2'])(initialState)).toEqual(
                initialState.entries
            );
            expect(getEntriesByIds(['2', '3'])(initialState)).toEqual([]);
        });

        describe('sorting', () => {
            let state: EntriesState;

            beforeEach(() => {
                state = {
                    entries: [
                        {
                            id: '1',
                            activity: Activity.RUNNING,
                            distance: 10,
                            duration: 3600,
                            date: '2021-01-07T09:10:02.207Z',
                            effort: 3
                        },
                        {
                            id: '2',
                            activity: Activity.SWIMMING,
                            distance: 2,
                            duration: 3600,
                            date: '2021-04-10T09:10:02.207Z',
                            effort: 1
                        },
                        {
                            id: '3',
                            activity: Activity.CYCLING,
                            distance: 50,
                            duration: 7200,
                            date: '2021-09-01T09:10:02.207Z',
                            effort: 5
                        },
                        {
                            id: '4',
                            activity: Activity.SWIMMING,
                            distance: 2.5,
                            duration: 3000,
                            date: '2022-01-01T09:10:02.207Z',
                            effort: 4
                        }
                    ] as Entry[]
                };
            });

            const getIds = (entry) => entry.id;

            it('should sort by date', () => {
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DATE,
                        sortDirection: SortDirection.ASCENDING
                    })(state).map(getIds)
                ).toEqual(['1', '2', '3', '4']);
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DATE,
                        sortDirection: SortDirection.DESCENDING
                    })(state).map(getIds)
                ).toEqual(['4', '3', '2', '1']);
            });

            it('should sort by distance', () => {
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DISTANCE,
                        sortDirection: SortDirection.ASCENDING
                    })(state).map(getIds)
                ).toEqual(['2', '4', '1', '3']);
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DISTANCE,
                        sortDirection: SortDirection.DESCENDING
                    })(state).map(getIds)
                ).toEqual(['3', '1', '4', '2']);
            });

            it('should sort by duration', () => {
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DURATION,
                        sortDirection: SortDirection.ASCENDING
                    })(state).map(getIds)
                ).toEqual(['4', '1', '2', '3']);
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.DURATION,
                        sortDirection: SortDirection.DESCENDING
                    })(state).map(getIds)
                ).toEqual(['3', '1', '2', '4']);
            });

            it('should sort by pace', () => {
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.PACE,
                        sortDirection: SortDirection.ASCENDING
                    })(state).map(getIds)
                ).toEqual(['3', '1', '4', '2']);
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.PACE,
                        sortDirection: SortDirection.DESCENDING
                    })(state).map(getIds)
                ).toEqual(['2', '4', '1', '3']);
            });

            it('should sort by effort', () => {
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.EFFORT,
                        sortDirection: SortDirection.ASCENDING
                    })(state).map(getIds)
                ).toEqual(['2', '1', '4', '3']);
                expect(
                    getSortedEntries({
                        sortBy: EntriesSortBy.EFFORT,
                        sortDirection: SortDirection.DESCENDING
                    })(state).map(getIds)
                ).toEqual(['3', '4', '1', '2']);
            });
        });
    });
});
