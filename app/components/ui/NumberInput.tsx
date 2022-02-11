import React from 'react';
import {StyleSheet, TextInput as DefaultTextInput} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

interface NumberInputProps {
    value: number | string;
    placeholder?: string;
    onChange: (value: string) => void;
    float?: boolean;
}

const toIntegerValue = (value: string) => {
    return value.replace(/[^0-9]/g, '');
};

const toFloatValue = (value: string) => {
    let floatValue = value;
    if ((value.match(/\./g) || []).length > 1) {
        const splitValue = value.split('.');
        floatValue = `${splitValue[0]}.${splitValue[1]}`;
    }
    return floatValue.replace(/[^0-9\.]/g, '');
};

const NumberInput = ({
    value,
    placeholder = '',
    onChange,
    float = false
}: NumberInputProps) => {
    return (
        <DefaultTextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={placeholder}
            placeholderTextColor={theme.COLORS.FONT_SECONDARY}
            onChangeText={(newValue) => {
                onChange(
                    float ? toFloatValue(newValue) : toIntegerValue(newValue)
                );
            }}
            value={value ? value.toString() : ''}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        ...appStyles.primaryText,
        ...appStyles.inputField,
        paddingVertical: theme.SPACING.XS
    }
});

export default NumberInput;
