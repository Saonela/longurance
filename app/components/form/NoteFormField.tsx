import React from 'react';
import {View} from 'react-native';
import TextInput from '../ui/TextInput';
import theme from '../../theme';
import FormLabel from './FormLabel';

interface NoteFormFieldProps {
    value: string;
    style?: any;
    onChange: any;
}

function NoteFormField({value, style = null, onChange}: NoteFormFieldProps) {
    return (
        <View style={style}>
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
