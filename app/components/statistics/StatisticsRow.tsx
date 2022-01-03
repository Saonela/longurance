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
    onPress: () => void;
}

export function TouchableStatisticsRow({
    children,
    onPress
}: TouchableStatisticsRowProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
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
        borderBottomWidth: 1
    }
});

export default StatisticsRow;
