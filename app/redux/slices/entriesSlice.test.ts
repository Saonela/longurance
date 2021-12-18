import entriesReducer, {
    deleteEntry,
    getEntries,
    saveEntry
} from './entriesSlice';
import {Activity} from '../../types/Activity';
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
                effort: 2,
                note: 'Was really enjoying. Got into flow state.'
            }
        ]
    };

    it('should create entry', () => {
        expect(
            entriesReducer(
                state,
                saveEntry.fulfilled(
                    {
                        id: '2',
                        title: '',
                        activity: Activity.CYCLING,
                        distance: 99,
                        duration: 180,
                        createdAt: '2021-01-01T00:00:00.00Z',
                        date: '2021-01-01T00:10:02.207Z',
                        effort: 0,
                        note: ''
                    },
                    '',
                    {} as Entry
                )
            )
        ).toEqual({
            data: [
                {
                    id: '2',
                    title: '',
                    activity: Activity.CYCLING,
                    distance: 99,
                    duration: 180,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-01T00:10:02.207Z',
                    effort: 0,
                    note: ''
                },
                {
                    id: '1',
                    activity: Activity.RUNNING,
                    distance: 15,
                    duration: 92,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-07T09:10:02.207Z',
                    effort: 2,
                    note: 'Was really enjoying. Got into flow state.'
                }
            ]
        });
    });

    it('should update entry', () => {
        expect(
            entriesReducer(
                state,
                saveEntry.fulfilled(
                    {
                        id: '1',
                        title: '',
                        activity: Activity.RUNNING,
                        distance: 20,
                        duration: 100,
                        createdAt: '2021-01-01T00:00:00.00Z',
                        date: '2021-01-07T09:10:02.207Z',
                        effort: 2,
                        note: 'Was really enjoying. Got into flow state. So updated.'
                    },
                    '',
                    {} as Entry
                )
            )
        ).toEqual({
            data: [
                {
                    id: '1',
                    title: '',
                    activity: Activity.RUNNING,
                    distance: 20,
                    duration: 100,
                    createdAt: '2021-01-01T00:00:00.00Z',
                    date: '2021-01-07T09:10:02.207Z',
                    effort: 2,
                    note: 'Was really enjoying. Got into flow state. So updated.'
                }
            ]
        });
    });

    it('should delete entry', () => {
        expect(
            entriesReducer(state, deleteEntry.fulfilled('1', '', '1'))
        ).toEqual({data: []});
    });

    it('get entries', () => {
        expect(getEntries({entries: state, entriesFilter: null})).toEqual(
            state.data
        );
        expect(
            getEntries({entries: state, entriesFilter: Activity.RUNNING})
        ).toEqual(state.data);
        expect(
            getEntries({entries: state, entriesFilter: Activity.SWIMMING})
        ).toEqual([]);
        expect(
            getEntries({entries: state, entriesFilter: Activity.CYCLING})
        ).toEqual([]);
    });
});
