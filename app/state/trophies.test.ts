/* eslint-disable no-global-assign */
import {Activity} from '../types/Activity';
import {
    addTrophy,
    deleteTrophy,
    getTrophies,
    loadTrophies,
    updateTrophy,
    useTrophiesStore
} from './trophies';
import * as api from '../lib/api';
import {Trophy, TrophyType} from '../types/Trophy';

jest.mock('../lib/storage');
jest.mock('../../assets/data/trophies.json', () => []);

describe('Trophies state', () => {
    const trophies: Trophy[] = [
        {
            id: '1',
            activity: Activity.RUNNING,
            type: TrophyType.INDIVIDUAL,
            entryId: '11',
            distance: 21,
            duration: 0,
            createdAt: '2021-01-07T09:10:02.207Z',
            completedAt: '2021-01-07T09:10:02.207Z',
            completed: true,
            markedAsRead: false,
            title: 'My first half marathon !'
        }
    ];

    const initialState = {
        trophies
    };

    describe('actions', () => {
        let saveTrophySpy;
        let deleteTrophySpy;

        beforeEach(() => {
            saveTrophySpy = jest.spyOn(api, 'saveTrophy');
            deleteTrophySpy = jest.spyOn(api, 'deleteTrophy');
            useTrophiesStore.setState(initialState);
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
            const trophy: Trophy = {id: '2'} as Trophy;
            addTrophy(trophy);
            expect(useTrophiesStore.getState().trophies).toEqual([
                trophy,
                ...initialState.trophies
            ]);
            expect(saveTrophySpy).toHaveBeenCalled();
        });

        it('should update trophy', () => {
            const trophy: Trophy = {
                id: '1',
                activity: Activity.SWIMMING
            } as Trophy;
            updateTrophy(trophy);
            expect(useTrophiesStore.getState().trophies).toEqual([
                {...initialState.trophies[0], ...trophy}
            ]);
            expect(saveTrophySpy).toHaveBeenCalled();
        });

        it('should delete trophy', () => {
            deleteTrophy('1');
            expect(useTrophiesStore.getState().trophies).toEqual([]);
            expect(deleteTrophySpy).toHaveBeenCalled();
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
    });
});
