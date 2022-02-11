import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import EntriesFilter from './EntriesFilter';
import {useEntriesSettingsStore} from '../../state/entries-settings';
import * as store from '../../state/entries-settings';
import {SortDirection} from '../../enums/SortDirection';
import {EntriesSortBy} from '../../enums/EntriesSortBy';

describe('EntryFilters', () => {
    beforeEach(() => {
        useEntriesSettingsStore.setState({
            settings: {
                sortBy: EntriesSortBy.DATE,
                sortDirection: SortDirection.ASCENDING
            }
        });
    });

    it('should display entry sort settings', () => {
        const {getByA11yLabel} = render(<EntriesFilter />);
        expect(
            getByA11yLabel('Ascending').props.accessibilityState.checked
        ).toBeTruthy();
        expect(
            getByA11yLabel('Date').props.accessibilityState.checked
        ).toBeTruthy();
    });

    it('should update entry sort settings', async () => {
        const spy = jest.spyOn(store, 'setEntriesSettings');
        const {getByText} = render(<EntriesFilter />);
        fireEvent.press(getByText('Descending'));
        fireEvent.press(getByText('Pace'));
        expect(spy).toHaveBeenCalledWith({
            sortBy: EntriesSortBy.PACE,
            sortDirection: SortDirection.DESCENDING
        });
    });
});
