import React from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {ViewStyle} from 'react-native';
import {EffortIcons} from '../../types/Effort';
import theme from '../../theme';

interface EntryEffortIconProps {
    value: number;
    size: number;
    disabled?: boolean;
    style?: ViewStyle;
}

function EntryEffortIcon({value, size, disabled, style}: EntryEffortIconProps) {
    const {name, color} = EffortIcons[value];
    return (
        <FontAwesome5
            name={name}
            size={size}
            color={disabled ? theme.COLORS.FONT_SECONDARY : color}
            style={style}
        />
    );
}

export default EntryEffortIcon;
