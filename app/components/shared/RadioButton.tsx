import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import theme from '../../theme';

interface RadioButtonProps {
    label: string | number;
    value: string | number;
    selected: boolean;
    onPress: any;
}

function RadioButton({label, value, selected, onPress}: RadioButtonProps) {
    return (
        <View>
            <TouchableNativeFeedback onPress={() => onPress(value)}>
                <View style={styles.container}>
                    <View style={styles.button}>
                        {selected ? (
                            <View
                                style={[styles.button, styles.buttonCenter]}
                            />
                        ) : null}
                    </View>
                    <Text style={styles.label}>{label}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row'
    },
    label: {
        color: theme.COLORS.FONT_PRIMARY
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: theme.COLORS.FONT_PRIMARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    buttonCenter: {
        width: 10,
        height: 10,
        backgroundColor: theme.COLORS.FONT_PRIMARY
    }
});

export default RadioButton;
