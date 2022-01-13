import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';

interface SeparatorProps {
    marginTop?: number;
    marginBottom?: number;
}

function Separator({
    marginTop = theme.SPACING.M,
    marginBottom = theme.SPACING.M
}: SeparatorProps) {
    return <View style={[styles.separator, {marginTop, marginBottom}]} />;
}

const styles = StyleSheet.create({
    separator: {
        height: 2,
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY
    }
});

export default Separator;
