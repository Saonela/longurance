import React from 'react';
import {View, ViewStyle} from 'react-native';
import SelectionButtons from '../shared/SelectionButtons';
import utils from '../../styles-utilities';
import {TrophySubtype, TrophyType} from '../../types/Trophy';
import {TrophiesTimelineFilter} from '../../types/TrophiesTimelineFilter';

const totalTrophyTypeOptions = [
    {
        label: 'Distance',
        value: TrophySubtype.DISTANCE
    },
    {
        label: 'Duration',
        value: TrophySubtype.DURATION
    }
];

const individualTrophyTypeOptions = [
    {
        label: 'Distance',
        value: TrophySubtype.DISTANCE
    },
    {
        label: 'Duration',
        value: TrophySubtype.DURATION
    },
    {
        label: 'Pace',
        value: TrophySubtype.PACE
    }
];

const trophyTypeOptions = {
    [TrophyType.TOTAL]: totalTrophyTypeOptions,
    [TrophyType.INDIVIDUAL]: individualTrophyTypeOptions
};

const trophyTypes = [
    {label: 'Total', value: TrophyType.TOTAL},
    {label: 'Individual', value: TrophyType.INDIVIDUAL}
];

interface TrophiesTimelineControlsProps {
    trophiesTimelineFilter: TrophiesTimelineFilter;
    style?: ViewStyle;
    onChange: (timelineFilter: TrophiesTimelineFilter) => void;
}

function TrophiesTimelineControls({
    trophiesTimelineFilter,
    style,
    onChange
}: TrophiesTimelineControlsProps) {
    function emitChange(type: TrophyType, subtype: TrophySubtype) {
        if (type === TrophyType.TOTAL && subtype === TrophySubtype.PACE) {
            onChange({type, subtype: TrophySubtype.DISTANCE});
        } else {
            onChange({type, subtype});
        }
    }

    return (
        <View style={style}>
            <SelectionButtons
                selected={trophiesTimelineFilter.type}
                items={trophyTypes}
                style={[utils.marginBottomS]}
                onChange={(group) =>
                    emitChange(group, trophiesTimelineFilter.subtype)
                }
            />
            <SelectionButtons
                selected={trophiesTimelineFilter.subtype}
                items={trophyTypeOptions[trophiesTimelineFilter.type]}
                style={[utils.marginBottomXL]}
                onChange={(subtype) =>
                    emitChange(trophiesTimelineFilter.type, subtype)
                }
            />
        </View>
    );
}

export default TrophiesTimelineControls;
