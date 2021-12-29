import React from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import theme from '../../theme';
import {PrimaryText} from './Text';

interface ButtonProps {
    children: React.ReactNode;
    style?: ViewStyle | ViewStyle[];
    onPress: () => void;
}

export function Button({style = {}, children, onPress}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonBase, styles.filled, style]}
        >
            <PrimaryText>{children}</PrimaryText>
        </TouchableOpacity>
    );
}

export function OutlinedButton({style = {}, children, onPress}: ButtonProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.buttonBase, styles.outlined, style]}
        >
            <PrimaryText>{children}</PrimaryText>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
        paddingVertical: theme.SPACING.SM,
        paddingHorizontal: theme.SPACING.L,
        borderRadius: theme.BORDER.RADIUS,
        alignItems: 'center',
        elevation: 0
    },
    filled: {
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY
    },
    outlined: {
        borderColor: theme.COLORS.BACKGROUND_TERTIARY,
        borderWidth: theme.BORDER.WIDTH,
        backgroundColor: 'transparent'
    }
});
