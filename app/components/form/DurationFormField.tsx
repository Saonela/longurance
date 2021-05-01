import React from 'react';
import {View} from 'react-native';
import NumberInput from '../shared/NumberInput';
import FormLabel from './FormLabel';
import theme from '../../theme';
import UtilityService from '../../services/UtilityService';

interface DurationFormFieldProps {
    value: number,
    style: any,
    onChange: any
}

function DurationFormField({value, style = null, onChange}: DurationFormFieldProps) {

    const {hours, minutes, seconds} = UtilityService.splitSecondsIntoChunks(value);

    return (
        <View style={style}>
            <View style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
                <View style={{flexGrow: 1, paddingRight: theme.SPACING.L}}>
                    <FormLabel label="Hours"/>
                    <NumberInput value={hours}
                                 placeholder="HH"
                                 onChange={(value) => {
                                     value = UtilityService.convertToInt(value);
                                     value = UtilityService.convertHoursToSeconds(value) + UtilityService.convertMinutesToSeconds(minutes) + seconds;
                                     onChange(value);
                                 }}/>
                </View>
                <View style={{flexGrow: 1, paddingRight: theme.SPACING.L}}>
                    <FormLabel label="Minutes"/>
                    <NumberInput value={minutes}
                                 placeholder='MM'
                                 onChange={(value) => {
                                     value = UtilityService.convertToInt(value);
                                     value = UtilityService.convertHoursToSeconds(hours) + UtilityService.convertMinutesToSeconds(value) + seconds;
                                     onChange(value);
                                 }}/>
                </View>
                <View style={{flexGrow: 1}}>
                    <FormLabel label="Seconds"/>
                    <NumberInput value={seconds}
                                 placeholder='SS'
                                 onChange={(value) => {
                                     value = UtilityService.convertToInt(value);
                                     value = UtilityService.convertHoursToSeconds(hours) + UtilityService.convertMinutesToSeconds(minutes) + value;
                                     onChange(value);
                                 }}/>
                </View>
            </View>
        </View>
    );
}

export default DurationFormField;
