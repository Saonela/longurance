import React from 'react';
import {
    StyleSheet,
    TextInput as DefaultTextInput,
    TouchableOpacity,
    ViewStyle
} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

interface TextInputProps {
    value?: string;
    accessibilityLabel?: string;
    placeholder?: string;
    placeholderTextColor?: string;
    disabled?: boolean;
    numberOfLines?: number;
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
    onChange?: (value: string) => void;
    testID?: string;
}

function TextInput({
    value = '',
    accessibilityLabel,
    placeholder = '',
    placeholderTextColor = theme.COLORS.FONT_SECONDARY,
    disabled = false,
    numberOfLines = 1,
    onPress,
    onChange,
    testID,
    style = {}
}: TextInputProps) {
    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <DefaultTextInput
                style={styles.input}
                editable={!disabled}
                value={value}
                accessibilityLabel={accessibilityLabel}
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
