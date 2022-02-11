import {Entry} from '../types/Entry';
import {Activity} from '../enums/Activity';
import {isEntryValid} from './entry-validator';

describe('Entry validator', () => {
    it('should determine if entry is valid', () => {
        expect(
            isEntryValid({
                id: '1',
                createdAt: '2021-01-01T00:00:00.00Z',
                activity: Activity.RUNNING,
                distance: 15,
                duration: 92,
                date: '2021-01-07T09:10:02.207Z',
                effort: 2,
                note: 'Was really enjoying. Got into flow state.',
                title: 'First run.'
            })
        ).toBe(true);
        expect(
            isEntryValid({
                id: '1',
                createdAt: '2021-01-01T00:00:00.00Z',
                activity: Activity.RUNNING,
                distance: '15',
                duration: '92',
                date: '2021-01-07T09:10:02.207Z',
                effort: '2',
                note: 'Was really enjoying. Got into flow state.',
                title: 'First run.'
            } as unknown as Entry)
        ).toBe(false);
        expect(
            isEntryValid({
                createdAt: '2021-01-01T00:00:00.00Z',
                activity: Activity.RUNNING,
                note: 'Was really enjoying. Got into flow state.',
                title: 'First run.'
            } as unknown as Entry)
        ).toBe(false);
        expect(
            isEntryValid({
                id: '1',
                createdAt: '2021-01-01T00:00:00.00Z',
                activity: 'SKIING',
                distance: 15,
                duration: 92,
                date: '2021-01-07T09:10:02.207Z',
                effort: 2,
                note: 'Was really enjoying. Got into flow state.',
                title: 'First run.'
            } as unknown as Entry)
        ).toBe(false);
    });
});
