import {Activity} from '../../types/Activity';
import trophiesReducer, {deleteTrophy, getTrophies, saveTrophy} from './trophiesSlice';
import {Trophy} from '../../types/Trophy';
import {saveEntry} from './entriesSlice';
import {Entry} from '../../types/Entry';

describe('TrophiesReducer', () => {

    const state: any = {
        data: [
            {
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                completedAt: null,
                completed: false,
                markedAsRead: false,
                title: 'My first half marathon !',
            }
        ]
    };

    it('should create trophy', () => {
        expect(trophiesReducer(state, saveTrophy.fulfilled(
            {
                id: '2',
                activity: Activity.CYCLING,
                distance: 100,
                duration: 180,
                completedAt: '2021-01-07T09:10:02.207Z',
                completed: true,
                title: 'Sweet 100.',
            } as Trophy, '', {} as Trophy
        ))).toEqual({
            data: [
                {
                    id: '2',
                    activity: Activity.CYCLING,
                    distance: 100,
                    duration: 180,
                    completedAt: '2021-01-07T09:10:02.207Z',
                    completed: true,
                    title: 'Sweet 100.',
                },
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 21,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false,
                    title: 'My first half marathon !',
                }
            ]});
    });

    it('should update trophy', () => {
        expect(trophiesReducer(state, saveTrophy.fulfilled(
            {
                id: '1',
                activity: Activity.RUNNING,
                distance: 42,
                completedAt: null,
                completed: false,
                title: 'Actually its a marathon !',
            } as Trophy, '', {} as Trophy
        ))).toEqual({
            data: [
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 42,
                    completedAt: null,
                    completed: false,
                    markedAsRead: false,
                    title: 'Actually its a marathon !',
                }
            ]});
    });

    it('should delete trophy', () => {
        expect(trophiesReducer(state, deleteTrophy.fulfilled('1', '', '1'))).toEqual({data: []});
    });

    it('should check if any of trophies are completed', () => {
        expect(trophiesReducer(state, saveEntry.fulfilled(
            {
                id: '2',
                activity: Activity.RUNNING,
                distance: 4,
                duration: 180,
                createdAt: '2021-01-01T00:00:00.00Z',
                date: '2021-01-01T00:10:02.207Z',
                energy: 0,
                title: '',
                note: '',
            }, '', {} as Entry
        ))).toEqual(state);
        expect(trophiesReducer(state, saveEntry.fulfilled(
            {
                id: '2',
                activity: Activity.RUNNING,
                distance: 22,
                duration: 180,
                createdAt: '2021-01-01T00:00:00.00Z',
                date: '2021-01-01T00:10:02.207Z',
                energy: 0,
                title: '',
                note: '',
            }, '', {} as Entry
        ))).toEqual({data: [
            {
                id: '1',
                activity: Activity.RUNNING,
                distance: 21,
                completedAt: '2021-01-01T00:00:00.00Z',
                completed: true,
                markedAsRead: false,
                title: 'My first half marathon !',
                entryId: '2'
            }
        ]});
    });

    it('get trophies', () => {
        expect(getTrophies({trophies: state})).toEqual(state.data);
    });
});
