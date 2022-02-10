import React from 'react';
import {View} from 'react-native';
import {Activity, ActivityOptions} from '../../types/Activity';
import Dropdown from '../ui/Dropdown';
import FormLabel from './FormLabel';

interface ActivityFormFieldProps {
    value: Activity;
    onChange: (value: Activity) => void;
}

function ActivityFormField({value, onChange}: ActivityFormFieldProps) {
    return (
        <View>
            <FormLabel>Activity</FormLabel>
            <Dropdown<Activity>
                value={value}
                onChange={onChange}
                options={ActivityOptions}
            />
        </View>
    );
}

export default ActivityFormField;
