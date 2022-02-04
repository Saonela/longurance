import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryTitle, SecondaryHeader, SecondaryText} from '../ui/Text';
import Panel from '../ui/Panel';
import theme from '../../theme';
import {
    getCalculatedPaceText,
    getDistanceText,
    getDurationText,
    getEntriesFieldValues,
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
import ChartLegend from '../chart/ChartLegend';
import {TimeInterval} from '../../types/TimeInterval';

interface TimelineDetailsProps {
    currentEntry: TimelineEntry;
    previousEntry: TimelineEntry | null;
    timeInterval: TimeInterval.YEAR | TimeInterval.MONTH;
}

const labelsMap = {
    [TimeInterval.YEAR]: 'year',
    [TimeInterval.MONTH]: 'month'
};

const getLegendItems = (timeInterval: TimeInterval) => [
    {
        label: `Current ${labelsMap[timeInterval]}`,
        color: theme.COLORS.THEME_SECONDARY
    },
    {
        label: `Previous ${labelsMap[timeInterval]}`,
        color: theme.COLORS.THEME_SECONDARY_FADED
    }
];

function TimelineDetailsRow({
    label,
    currentValue,
    previousValue,
    showPrevious
}) {
    return (
        <View style={[utils.row, utils.justifyBetween, utils.alignEnd]}>
            <View>
                <SecondaryHeader style={styles.textHeader}>
                    {currentValue}
                </SecondaryHeader>
                <SecondaryText>{label}</SecondaryText>
            </View>
            {showPrevious && (
                <View testID="previous-timeline-entry-details">
                    <PrimaryTitle color="secondary" style={[styles.textHeader]}>
                        {previousValue}
                    </PrimaryTitle>
                    <SecondaryText>{label}</SecondaryText>
                </View>
            )}
        </View>
    );
}

function TimelineDetails({
    currentEntry,
    previousEntry,
    timeInterval
}: TimelineDetailsProps) {
    const currentEntries = useEntriesStore(
        getEntriesByIds(currentEntry.entryIds)
    );
    const previousEntries = useEntriesStore(
        getEntriesByIds(previousEntry?.entryIds || [])
    );
    const currentPoints = getEntriesFieldValues(currentEntries);
    const previousPoints = getEntriesFieldValues(previousEntries);
    return (
        <Panel>
            <SecondaryHeader color="secondary" style={[utils.marginBottomXL]}>
                {currentEntry.title}
            </SecondaryHeader>
            <View style={utils.row}>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {currentEntry.entryIds.length}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getWorkoutsLabel(currentEntry.entryIds.length)}
                    </SecondaryText>
                </View>
                <View style={utils.flex1}>
                    <SecondaryHeader style={styles.textHeader}>
                        {currentEntry.trophiesCount}
                    </SecondaryHeader>
                    <SecondaryText>
                        {getTrophiesLabel(currentEntry.trophiesCount)}
                    </SecondaryText>
                </View>
            </View>
            {previousEntry !== undefined && (
                <>
                    <Separator />
                    <ChartLegend items={getLegendItems(timeInterval)} />
                </>
            )}
            <Separator marginBottom={theme.SPACING.L} />
            <TimelineDetailsRow
                label="Distance"
                currentValue={getDistanceText(currentEntry.distance)}
                previousValue={getDistanceText(previousEntry?.distance || 0)}
                showPrevious={!!previousEntry}
            />
            <LineChart
                style={styles.chart}
                data={currentPoints.distance}
                secondaryData={previousPoints.distance}
                formatLabel={getDistanceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <TimelineDetailsRow
                label="Duration"
                currentValue={getDurationText(currentEntry.duration)}
                previousValue={getDurationText(previousEntry?.duration || 0)}
                showPrevious={!!previousEntry}
            />
            <LineChart
                style={styles.chart}
                data={currentPoints.duration}
                secondaryData={previousPoints.duration}
                formatLabel={getDurationText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <TimelineDetailsRow
                label="Avg. Pace"
                currentValue={getPaceText(
                    currentEntry.duration,
                    currentEntry.distance
                )}
                previousValue={getPaceText(
                    previousEntry?.duration || 0,
                    previousEntry?.distance || 0
                )}
                showPrevious={!!previousEntry}
            />
            <LineChart
                style={styles.chart}
                data={currentPoints.pace}
                secondaryData={previousPoints.pace}
                formatLabel={getCalculatedPaceText}
            />
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <TimelineDetailsRow
                label="Avg. Intensity"
                currentValue={getIntensityText(currentEntry.effort)}
                previousValue={getIntensityText(previousEntry?.effort || 0)}
                showPrevious={!!previousEntry}
            />
            <LineChart
                style={styles.chart}
                data={currentPoints.intensity}
                secondaryData={previousPoints.intensity}
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
