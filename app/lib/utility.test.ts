import {sortByDate} from './utility';

describe('Utility service', () => {
    it('should sort items by date', () => {
        const items = [
            {id: 3, date: '2020-01-01'},
            {id: 1, date: '2020-05-11'},
            {id: 2, date: '2020-02-16'}
        ];
        sortByDate(items, 'date');
        expect(items).toEqual([
            {id: 1, date: '2020-05-11'},
            {id: 2, date: '2020-02-16'},
            {id: 3, date: '2020-01-01'}
        ]);
    });
});
