import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {Activity} from '../../types/Activity';

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle',
}

function ActivityIcon({activity, style, size = 18}) {
    return (
        <FontAwesome5 name={activityIconNames[activity]} size={size} style={style} color={style.color} />
    );
}

export default ActivityIcon;
