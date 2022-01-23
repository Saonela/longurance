import React, {useEffect} from 'react';
import {View} from 'react-native';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import RadioButton from '../ui/RadioButton';
import Panel from '../ui/Panel';
import Separator from '../ui/Separator';
import utils from '../../styles-utilities';
import {SortDirection} from '../../enums/SortDirection';
import {
    setEntriesSettings,
    useEntriesSettingsStore
} from '../../state/entries-settings';
import {EntriesSortBy} from '../../enums/EntriesSortBy';

function EntryFilters() {
    const {settings} = useEntriesSettingsStore();

    const updateSortDirection = (sortDirection: SortDirection) =>
        setEntriesSettings({...settings, sortDirection});

    const updateSortBy = (sortBy: EntriesSortBy) =>
        setEntriesSettings({...settings, sortBy});

    return (
        <Panel>
            <View>
                <SecondaryHeader style={utils.marginBottomM}>
                    Sort
                </SecondaryHeader>
                <SecondaryText>Direction:</SecondaryText>
                <RadioButton
                    value={SortDirection.ASCENDING}
                    selected={
                        settings.sortDirection === SortDirection.ASCENDING
                    }
                    onPress={updateSortDirection}
                >
                    Ascending
                </RadioButton>
                <RadioButton
                    value={SortDirection.DESCENDING}
                    selected={
                        settings.sortDirection === SortDirection.DESCENDING
                    }
                    onPress={updateSortDirection}
                >
                    Descending
                </RadioButton>
            </View>
            <Separator />
            <View>
                <SecondaryText>By:</SecondaryText>
                <RadioButton
                    value={EntriesSortBy.DATE}
                    selected={settings.sortBy === EntriesSortBy.DATE}
                    onPress={updateSortBy}
                >
                    Date
                </RadioButton>
                <RadioButton
                    value={EntriesSortBy.DISTANCE}
                    selected={settings.sortBy === EntriesSortBy.DISTANCE}
                    onPress={updateSortBy}
                >
                    Distance
                </RadioButton>
                <RadioButton
                    value={EntriesSortBy.DURATION}
                    selected={settings.sortBy === EntriesSortBy.DURATION}
                    onPress={updateSortBy}
                >
                    Duration
                </RadioButton>
                <RadioButton
                    value={EntriesSortBy.PACE}
                    selected={settings.sortBy === EntriesSortBy.PACE}
                    onPress={updateSortBy}
                >
                    Pace
                </RadioButton>
                <RadioButton
                    value={EntriesSortBy.EFFORT}
                    selected={settings.sortBy === EntriesSortBy.EFFORT}
                    onPress={updateSortBy}
                >
                    Effort
                </RadioButton>
            </View>
        </Panel>
    );
}

export default EntryFilters;
