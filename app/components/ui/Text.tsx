/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, Text, TextStyle} from 'react-native';
import theme from '../../theme';

interface TextProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    color?: 'theme' | 'primary' | 'secondary';
    props?: TextProps;
}

export function PrimaryHeader({
    style = {},
    color = 'primary',
    children,
    ...props
}: TextProps) {
    return (
        <Text {...props} style={[styles.primaryHeader, colors[color], style]}>
            {children}
        </Text>
    );
}

export function SecondaryHeader({
    style = {},
    color = 'primary',
    children,
    ...props
}: TextProps) {
    return (
        <Text {...props} style={[styles.secondaryHeader, colors[color], style]}>
            {children}
        </Text>
    );
}

export function PrimaryTitle({
    style = {},
    color = 'primary',
    children,
    ...props
}: TextProps) {
    return (
        <Text {...props} style={[styles.primaryTitle, colors[color], style]}>
            {children}
        </Text>
    );
}

export function PrimaryText({
    style = {},
    color = 'primary',
    children,
    ...props
}: TextProps) {
    return (
        <Text {...props} style={[styles.primaryText, colors[color], style]}>
            {children}
        </Text>
    );
}

export function SecondaryText({
    style = {},
    color = 'secondary',
    children,
    ...props
}: TextProps) {
    return (
        <Text {...props} style={[styles.secondaryText, colors[color], style]}>
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    primaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER_PRIMARY
    },
    secondaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER_SECONDARY
    },
    primaryTitle: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.PRIMARY
    },
    primaryText: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.PRIMARY
    },
    secondaryText: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.SECONDARY
    }
});

const colors = StyleSheet.create({
    theme: {
        color: theme.COLORS.THEME_FONT
    },
    primary: {
        color: theme.COLORS.FONT_PRIMARY
    },
    secondary: {
        color: theme.COLORS.FONT_SECONDARY
    }
});
