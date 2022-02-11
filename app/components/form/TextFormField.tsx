import React from 'react';
import {View} from 'react-native';
import TextInput from '../ui/TextInput';
import theme from '../../theme';
import FormLabel from './FormLabel';

interface NoteFormFieldProps {
    value: string;
    label: string;
    accessibilityLabel?: string;
    placeholder?: string;
    onChange: (value: string) => void;
}

function TextFormField({
    value,
    label,
    accessibilityLabel = '',
    placeholder = '',
    onChange
}: NoteFormFieldProps) {
    return (
        <View>
            <FormLabel>{label}</FormLabel>
            <TextInput
                value={value}
                accessibilityLabel={accessibilityLabel}
                placeholder={placeholder}
                placeholderTextColor={theme.COLORS.FONT_SECONDARY}
                onChange={onChange}
            />
        </View>
    );
}

export default TextFormField;
