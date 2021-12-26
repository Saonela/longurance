import {setActivityFilter, useActivityFilterStore} from './activityFilter';
import {Activity} from '../types/Activity';
import * as api from '../lib/api';

jest.mock('../lib/storage');

describe('Activity filter state', () => {
    it('should set filter', () => {
        const saveFilterSpy = jest.spyOn(api, 'saveActivityFilter');
        setActivityFilter(Activity.CYCLING);
        expect(useActivityFilterStore.getState().filter).toBe(Activity.CYCLING);
        expect(saveFilterSpy).toHaveBeenCalled();
    });
});
