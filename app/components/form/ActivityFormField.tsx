import React from 'react';
import {View} from 'react-native';
import {Activity} from '../../types/Activity.enum';
import Dropdown from '../shared/Dropdown';
import FormLabel from './FormLabel';

const activityOptions: {name: string, value: string}[] = [
    {name: 'Running', value: Activity.RUNNING},
    {name: 'Swimming', value: Activity.SWIMMING},
    {name: 'Cycling', value: Activity.CYCLING}
];

const ActivityFormField = (props) => {
    return (
        <View style={props.style}>
            <FormLabel label="Activity"/>
            <Dropdown {...props} options={activityOptions}/>
        </View>
    );
}

export default ActivityFormField;
