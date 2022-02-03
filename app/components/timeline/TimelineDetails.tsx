import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import Panel from '../ui/Panel';
import theme from '../../theme';
import {
    calculatePace,
    getCalculatedPaceText,
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
import {TimelineEntry} from '../../types/TimelineEntry';
import {getEntriesByIds, useEntriesStore} from '../../state/entries';

interface TimelineDetailsProps {
    timelineEntry: TimelineEntry;
}

function TimelineDetails({timelineEntry}: TimelineDetailsProps) {
    const entries = useEntriesStore(getEntriesByIds(timelineEntry.entryIds));
    const distancePoints = entries.map((entry) => entry.distance);
    const durationPoints = entries.map((entry) => entry.duration);
    const intensityPoints = entries.map((entry) => entry.effort);
    const pacePoints = entries.map((entry) =>
        calculatePace(entry.duration, entry.distance)
    );
    return (
        <Panel>
            <SecondaryHeader color="secondary" style={[utils.marginBottomXL]}>
                {timelineEntry.title}
            </SecondaryHeader>
            <View style={utils.row}>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {timelineEntry.entryIds.length}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getWorkoutsLabel(timelineEntry.entryIds.length)}
                    </SecondaryText>
                </View>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {timelineEntry.trophiesCount}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getTrophiesLabel(timelineEntry.trophiesCount)}
                    </SecondaryText>
                </View>
            </View>
            <Separator marginBottom={theme.SPACING.L} />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDistanceText(timelineEntry.distance)}
                </SecondaryHeader>
                <SecondaryText>Distance</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={distancePoints}
                formatLabel={getDistanceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getDurationText(timelineEntry.duration)}
                </SecondaryHeader>
                <SecondaryText>Duration</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={durationPoints}
                formatLabel={getDurationText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getPaceText(
                        timelineEntry.duration,
                        timelineEntry.distance
                    )}
                </SecondaryHeader>
                <SecondaryText>Avg. Pace</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={pacePoints}
                formatLabel={getCalculatedPaceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {getIntensityText(timelineEntry.effort)}
                </SecondaryHeader>
                <SecondaryText>Avg. Intensity</SecondaryText>
            </View>
            <LineChart
                style={styles.chart}
                data={intensityPoints}
                yAxisData={[1, 2, 3, 4, 5]}
                formatLabel={getIntensityText}
            />
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
