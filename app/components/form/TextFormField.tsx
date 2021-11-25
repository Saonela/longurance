import React from 'react';
import {View} from 'react-native';
import TextInput from '../shared/TextInput';
import theme from '../../theme';
import FormLabel from './FormLabel';

interface NoteFormFieldProps {
    value: string,
    label: string,
    accessibilityLabel?: string,
    placeholder?: string,
    style?: any,
    onChange: any
}

function TextFormField({value, label, accessibilityLabel = '', placeholder = '', style = null, onChange}: NoteFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel>{label}</FormLabel>
            <TextInput value={value}
                       accessibilityLabel={accessibilityLabel}
                       placeholder={placeholder}
                       placeholderTextColor={theme.COLORS.FONT_SECONDARY}
                       onChange={onChange}/>
        </View>
    );
}

export default TextFormField;
