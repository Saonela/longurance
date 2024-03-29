import {getEntriesFieldValues, getPaceText, sortEntryList} from './entry';
import {Entry} from '../types/Entry';
import {Activity} from '../enums/Activity';

describe('Entry service', () => {
    it('should get pace text', () => {
        expect(getPaceText(0, 0)).toEqual('0\'00"');
        expect(getPaceText(1800, 5)).toEqual('6\'00"');
        expect(getPaceText(1800, 7)).toEqual('4\'17"');
    });

    it('should get entries field values', () => {
        const entries: Entry[] = [
            {
                id: '3',
                activity: Activity.CYCLING,
                distance: 50,
                duration: 7200,
                date: '2021-09-01T09:10:02.207Z',
                effort: 5
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
                id: '1',
                activity: Activity.RUNNING,
                distance: 10,
                duration: 3600,
                date: '2021-04-07T09:10:02.207Z',
                effort: 3
            }
        ] as Entry[];
        expect(getEntriesFieldValues(entries)).toEqual({
            distance: [50, 2, 10],
            duration: [7200, 3600, 3600],
            intensity: [5, 1, 3],
            pace: [144, 1800, 360]
        });
    });

    it('should sort entry list by date', () => {
        const entries: Entry[] = [
            {id: '1', date: '2021-01-07'},
            {id: '2', date: '2021-01-10'},
            {id: '3', date: '2020-12-23'}
        ] as Entry[];
        expect(sortEntryList(entries)).toEqual([
            {id: '2', date: '2021-01-10'},
            {id: '1', date: '2021-01-07'},
            {id: '3', date: '2020-12-23'}
        ]);
    });
});
