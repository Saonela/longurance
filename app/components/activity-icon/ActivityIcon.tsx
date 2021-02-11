import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {Activity} from '../../types/Activity.enum';

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle',
}

function ActivityIcon({activity, style}) {
    return (
        <FontAwesome5 name={activityIconNames[activity]} size={18} style={style} color={style.color} />
    );
}

export default ActivityIcon;
