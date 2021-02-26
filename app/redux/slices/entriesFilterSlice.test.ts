import entriesFilterReducer, {setEntriesFilter} from './entriesFilterSlice';
import {Activity} from '../../types/Activity';

describe('EntriesFilterReducer', () => {
    const state = null;

    it('should set entries filter', () => {
        expect(entriesFilterReducer(state, setEntriesFilter(Activity.RUNNING))).toEqual(Activity.RUNNING);
    });

});
