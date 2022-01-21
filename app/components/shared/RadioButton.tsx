import React from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,
    ViewStyle
} from 'react-native';
import theme from '../../theme';
import {PrimaryText} from '../ui/Text';

interface RadioButtonProps<T> {
    value: T;
    selected: boolean;
    children: React.ReactNode;
    style?: ViewStyle;
    onPress: (value: T) => void;
}

function RadioButton<T>({
    value,
    selected,
    children,
    style,
    onPress
}: RadioButtonProps<T>) {
    return (
        <View style={[style]}>
            <TouchableNativeFeedback onPress={() => onPress(value)}>
                <View style={styles.container}>
                    <View style={styles.radio}>
                        {selected && <View style={styles.radioCenter} />}
                    </View>
                    <PrimaryText>{children}</PrimaryText>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: theme.SPACING.SM
    },
    radio: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 22,
        height: 22,
        marginRight: theme.SPACING.S,
        borderWidth: 2,
        borderRadius: 11,
        borderColor: theme.COLORS.FONT_PRIMARY
    },
    radioCenter: {
        width: 11,
        height: 11,
        borderRadius: 6,
        backgroundColor: theme.COLORS.FONT_PRIMARY
    }
});

export default RadioButton;
