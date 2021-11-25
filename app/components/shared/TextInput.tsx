import React from 'react';
import {StyleSheet, TextInput as DefaultTextInput, TouchableOpacity} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

interface TextInputProps {
    value?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    disabled?: boolean;
    numberOfLines?: number;
    style?: any;
    onPress?: any;
    onChange?: any;
    testID?: any;
    [prop:string]: any;
}

function TextInput(
    {
        value = '',
        placeholder = '',
        placeholderTextColor = theme.COLORS.FONT_SECONDARY,
        disabled,
        numberOfLines = 1,
        onPress,
        onChange,
        testID,
        style = {},
        ...props
    }: TextInputProps) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <DefaultTextInput
                {...props}
                style={styles.input}
                editable={!disabled}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                multiline={numberOfLines > 1}
                numberOfLines={numberOfLines}
                onChangeText={onChange}
                testID={testID}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    input: {
        ...appStyles.primaryText,
        ...appStyles.inputField,
        paddingVertical: theme.SPACING.XS,
        maxHeight: 100
    }
});

export default TextInput;
