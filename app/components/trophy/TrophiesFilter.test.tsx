import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import * as store from '../../state/trophies-settings';
import {useTrophiesSettingsStore} from '../../state/trophies-settings';
import TrophiesFilter from './TrophiesFilter';
import {TrophiesStateFilter} from '../../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../../enums/TrophiesTypeFilter';

describe('TrophyFilters', () => {
    beforeEach(() => {
        useTrophiesSettingsStore.setState({
            settings: {
                stateFilter: TrophiesStateFilter.PENDING,
                typeFilter: TrophiesTypeFilter.INDIVIDUAL
            }
        });
    });

    it('should display trophy sort settings', () => {
        const {getByA11yLabel} = render(<TrophiesFilter />);
        expect(
            getByA11yLabel('Pending').props.accessibilityState.checked
        ).toBeTruthy();
        expect(
            getByA11yLabel('Individual').props.accessibilityState.checked
        ).toBeTruthy();
    });

    it('should update trophies sort settings', async () => {
        const spy = jest.spyOn(store, 'setTrophiesSettings');
        const {getByText} = render(<TrophiesFilter />);
        fireEvent.press(getByText('Completed'));
        fireEvent.press(getByText('Total'));
        expect(spy).toHaveBeenCalledWith({
            stateFilter: TrophiesStateFilter.COMPLETED,
            typeFilter: TrophiesTypeFilter.TOTAL
        });
    });
});
