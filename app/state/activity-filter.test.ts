import {
    loadActivityFilter,
    setActivityFilter,
    useActivityFilterStore
} from './activity-filter';
import {Activity} from '../enums/Activity';
import * as api from '../lib/api';

jest.mock('../lib/storage');

describe('Activity filter state', () => {
    it('should load filter', async () => {
        jest.spyOn(api, 'fetchActivityFilter').mockImplementation(() =>
            Promise.resolve(Activity.RUNNING)
        );
        await loadActivityFilter();
        expect(useActivityFilterStore.getState().filter).toEqual(
            Activity.RUNNING
        );
    });

    it('should set filter', () => {
        const saveFilterSpy = jest.spyOn(api, 'saveActivityFilter');
        setActivityFilter(Activity.CYCLING);
        expect(useActivityFilterStore.getState().filter).toBe(Activity.CYCLING);
        expect(saveFilterSpy).toHaveBeenCalled();
    });
});
