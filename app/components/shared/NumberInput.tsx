import React from 'react';
import {StyleSheet, TextInput as DefaultTextInput} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

interface NumberInputProps {
    value: number;
    placeholder?: string;
    onChange?: any;
    onBlur?: any;
    float?: boolean;
}

const NumberInput = ({value, placeholder, onChange = null, onBlur = null, float = false}: NumberInputProps) => {

    const validate = (value: string) => {
        return float
            ? validateFloatInput(value)
            : validateInput(value)
    };

    const validateInput = (value: string) => {
        return value.replace(/[^0-9]/g, '');
    };

    const validateFloatInput = (value: string) => {
        if ((value.match(/\./g) || []).length > 1) {
            const splitValue = value.split('.');
            value = splitValue[0] + '.' + splitValue[1];
        }
        return value.replace(/[^0-9\.]/g, '');
    };

    return (
        <DefaultTextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder={placeholder}
            placeholderTextColor={theme.COLORS.FONT_SECONDARY}
            onChangeText={(value) => {
                if (onChange) {
                    const validated = validate(value);
                    onChange(validated);
                }
            }}
            value={value || value === 0 ? value.toString() : ''}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        ...appStyles.primaryText,
        ...appStyles.inputField,
        padding: theme.SPACING.XS
    }
});

export default NumberInput;
