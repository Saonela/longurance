/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import theme from '../../theme';

interface TextProps {
    children: React.ReactNode;
    style?: TextStyle;
    props?: TextProps;
}

export function PrimaryText({style = {}, children, ...props}: TextProps) {
    return (
        <Text {...props} style={[styles.primary, style]}>
            {children}
        </Text>
    );
}

export function SecondaryText({style = {}, children, ...props}: TextProps) {
    return (
        <Text {...props} style={[styles.secondary, style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    primary: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.PRIMARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    secondary: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.SECONDARY,
        color: theme.COLORS.FONT_SECONDARY
    }
});
