import React from 'react';
import {View} from 'react-native';
import NumberInput from '../ui/NumberInput';
import FormLabel from './FormLabel';

interface DistanceFormFieldProps {
    value: number;
    style?: any;
    onChange: any;
}

function DistanceFormField({
    value,
    style = null,
    onChange
}: DistanceFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel>Distance (km)</FormLabel>
            <NumberInput
                float
                placeholder="Km"
                value={value}
                onChange={onChange}
            />
        </View>
    );
}

export default DistanceFormField;
