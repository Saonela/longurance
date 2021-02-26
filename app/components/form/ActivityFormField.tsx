import React from 'react';
import {View} from 'react-native';
import {ActivityOptions} from '../../types/Activity';
import Dropdown from '../shared/Dropdown';
import FormLabel from './FormLabel';

const ActivityFormField = (props) => {
    return (
        <View style={props.style}>
            <FormLabel label="Activity"/>
            <Dropdown {...props} options={ActivityOptions}/>
        </View>
    );
}

export default ActivityFormField;
