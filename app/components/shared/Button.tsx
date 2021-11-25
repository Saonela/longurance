import React from 'react';
import {Text, StyleSheet, TouchableOpacity, StyleProp} from 'react-native';
import theme from '../../theme';
import appStyles from '../../styles';

interface ButtonProps {
    label: string;
    onPress: () => any;
    style?: StyleProp<any>;
}

function Button({label, onPress, style = {}}: ButtonProps) {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={[appStyles.primaryText, style.color ? {color: style.color} : {}]}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingTop: theme.SPACING.S,
        paddingRight: theme.SPACING.L,
        paddingBottom: theme.SPACING.S,
        paddingLeft: theme.SPACING.L,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY,
        elevation: 4
    }
});

export default Button;
