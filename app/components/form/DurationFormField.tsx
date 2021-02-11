import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import NumberInput from '../shared/NumberInput';
import FormLabel from './FormLabel';
import theme from '../../theme';

interface DurationFormFieldProps {
    value: any,
    style: any,
    onChange: any
}

function DurationFormField({value, style = null, onChange}: DurationFormFieldProps) {

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    useEffect(() => {
        if (typeof value === 'number') {
            setHours(Math.floor(value / 60));
            setMinutes(value % 60);
        } else {
            setHours(value ? value.hours : null);
            setMinutes(value ? value.minutes : null);
        }
    }, [value]);

    return (
        <View style={style}>
            <View style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
                <View style={{flexGrow: 1, paddingRight: theme.SPACING.L}}>
                    <FormLabel label="Hours"/>
                    <NumberInput value={hours}
                                 placeholder="HH"
                                 onChange={(value) => {
                                     value = parseInt(value, 10);
                                     setHours(value);
                                     onChange({
                                         hours: value,
                                         minutes: minutes
                                     })
                                 }}/>
                </View>
                <View style={{flexGrow: 1}}>
                    <FormLabel label="Minutes"/>
                    <NumberInput value={minutes}
                                 placeholder='MM'
                                 onChange={(value) => {
                                     value = parseInt(value, 10);
                                     setMinutes(value);
                                     onChange({
                                         hours: hours,
                                         minutes: value
                                     })
                                 }}/>
                </View>
            </View>
        </View>
    );
}

export default DurationFormField;
