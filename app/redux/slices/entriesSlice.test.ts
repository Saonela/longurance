import entriesReducer, {deleteEntry, saveEntry} from './entriesSlice';
import {Activity} from '../../types/Activity.enum';
import {Entry} from '../../types/Entry';

describe('EntriesReducer', () => {

    const state: any = {
        data: [
            {
                id: '1',
                activity: Activity.RUNNING,
                distance: 15,
                duration: 92,
                createdAt: '2021-01-01T00:00:00.00Z',
                date: '2021-01-07T09:10:02.207Z',
                energy: 2,
                note: 'Was really enjoying. Got into flow state.',
            }
        ]
    };

    it('should create entry', () => {
        expect(entriesReducer(state, saveEntry.fulfilled(
            {
                id: '2',
                activity: Activity.CYCLING,
                distance: 99,
                duration: 180,
                createdAt: '2021-01-01T00:00:00.00Z',
                date: '2021-01-01T00:10:02.207Z',
                energy: 0,
                note: '',
            }, '', {} as Entry
        ))).toEqual({
            data: [
                {
                    id: '2',
                    activity: Activity.CYCLING,
                    distance: 99,
                    duration: 180,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-01T00:10:02.207Z',
                    energy: 0,
                    note: '',
                },
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 15,
                    duration: 92,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-07T09:10:02.207Z',
                    energy: 2,
                    note: 'Was really enjoying. Got into flow state.',
                }
            ]});
    });

    it('should update entry', () => {
        expect(entriesReducer(state, saveEntry.fulfilled(
            {
                id: '1',
                activity: Activity.RUNNING,
                distance: 20,
                duration: 100,
                createdAt: '2021-01-01T00:00:00.00Z',
                date: '2021-01-07T09:10:02.207Z',
                energy: 2,
                note: 'Was really enjoying. Got into flow state. So updated.',
            }, '', {} as Entry
        ))).toEqual({
            data: [
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 20,
                    duration: 100,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-07T09:10:02.207Z',
                    energy: 2,
                    note: 'Was really enjoying. Got into flow state. So updated.',
                }
            ]});
    });

    it('should delete entry', () => {
        expect(entriesReducer(state, deleteEntry.fulfilled('1', '', '1'))).toEqual({data: []});
    });
});
