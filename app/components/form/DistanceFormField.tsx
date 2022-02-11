import React from 'react';
import {View} from 'react-native';
import NumberInput from '../ui/NumberInput';
import FormLabel from './FormLabel';

interface DistanceFormFieldProps {
    value: number | string;
    onChange: (value: string) => void;
}

function DistanceFormField({value, onChange}: DistanceFormFieldProps) {
    return (
        <View>
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
