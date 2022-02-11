import {isTrophyValid} from './trophy-validator';
import {Activity} from '../enums/Activity';
import {Trophy} from '../types/Trophy';
import {TrophyType} from '../enums/TrophyType';

describe('Trophy validator', () => {
    it('should determine if trophy is valid', () => {
        expect(
            isTrophyValid({
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
            })
        ).toBe(true);
        expect(
            isTrophyValid({
                type: TrophyType.INDIVIDUAL,
                entryIds: ['11'],
                markedAsRead: false,
                predefined: false,
                title: 'My first half marathon !'
            } as unknown as Trophy)
        ).toBe(false);
        expect(
            isTrophyValid({
                id: '1',
                activity: 'SKIING',
                type: 'Custom',
                entryIds: ['11'],
                distance: 21,
                duration: 0,
                createdAt: '2021-01-07T09:10:02.207Z',
                completedAt: '2021-01-07T09:10:02.207Z',
                completed: true,
                markedAsRead: false,
                predefined: false,
                title: 'My first half marathon !'
            } as unknown as Trophy)
        ).toBe(false);
        expect(
            isTrophyValid({
                id: '1',
                activity: Activity.RUNNING,
                type: TrophyType.INDIVIDUAL,
                entryIds: ['11'],
                distance: 21,
                duration: 0,
                createdAt: '2021-01-07T09:10:02.207Z',
                completedAt: 'lsdjlk',
                completed: true,
                markedAsRead: false,
                predefined: false,
                title: 'My first half marathon !'
            } as unknown as Trophy)
        ).toBe(false);
    });
});
