import React from 'react';
import {View} from 'react-native';
import NumberInput from '../shared/NumberInput';
import FormLabel from './FormLabel';

interface DistanceFormFieldProps {
    value: number,
    style: any,
    onChange: any
}

function DistanceFormField({value, style = null, onChange}: DistanceFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel label="Distance (km)"/>
            <NumberInput value={value} placeholder="Km" float={true} onChange={(value) => onChange(value)}/>
        </View>
    );
}

export default DistanceFormField;
