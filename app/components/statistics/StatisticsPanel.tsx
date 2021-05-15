import React from 'react';
import {StyleSheet, Text as NativeText, View} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

const StatisticsPanel = ({children, style = {}}) => <View style={[appStyles.panel, style]}>{children}</View>;

const Row = ({children, lastRow = false}) => <View style={[styles.row, !lastRow && styles.rowMargin]}>{children}</View>;

const Label = ({children}) => <NativeText style={styles.label}>{children}</NativeText>;

const Text = ({children}) => <NativeText style={appStyles.primaryText}>{children}</NativeText>;

const Icon = ({children}) => <View style={[styles.icon]}>{children}</View>;

const styles = StyleSheet.create({
    label: {
        ...appStyles.primaryText,
        marginBottom: theme.SPACING.XS,
    },
    icon: {
        marginRight: theme.SPACING.S
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowMargin: {
        marginBottom: theme.SPACING.M
    }
});

StatisticsPanel.Row = Row;
StatisticsPanel.Label = Label;
StatisticsPanel.Text = Text;
StatisticsPanel.Icon = Icon;

export default StatisticsPanel;
