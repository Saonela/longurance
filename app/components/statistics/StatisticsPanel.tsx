import React from 'react';
import {StyleSheet, Text as NativeText, View} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';
import AppDistanceText from '../shared/DistanceText';
import AppDurationText from '../shared/DurationText';

const StatisticsPanel = ({children, style = {}}) => (
    <View style={[styles.panel, style]}>{children}</View>
);

const Row = ({children, withBottomMargin = false}) => (
    <View
        style={[
            styles.row,
            withBottomMargin && {marginBottom: theme.SPACING.M}
        ]}
    >
        {children}
    </View>
);

const Column = ({children, lastColumn = false}) => (
    <View style={[styles.column, lastColumn && styles.columnMargin]}>
        {children}
    </View>
);

const Label = ({children}) => (
    <NativeText style={styles.label}>{children}</NativeText>
);

const Text = ({children}) => (
    <NativeText style={styles.text}>{children}</NativeText>
);

const DistanceText = ({value}) => (
    <AppDistanceText distance={value} placeholder={'-'} style={styles.text} />
);

const DurationText = ({value}) => (
    <AppDurationText duration={value} placeholder={'-'} style={styles.text} />
);

const Icon = ({children}) => <View style={[styles.icon]}>{children}</View>;

const styles = StyleSheet.create({
    panel: {
        ...appStyles.panel,
        flexBasis: 1,
        flexGrow: 1
    },
    label: {
        ...appStyles.primaryText,
        color: theme.COLORS.FONT_SECONDARY,
        marginBottom: theme.SPACING.M
    },
    text: {
        ...appStyles.primaryText,
        fontSize: theme.FONT_SIZE.HEADER
    },
    icon: {
        marginRight: theme.SPACING.SM
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    column: {
        flexBasis: 1,
        flexGrow: 1
    },
    columnMargin: {
        paddingLeft: theme.SPACING.M * 3
    }
});

StatisticsPanel.Row = Row;
StatisticsPanel.Column = Column;
StatisticsPanel.Label = Label;
StatisticsPanel.Text = Text;
StatisticsPanel.DistanceText = DistanceText;
StatisticsPanel.DurationText = DurationText;
StatisticsPanel.Icon = Icon;

export default StatisticsPanel;
