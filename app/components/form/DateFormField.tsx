import React from 'react';
import {View} from 'react-native';
import DatePicker from '../ui/DatePicker';
import FormLabel from './FormLabel';

interface DateFormFieldProps {
    value: string;
    onChange: (value: Date) => void;
}

function DateFormField({value, onChange}: DateFormFieldProps) {
    return (
        <View>
            <FormLabel>Date</FormLabel>
            <DatePicker value={value} onChange={onChange} />
        </View>
    );
}

export default DateFormField;
