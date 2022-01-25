import React from 'react';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import RadioButton from '../ui/RadioButton';
import Panel from '../ui/Panel';
import Separator from '../ui/Separator';
import utils from '../../styles-utilities';
import {
    setTrophiesSettings,
    useTrophiesSettingsStore
} from '../../state/trophies-settings';
import {TrophiesStateFilter} from '../../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../../enums/TrophiesTypeFilter';

function TrophiesFilter() {
    const {settings} = useTrophiesSettingsStore();

    const updateStateFilter = (stateFilter: TrophiesStateFilter) =>
        setTrophiesSettings({...settings, stateFilter});

    const updateTypeFilter = (typeFilter: TrophiesTypeFilter) =>
        setTrophiesSettings({...settings, typeFilter});

    return (
        <Panel>
            <SecondaryHeader style={utils.marginBottomM}>
                Filter
            </SecondaryHeader>
            <SecondaryText>State:</SecondaryText>
            <RadioButton
                value={TrophiesStateFilter.ALL}
                selected={settings.stateFilter === TrophiesStateFilter.ALL}
                onPress={updateStateFilter}
            >
                All
            </RadioButton>
            <RadioButton
                value={TrophiesStateFilter.COMPLETED}
                selected={
                    settings.stateFilter === TrophiesStateFilter.COMPLETED
                }
                onPress={updateStateFilter}
            >
                Completed
            </RadioButton>
            <RadioButton
                value={TrophiesStateFilter.PENDING}
                selected={settings.stateFilter === TrophiesStateFilter.PENDING}
                onPress={updateStateFilter}
            >
                Pending
            </RadioButton>
            <Separator />
            <SecondaryText>Type:</SecondaryText>
            <RadioButton
                value={TrophiesTypeFilter.ALL}
                selected={settings.typeFilter === TrophiesTypeFilter.ALL}
                onPress={updateTypeFilter}
            >
                All
            </RadioButton>
            <RadioButton
                value={TrophiesTypeFilter.TOTAL}
                selected={settings.typeFilter === TrophiesTypeFilter.TOTAL}
                onPress={updateTypeFilter}
            >
                Total
            </RadioButton>
            <RadioButton
                value={TrophiesTypeFilter.INDIVIDUAL}
                selected={settings.typeFilter === TrophiesTypeFilter.INDIVIDUAL}
                onPress={updateTypeFilter}
            >
                Individual
            </RadioButton>
        </Panel>
    );
}

export default TrophiesFilter;
