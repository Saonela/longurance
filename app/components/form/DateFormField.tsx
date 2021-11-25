import React from 'react';
import {View} from 'react-native';
import DatePicker from '../shared/DatePicker';
import FormLabel from './FormLabel';

interface DateFormFieldProps {
    value: any,
    style?: any,
    onChange: any
}

function DateFormField({value, style = null, onChange}: DateFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel>Date</FormLabel>
            <DatePicker value={value} onChange={onChange}/>
        </View>
    );
}

export default DateFormField;
