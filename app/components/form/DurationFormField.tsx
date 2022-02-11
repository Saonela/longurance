import React from 'react';
import {StyleSheet, View} from 'react-native';
import NumberInput from '../ui/NumberInput';
import FormLabel from './FormLabel';
import {
    convertHoursToSeconds,
    convertMinutesToSeconds,
    convertToInt,
    splitSecondsIntoChunks
} from '../../lib/utility';
import utils from '../../styles-utilities';

interface DurationFormFieldProps {
    value: number;
    onChange: (value: number) => void;
}

const getSeconds = (hours: number, minutes: number, seconds: number) =>
    convertHoursToSeconds(hours) + convertMinutesToSeconds(minutes) + seconds;

function DurationFormField({value, onChange}: DurationFormFieldProps) {
    const {hours, minutes, seconds} = splitSecondsIntoChunks(value);
    return (
        <View style={utils.row}>
            <View style={[styles.field, utils.marginRightL]}>
                <FormLabel>Hours</FormLabel>
                <NumberInput
                    value={hours}
                    placeholder="HH"
                    onChange={(stringValue) =>
                        onChange(
                            getSeconds(
                                convertToInt(stringValue),
                                minutes,
                                seconds
                            )
                        )
                    }
                />
            </View>
            <View style={[styles.field, utils.marginRightL]}>
                <FormLabel>Minutes</FormLabel>
                <NumberInput
                    value={minutes}
                    placeholder="MM"
                    onChange={(stringValue) =>
                        onChange(
                            getSeconds(
                                hours,
                                convertToInt(stringValue),
                                seconds
                            )
                        )
                    }
                />
            </View>
            <View style={styles.field}>
                <FormLabel>Seconds</FormLabel>
                <NumberInput
                    value={seconds}
                    placeholder="SS"
                    onChange={(stringValue) =>
                        onChange(
                            getSeconds(
                                hours,
                                minutes,
                                convertToInt(stringValue)
                            )
                        )
                    }
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    field: {
        flexGrow: 1
    }
});

export default DurationFormField;
