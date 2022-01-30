import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import Panel from '../ui/Panel';
import theme from '../../theme';
import {
    getDistanceText,
    getDurationText,
    getIntensityText,
    getPaceText,
    getTrophiesLabel,
    getWorkoutsLabel
} from '../../lib/entry';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import LineChart from '../chart/LineChart';

interface TimelineDetailsProps {}

function TimelineDetails({item}) {
    return (
        <Panel>
            <SecondaryHeader color="secondary" style={[utils.marginBottomXL]}>
                {item.title}
            </SecondaryHeader>
            <View style={utils.row}>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {item.workouts}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getWorkoutsLabel(item.workouts)}
                    </SecondaryText>
                </View>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {item.workouts}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getTrophiesLabel(item.workouts)}
                    </SecondaryText>
                </View>
            </View>
            <Separator
            // marginTop={theme.SPACING.L}
            // marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDistanceText(item.distance)}
                </SecondaryHeader>
                <SecondaryText>Distance</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={[
                    50, 10, 40, 95, 4, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80
                ]}
                formatLabel={getDistanceText}
            />
            <Separator
            // marginTop={theme.SPACING.L}
            // marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDurationText(item.duration)}
                </SecondaryHeader>
                <SecondaryText>Duration</SecondaryText>
            </View>
            <LineChart style={styles.chart} data={[]} />
            <Separator
            // marginTop={theme.SPACING.L}
            // marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getPaceText(item.duration, item.distance)}
                </SecondaryHeader>
                <SecondaryText>Avg. Pace</SecondaryText>
            </View>
            <LineChart style={styles.chart} data={[]} />
            <Separator
            // marginTop={theme.SPACING.L}
            // marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getIntensityText(item.effort)}
                </SecondaryHeader>
                <SecondaryText>Avg. Intensity</SecondaryText>
            </View>
            <LineChart style={utils.marginTopL} data={[]} />
        </Panel>
    );
}

const styles = StyleSheet.create({
    chart: {
        marginTop: theme.SPACING.L,
        marginBottom: theme.SPACING.S
    },
    textHeader: {
        paddingBottom: theme.SPACING.XS
    }
});

export default TimelineDetails;
