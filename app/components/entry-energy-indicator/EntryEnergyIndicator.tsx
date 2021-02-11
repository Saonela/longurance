import React from 'react';
import {FontAwesome5} from '@expo/vector-icons';
import {EnergyIcons} from '../../types/Energy';

interface EntryEnergyIndicatorProps {
    value: number,
    activeValue?: number | null,
    size?: number,
    inactiveColor?: string,
    style?: any
}

function EntryEnergyIndicator({activeValue = null, value, size = 18, inactiveColor = '', style = null}: EntryEnergyIndicatorProps) {
    const icon = EnergyIcons[value];

    let color = icon.color;
    if (activeValue !== null && inactiveColor) {
        if (value === activeValue) {
            color = icon.color;
        } else {
            color = inactiveColor;
        }
    }

    return (
        <FontAwesome5 name={icon.name} size={size} color={color} style={style} />
    );
}

export default EntryEnergyIndicator;
