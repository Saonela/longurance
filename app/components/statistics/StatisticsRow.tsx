import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import theme from '../../theme';

interface StatisticsRowProps {
    children: React.ReactNode;
}

export function StatisticsRow({children}: StatisticsRowProps) {
    return <View style={styles.row}>{children}</View>;
}

interface TouchableStatisticsRowProps {
    children: React.ReactNode;
    disabled?: boolean;
    onPress: () => void;
}

export function TouchableStatisticsRow({
    children,
    disabled = false,
    onPress
}: TouchableStatisticsRowProps) {
    return (
        <TouchableNativeFeedback disabled={disabled} onPress={onPress}>
            <View style={styles.row}>{children}</View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.SPACING.SM,
        paddingVertical: theme.SPACING.ML,
        marginHorizontal: -theme.SPACING.SM,
        borderBottomColor: theme.COLORS.BACKGROUND_TERTIARY,
        borderBottomWidth: 2
    }
});

export default StatisticsRow;
