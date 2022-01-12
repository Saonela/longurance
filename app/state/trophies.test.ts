/* eslint-disable no-global-assign */
import {Activity} from '../types/Activity';
import {getTrophies, loadTrophies, useTrophiesStore} from './trophies';
import * as api from '../lib/api';
import {Trophy} from '../types/Trophy';

jest.mock('../lib/storage');
jest.mock('../../assets/data/trophies.json', () => []);

describe('Trophies state', () => {
    const trophies = [
        {
            id: '1',
            activity: Activity.RUNNING,
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
        beforeEach(() => {
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
