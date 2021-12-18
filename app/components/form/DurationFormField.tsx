import React from 'react';
import {View} from 'react-native';
import NumberInput from '../shared/NumberInput';
import FormLabel from './FormLabel';
import theme from '../../theme';
import {
    convertHoursToSeconds,
    convertMinutesToSeconds,
    convertToInt,
    splitSecondsIntoChunks
} from '../../lib/utility';

interface DurationFormFieldProps {
    value: number;
    style?: any;
    onChange: any;
}

function DurationFormField({
    value,
    style = null,
    onChange
}: DurationFormFieldProps) {
    const {hours, minutes, seconds} = splitSecondsIntoChunks(value);

    return (
        <View style={style}>
            <View style={{display: 'flex', flexDirection: 'row', flexGrow: 1}}>
                <View style={{flexGrow: 1, paddingRight: theme.SPACING.L}}>
                    <FormLabel>Hours</FormLabel>
                    <NumberInput
                        value={hours}
                        placeholder="HH"
                        onChange={(value) => {
                            value = convertToInt(value);
                            value =
                                convertHoursToSeconds(value) +
                                convertMinutesToSeconds(minutes) +
                                seconds;
                            onChange(value);
                        }}
                    />
                </View>
                <View style={{flexGrow: 1, paddingRight: theme.SPACING.L}}>
                    <FormLabel>Minutes</FormLabel>
                    <NumberInput
                        value={minutes}
                        placeholder="MM"
                        onChange={(value) => {
                            value = convertToInt(value);
                            value =
                                convertHoursToSeconds(hours) +
                                convertMinutesToSeconds(value) +
                                seconds;
                            onChange(value);
                        }}
                    />
                </View>
                <View style={{flexGrow: 1}}>
                    <FormLabel>Seconds</FormLabel>
                    <NumberInput
                        value={seconds}
                        placeholder="SS"
                        onChange={(value) => {
                            value = convertToInt(value);
                            value =
                                convertHoursToSeconds(hours) +
                                convertMinutesToSeconds(minutes) +
                                value;
                            onChange(value);
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

export default DurationFormField;
