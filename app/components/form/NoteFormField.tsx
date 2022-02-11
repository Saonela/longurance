import React from 'react';
import {View} from 'react-native';
import TextInput from '../ui/TextInput';
import theme from '../../theme';
import FormLabel from './FormLabel';

interface NoteFormFieldProps {
    value: string;
    onChange: (value: string) => void;
}

function NoteFormField({value, onChange}: NoteFormFieldProps) {
    return (
        <View>
            <FormLabel>Note</FormLabel>
            <TextInput
                value={value}
                accessibilityLabel="Note field"
                placeholder=""
                placeholderTextColor={theme.COLORS.FONT_SECONDARY}
                numberOfLines={3}
                onChange={onChange}
            />
        </View>
    );
}

export default NoteFormField;
