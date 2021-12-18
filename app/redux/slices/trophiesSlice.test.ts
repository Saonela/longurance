import {Activity} from '../../types/Activity';
import trophiesReducer, {
    deleteTrophy,
    getFilteredCompletedTrophies,
    getTrophies,
    getTrophiesByEntry,
    saveEntryTrophies,
    saveTrophy
} from './trophiesSlice';
import {Trophy} from '../../types/Trophy';
import {Entry} from '../../types/Entry';
import {Dispatch} from '@reduxjs/toolkit';
import StorageService from '../../services/StorageService';

jest.mock('../../services/StorageService', () => ({
    saveTrophy: () => Promise.resolve(),
    saveTrophies: () => Promise.resolve()
}));

describe('TrophiesReducer', () => {
    const getTrophy = () => {
        return {
            id: '1',
            activity: Activity.RUNNING,
            distance: 21,
            duration: 120,
            completedAt: null,
            completed: false,
            markedAsRead: false,
            title: 'My first half marathon !'
        };
    };

    const getEntry = () => {
        return {
            id: '2',
            activity: Activity.RUNNING,
            distance: 4,
            duration: 180,
            createdAt: '2021-01-01T00:00:00.00Z',
            date: '2021-01-01T00:10:02.207Z',
            energy: 0,
            title: '',
            note: ''
        };
    };

    const state: any = {
        data: [getTrophy()]
    };

    let dispatch: Dispatch;
    let saveTrophySpy;
    let saveTrophiesSpy;

    const mockDate: any = new Date('2020-09-01');
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

    beforeEach(() => {
        dispatch = jest.fn();
        saveTrophySpy = spyOn(StorageService, 'saveTrophy').and.returnValue(
            Promise.resolve()
        );
        saveTrophiesSpy = spyOn(StorageService, 'saveTrophies').and.returnValue(
            Promise.resolve()
        );
    });

    describe('trophy selectors', () => {
        it('should get trophies', () => {
            expect(getTrophies({trophies: state})).toEqual(state.data);
        });

        it('should get trophies by entry', () => {
            const entry = {id: '2'} as Entry;
            const entryTrophy = Object.assign(getTrophy(), {entryId: '2'});
            const state: any = {
                trophies: {
                    data: [Object.assign(getTrophy(), {id: '11'}), entryTrophy]
                }
            };
            expect(getTrophiesByEntry(state, entry)).toEqual([entryTrophy]);
        });

        it('should get completed trophies by filter', () => {
            const state: any = {
                trophies: {
                    data: [
                        {id: '1', completed: true, activity: Activity.RUNNING},
                        {id: '2', completed: true, activity: Activity.CYCLING},
                        {id: '3', completed: false, activity: Activity.CYCLING},
                        {id: '4', completed: true, activity: Activity.RUNNING},
                        {id: '5', completed: false, activity: Activity.RUNNING},
                        {id: '6', completed: true, activity: Activity.SWIMMING}
                    ]
                },
                entriesFilter: null
            };
            expect(getFilteredCompletedTrophies(state)).toEqual([
                {id: '1', completed: true, activity: Activity.RUNNING},
                {id: '2', completed: true, activity: Activity.CYCLING},
                {id: '4', completed: true, activity: Activity.RUNNING},
                {id: '6', completed: true, activity: Activity.SWIMMING}
            ]);
            expect(
                getFilteredCompletedTrophies(
                    Object.assign(state, {entriesFilter: Activity.RUNNING})
                )
            ).toEqual([
                {id: '1', completed: true, activity: Activity.RUNNING},
                {id: '4', completed: true, activity: Activity.RUNNING}
            ]);
            expect(
                getFilteredCompletedTrophies(
                    Object.assign(state, {entriesFilter: Activity.SWIMMING})
                )
            ).toEqual([
                {id: '6', completed: true, activity: Activity.SWIMMING}
            ]);
            expect(
                getFilteredCompletedTrophies(
                    Object.assign(state, {entriesFilter: Activity.CYCLING})
                )
            ).toEqual([{id: '2', completed: true, activity: Activity.CYCLING}]);
        });
    });

    describe('basic trophy actions', () => {
        it('should create trophy', () => {
            expect(
                trophiesReducer(
                    state,
                    saveTrophy.fulfilled(
                        {
                            id: '2',
                            activity: Activity.CYCLING,
                            distance: 100,
                            duration: 180,
                            completedAt: '2021-01-07T09:10:02.207Z',
                            completed: true,
                            title: 'Sweet 100.'
                        } as Trophy,
                        '',
                        {} as Trophy
                    )
                )
            ).toEqual({
                data: [
                    {
                        id: '2',
                        activity: Activity.CYCLING,
                        distance: 100,
                        duration: 180,
                        completedAt: '2021-01-07T09:10:02.207Z',
                        completed: true,
                        title: 'Sweet 100.'
                    },
                    {
                        id: '1',
                        activity: Activity.RUNNING,
                        distance: 21,
                        duration: 120,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false,
                        title: 'My first half marathon !'
                    }
                ]
            });
        });

        it('should update trophy', () => {
            expect(
                trophiesReducer(
                    state,
                    saveTrophy.fulfilled(
                        {
                            id: '1',
                            activity: Activity.RUNNING,
                            distance: 42,
                            duration: 240,
                            completedAt: null,
                            completed: false,
                            title: 'Actually its a marathon !'
                        } as Trophy,
                        '',
                        {} as Trophy
                    )
                )
            ).toEqual({
                data: [
                    {
                        id: '1',
                        activity: Activity.RUNNING,
                        distance: 42,
                        duration: 240,
                        completedAt: null,
                        completed: false,
                        markedAsRead: false,
                        title: 'Actually its a marathon !'
                    }
                ]
            });
        });

        it('should delete trophy', () => {
            expect(
                trophiesReducer(state, deleteTrophy.fulfilled('1', '', '1'))
            ).toEqual({data: []});
        });
    });

    describe('trophies completion check by entry', () => {
        let thunkFunc;
        let action;

        afterEach(() => {
            thunkFunc = null;
            action = null;
        });

        it('should update state after check', () => {
            const completedTrophies = [
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 21,
                    duration: 120,
                    completedAt: '2020-09-01T00:00:00.000Z',
                    completed: true,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                    entryId: '2'
                }
            ];
            expect(
                trophiesReducer(
                    state,
                    saveEntryTrophies.fulfilled(
                        completedTrophies,
                        '',
                        {} as Entry
                    )
                )
            ).toEqual({
                data: completedTrophies
            });
        });

        it('should check if distance and duration trophy is completed', async () => {
            const appState = {
                trophies: {
                    data: [getTrophy()]
                }
            };

            thunkFunc = saveEntryTrophies(getEntry());
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).not.toHaveBeenCalled();

            thunkFunc = saveEntryTrophies(
                Object.assign(getEntry(), {distance: 22})
            );
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).not.toHaveBeenCalled();

            thunkFunc = saveEntryTrophies(
                Object.assign(getEntry(), {duration: 120})
            );
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).not.toHaveBeenCalled();

            const result = [
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 21,
                    duration: 120,
                    completedAt: '2020-09-01T00:00:00.000Z',
                    completed: true,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                    entryId: '2'
                }
            ];
            thunkFunc = saveEntryTrophies(
                Object.assign(getEntry(), {distance: 22, duration: 120})
            );
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).toHaveBeenCalledWith(result);
            expect(action.payload).toEqual(result);
        });

        it('should check if distance trophy is completed', async () => {
            const appState = {
                trophies: {
                    data: [Object.assign(getTrophy(), {duration: null})]
                }
            };

            thunkFunc = saveEntryTrophies(getEntry());
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).not.toHaveBeenCalled();

            thunkFunc = saveEntryTrophies(
                Object.assign(getEntry(), {distance: 50})
            );
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).toHaveBeenCalledWith([
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 21,
                    duration: null,
                    completedAt: '2020-09-01T00:00:00.000Z',
                    completed: true,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                    entryId: '2'
                }
            ]);
        });

        it('should check if duration trophy is completed', async () => {
            const appState = {
                trophies: {
                    data: [Object.assign(getTrophy(), {distance: null})]
                }
            };

            thunkFunc = saveEntryTrophies(getEntry());
            action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).toHaveBeenCalledWith([
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: null,
                    duration: 120,
                    completedAt: '2020-09-01T00:00:00.000Z',
                    completed: true,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                    entryId: '2'
                }
            ]);
        });
    });

    describe('trophies un-completion check by entry', () => {
        const entryForCompletedTrophy = Object.assign(getEntry(), {
            distance: 20,
            duration: 120
        });
        let thunkFunc;

        afterEach(() => {
            thunkFunc = null;
        });

        it('should check if entry no longer completes trophies', async () => {
            const appState = {
                trophies: {
                    data: [
                        Object.assign(getTrophy(), {
                            entryId: entryForCompletedTrophy.id,
                            completedAt: entryForCompletedTrophy.createdAt,
                            completed: true,
                            markedAsRead: true
                        })
                    ]
                }
            };

            const result = [
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 21,
                    duration: 120,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                    entryId: null
                }
            ];
            thunkFunc = saveEntryTrophies(entryForCompletedTrophy);
            const action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophiesSpy).toHaveBeenCalledWith(result);
            expect(action.payload).toEqual(result);
        });
    });

    describe('trophy completion check by trophy', () => {
        const appState = {
            trophies: {
                data: []
            },
            entries: {
                data: [
                    {
                        id: '2',
                        activity: Activity.RUNNING,
                        distance: 21,
                        duration: 119,
                        createdAt: '2021-01-01T00:00:00.00Z'
                    }
                ] as Entry[]
            }
        };

        it('should not set new trophy as completed', async () => {
            const newTrophy: Trophy = {
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                duration: 100
            } as Trophy;

            const thunkFunc = saveTrophy(newTrophy);
            await thunkFunc(dispatch, () => appState, undefined);

            expect(saveTrophySpy).toHaveBeenCalledWith(newTrophy);
        });

        it('should set new trophy as already completed', async () => {
            const newTrophy: Trophy = {
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                duration: 120
            } as Trophy;

            const result = {
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                duration: 120,
                entryId: '2',
                completedAt: '2020-09-01T00:00:00.000Z',
                completed: true
            };
            const thunkFunc = saveTrophy(newTrophy);
            const action = await thunkFunc(dispatch, () => appState, undefined);
            expect(saveTrophySpy).toHaveBeenCalledWith(result);
            expect(action.payload).toEqual(result);
        });
    });

    describe('trophies un-completion check by trophy', () => {
        const completedTrophy: Trophy = {
            id: '1',
            activity: Activity.RUNNING,
            distance: 21,
            duration: 90,
            entryId: '2',
            completed: true,
            completedAt: '2020-09-01T00:00:00.000Z',
            markedAsRead: true
        } as Trophy;

        let thunkFunc;

        afterEach(() => {
            thunkFunc = null;
        });

        it('should check if trophy no longer completed', async () => {
            const appState = {
                entries: {
                    data: [
                        {
                            id: '2',
                            activity: Activity.RUNNING,
                            distance: 21,
                            duration: 119,
                            createdAt: '2021-01-01T00:00:00.00Z'
                        }
                    ] as Entry[]
                }
            };

            const thunkFunc = saveTrophy(completedTrophy);
            await thunkFunc(dispatch, () => appState, undefined);

            expect(saveTrophySpy).toHaveBeenCalledWith({
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                duration: 90,
                entryId: null,
                completedAt: null,
                completed: false,
                markedAsRead: false
            });
        });
    });
});
