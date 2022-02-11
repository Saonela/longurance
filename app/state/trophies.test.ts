/* eslint-disable no-global-assign */
import {Activity} from '../enums/Activity';
import {
    addTrophy,
    deleteTrophy,
    getEntryTrophies,
    getFilteredTrophies,
    getTrophies,
    getTrophiesByState,
    loadTrophies,
    TrophiesState,
    updateCompletedTrophies,
    updateTrophy,
    useTrophiesStore
} from './trophies';
import * as api from '../lib/api';
import {Trophy, TrophyType} from '../types/Trophy';
import {useEntriesStore} from './entries';
import {Entry} from '../types/Entry';
import {TrophiesStateFilter} from '../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../enums/TrophiesTypeFilter';

const predefinedTrophies: Trophy[] = [
    {id: 'predefined-1', title: 'First activity.'}
] as Trophy[];

jest.mock('../lib/storage');
jest.mock('../lib/utility', () => ({generateId: () => '123456'}));
jest.mock('../../assets/data/trophies.json', () => predefinedTrophies);

describe('Trophies state', () => {
    const trophies: Trophy[] = [
        {
            id: '1',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            entryIds: ['11'],
            distance: 21,
            duration: 0,
            createdAt: '2021-01-07T09:10:02.207Z',
            completedAt: '2021-01-07T09:10:02.207Z',
            completed: true,
            markedAsRead: false,
            predefined: false,
            title: 'My first half marathon !'
        }
    ];

    const initialState = {
        trophies
    };

    let saveTrophiesSpy;
    let deleteTrophySpy;

    beforeEach(() => {
        saveTrophiesSpy = jest.spyOn(api, 'saveTrophies');
        deleteTrophySpy = jest.spyOn(api, 'deleteTrophy');
    });

    describe('actions', () => {
        beforeEach(() => {
            saveTrophiesSpy.mockClear();
            deleteTrophySpy.mockClear();
        });

        it('should load predefined trophies if first time', async () => {
            jest.spyOn(api, 'fetchTrophies').mockImplementation(() =>
                Promise.resolve([])
            );
            const expected = [{id: '123456', title: 'First activity.'}];
            await loadTrophies();
            expect(useTrophiesStore.getState().trophies).toEqual(expected);
            expect(saveTrophiesSpy).toHaveBeenCalledWith(expected);
        });

        it('should load trophies', async () => {
            const trophy = {id: 'test'} as Trophy;
            jest.spyOn(api, 'fetchTrophies').mockImplementation(() =>
                Promise.resolve([trophy])
            );
            await loadTrophies();
            expect(useTrophiesStore.getState().trophies).toEqual([trophy]);
        });

        it('should add trophy', () => {
            useTrophiesStore.setState(initialState);
            const trophy: Trophy = {id: '2'} as Trophy;
            addTrophy(trophy);
            expect(useTrophiesStore.getState().trophies).toEqual([
                trophy,
                ...initialState.trophies
            ]);
            expect(saveTrophiesSpy).toHaveBeenCalled();
        });

        it('should update trophy', () => {
            useTrophiesStore.setState(initialState);
            const trophy: Trophy = {
                id: '1',
                activity: Activity.SWIMMING
            } as Trophy;
            updateTrophy(trophy);
            expect(useTrophiesStore.getState().trophies).toEqual([
                {...initialState.trophies[0], ...trophy}
            ]);
            expect(saveTrophiesSpy).toHaveBeenCalled();
        });

        it('should delete trophy', () => {
            useTrophiesStore.setState(initialState);
            deleteTrophy('1');
            expect(useTrophiesStore.getState().trophies).toEqual([]);
            expect(deleteTrophySpy).toHaveBeenCalled();
        });
    });

    describe('completed trophies', () => {
        beforeEach(() => {
            saveTrophiesSpy.mockClear();
            useTrophiesStore.setState({
                trophies: [
                    {
                        id: '1',
                        activity: Activity.RUNNING,
                        type: TrophyType.TOTAL,
                        entryIds: [],
                        distance: 0,
                        duration: 7200,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false
                    },
                    {
                        id: '2',
                        activity: Activity.RUNNING,
                        type: TrophyType.TOTAL,
                        entryIds: [],
                        distance: 20,
                        duration: 0,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false
                    },
                    {
                        id: '3',
                        activity: Activity.RUNNING,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: [],
                        distance: 15,
                        duration: 0,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false
                    },
                    {
                        id: '4',
                        activity: Activity.RUNNING,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: [],
                        distance: 0,
                        duration: 5000,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false
                    },
                    {
                        id: '5',
                        activity: Activity.RUNNING,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: [],
                        distance: 11,
                        duration: 3600,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false
                    }
                ] as unknown as Trophy[]
            });
        });

        afterEach(() => {
            expect(saveTrophiesSpy).toHaveBeenCalledTimes(1);
        });

        it('should update with individual distance', () => {
            useEntriesStore.setState({
                entries: [
                    {
                        id: '999',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 16,
                        duration: 0
                    },
                    {
                        id: '1000',
                        date: '2022-01-17',
                        activity: Activity.SWIMMING,
                        distance: 20,
                        duration: 0
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(
                useTrophiesStore
                    .getState()
                    .trophies.filter((trophy) => trophy.completed)
            ).toEqual([
                {
                    id: '3',
                    activity: Activity.RUNNING,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: ['999'],
                    distance: 15,
                    duration: 0,
                    completedAt: '2022-01-16',
                    completed: true,
                    markedAsRead: false
                }
            ]);
        });

        it('should update with individual duration', () => {
            useEntriesStore.setState({
                entries: [
                    {
                        id: '999',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 0,
                        duration: 5000
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(
                useTrophiesStore
                    .getState()
                    .trophies.filter((trophy) => trophy.completed)
            ).toEqual([
                {
                    id: '4',
                    activity: Activity.RUNNING,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: ['999'],
                    distance: 0,
                    duration: 5000,
                    completedAt: '2022-01-16',
                    completed: true,
                    markedAsRead: false
                }
            ]);
        });

        it('should update with individual pace', () => {
            useEntriesStore.setState({
                entries: [
                    {
                        id: '999',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 12,
                        duration: 3500
                    }
                ] as Entry[]
            });

            updateCompletedTrophies();
            expect(
                useTrophiesStore
                    .getState()
                    .trophies.filter((trophy) => trophy.completed)
            ).toEqual([
                {
                    id: '5',
                    activity: Activity.RUNNING,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: ['999'],
                    distance: 11,
                    duration: 3600,
                    completedAt: '2022-01-16',
                    completed: true,
                    markedAsRead: false
                }
            ]);
        });

        it('should update with total distance', () => {
            useEntriesStore.setState({
                entries: [
                    {
                        id: '999',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 10,
                        duration: 0
                    },
                    {
                        id: '1000',
                        date: '2022-01-17',
                        activity: Activity.RUNNING,
                        distance: 11,
                        duration: 0
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(
                useTrophiesStore
                    .getState()
                    .trophies.filter((trophy) => trophy.completed)
            ).toEqual([
                {
                    id: '2',
                    activity: Activity.RUNNING,
                    type: TrophyType.TOTAL,
                    entryIds: ['999', '1000'],
                    distance: 20,
                    duration: 0,
                    completedAt: '2022-01-17',
                    completed: true,
                    markedAsRead: false
                }
            ]);
        });

        it('should update with total duration', () => {
            useEntriesStore.setState({
                entries: [
                    {
                        id: '997',
                        date: '2022-01-15',
                        activity: Activity.RUNNING,
                        distance: 10,
                        duration: 4000
                    },
                    {
                        id: '998',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 0,
                        duration: 4000
                    },
                    {
                        id: '999',
                        date: '2022-01-17',
                        activity: Activity.RUNNING,
                        distance: 0,
                        duration: 1000
                    },
                    {
                        id: '1000',
                        date: '2022-01-17',
                        activity: Activity.SWIMMING,
                        distance: 11,
                        duration: 0
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(
                useTrophiesStore
                    .getState()
                    .trophies.filter((trophy) => trophy.completed)
            ).toEqual([
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    type: TrophyType.TOTAL,
                    entryIds: ['997', '998'],
                    distance: 0,
                    duration: 7200,
                    completedAt: '2022-01-16',
                    completed: true,
                    markedAsRead: false
                }
            ]);
        });

        it('should reset when no individual conditions met', () => {
            useTrophiesStore.setState({
                trophies: [
                    {
                        id: '1',
                        activity: Activity.RUNNING,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: ['999'],
                        distance: 20,
                        duration: 7200,
                        completedAt: '2022-01-16',
                        completed: true,
                        markedAsRead: true
                    },
                    {
                        id: '2',
                        activity: Activity.SWIMMING,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: ['1000'],
                        distance: 5,
                        duration: 0,
                        completedAt: '2022-01-16',
                        completed: true,
                        markedAsRead: false
                    }
                ] as Trophy[]
            });
            useEntriesStore.setState({
                entries: [
                    {
                        id: '999',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 19,
                        duration: 0
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(useTrophiesStore.getState().trophies).toEqual([
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: [],
                    distance: 20,
                    duration: 7200,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false
                },
                {
                    id: '2',
                    activity: Activity.SWIMMING,
                    type: TrophyType.INDIVIDUAL,
                    entryIds: [],
                    distance: 5,
                    duration: 0,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false
                }
            ]);
        });

        it('should reset when no total conditions met', () => {
            useTrophiesStore.setState({
                trophies: [
                    {
                        id: '1',
                        activity: Activity.RUNNING,
                        type: TrophyType.TOTAL,
                        entryIds: ['997', '998'],
                        distance: 0,
                        duration: 7200,
                        completedAt: '2022-01-16',
                        completed: true,
                        markedAsRead: true
                    },
                    {
                        id: '2',
                        activity: Activity.SWIMMING,
                        type: TrophyType.TOTAL,
                        entryIds: ['999', '1000'],
                        distance: 5,
                        duration: 0,
                        completedAt: '2022-01-16',
                        completed: true,
                        markedAsRead: true
                    }
                ] as Trophy[]
            });
            useEntriesStore.setState({
                entries: [
                    {
                        id: '998',
                        date: '2022-01-16',
                        activity: Activity.RUNNING,
                        distance: 0,
                        duration: 8000
                    },
                    {
                        id: '999',
                        date: '2022-01-17',
                        activity: Activity.SWIMMING,
                        distance: 1,
                        duration: 1000
                    },
                    {
                        id: '1000',
                        date: '2022-01-17',
                        activity: Activity.SWIMMING,
                        distance: 2,
                        duration: 0
                    }
                ] as Entry[]
            });
            updateCompletedTrophies();
            expect(useTrophiesStore.getState().trophies).toEqual([
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    type: TrophyType.TOTAL,
                    entryIds: ['998'],
                    distance: 0,
                    duration: 7200,
                    completedAt: '2022-01-16',
                    completed: true,
                    markedAsRead: true
                },
                {
                    id: '2',
                    activity: Activity.SWIMMING,
                    type: TrophyType.TOTAL,
                    entryIds: [],
                    distance: 5,
                    duration: 0,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false
                }
            ]);
        });
    });

    describe('selectors', () => {
        it('should get trophies filtered by activity', () => {
            expect(getTrophies(initialState, null)).toEqual(trophies);
            expect(getTrophies(initialState, Activity.RUNNING)).toEqual(
                trophies
            );
            expect(getTrophies(initialState, Activity.CYCLING)).toEqual([]);
            expect(getTrophies(initialState, Activity.SWIMMING)).toEqual([]);
        });

        it('should get trophies by state', () => {
            expect(getTrophiesByState(true)(initialState)).toEqual(
                initialState.trophies
            );
            expect(getTrophiesByState(false)(initialState)).toEqual([]);
        });

        it('should get individual trophies for entry', () => {
            const state: TrophiesState = {
                trophies: [
                    {
                        id: '100',
                        completed: true,
                        type: TrophyType.TOTAL,
                        entryIds: ['1', '2']
                    },
                    {
                        id: '101',
                        completed: true,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: ['1']
                    },
                    {
                        id: '102',
                        completed: false,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: []
                    }
                ] as Trophy[]
            };
            expect(getEntryTrophies('1', TrophyType.INDIVIDUAL)(state)).toEqual(
                [
                    {
                        id: '101',
                        completed: true,
                        type: TrophyType.INDIVIDUAL,
                        entryIds: ['1']
                    }
                ]
            );
            expect(getEntryTrophies('2', TrophyType.INDIVIDUAL)(state)).toEqual(
                []
            );
        });

        describe('settings filtering', () => {
            let state: TrophiesState;

            beforeEach(() => {
                state = {
                    trophies: [
                        {
                            id: '1',
                            activity: Activity.RUNNING,
                            type: TrophyType.INDIVIDUAL,
                            entryIds: ['20'],
                            distance: 5,
                            duration: 0,
                            completedAt: '2021-09-21',
                            completed: true,
                            markedAsRead: true
                        },
                        {
                            id: '2',
                            activity: Activity.RUNNING,
                            type: TrophyType.INDIVIDUAL,
                            entryIds: [],
                            distance: 20,
                            duration: 0,
                            completedAt: null,
                            completed: false,
                            markedAsRead: false
                        },
                        {
                            id: '3',
                            activity: Activity.RUNNING,
                            type: TrophyType.TOTAL,
                            entryIds: [],
                            distance: 0,
                            duration: 7200,
                            completedAt: null,
                            completed: false,
                            markedAsRead: false
                        },
                        {
                            id: '4',
                            activity: Activity.RUNNING,
                            type: TrophyType.TOTAL,
                            entryIds: ['20', '21', '22'],
                            distance: 20,
                            duration: 0,
                            completedAt: '2022-01-01',
                            completed: true,
                            markedAsRead: false
                        }
                    ] as unknown as Trophy[]
                };
            });

            const getIds = (trophy) => trophy.id;

            it('should skip filtering', () => {
                expect(
                    getFilteredTrophies({
                        stateFilter: TrophiesStateFilter.ALL,
                        typeFilter: TrophiesTypeFilter.ALL
                    })(state).map(getIds)
                ).toEqual(['1', '2', '3', '4']);
            });

            it('should filter by state', () => {
                expect(
                    getFilteredTrophies({
                        stateFilter: TrophiesStateFilter.PENDING,
                        typeFilter: TrophiesTypeFilter.ALL
                    })(state).map(getIds)
                ).toEqual(['2', '3']);
                expect(
                    getFilteredTrophies({
                        stateFilter: TrophiesStateFilter.COMPLETED,
                        typeFilter: TrophiesTypeFilter.ALL
                    })(state).map(getIds)
                ).toEqual(['1', '4']);
            });

            it('should filter by type', () => {
                expect(
                    getFilteredTrophies({
                        stateFilter: TrophiesStateFilter.ALL,
                        typeFilter: TrophiesTypeFilter.TOTAL
                    })(state).map(getIds)
                ).toEqual(['3', '4']);
                expect(
                    getFilteredTrophies({
                        stateFilter: TrophiesStateFilter.ALL,
                        typeFilter: TrophiesTypeFilter.INDIVIDUAL
                    })(state).map(getIds)
                ).toEqual(['1', '2']);
            });
        });
    });
});
