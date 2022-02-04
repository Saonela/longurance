import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import Panel from '../ui/Panel';
import {
    getDistanceText,
    getDurationText,
    getEntriesFieldValues,
    getIntensityText
} from '../../lib/entry';
import StatisticsRow from './StatisticsRow';
import {
    getAverageDistance,
    getAverageDuration,
    getAverageIntensity,
    getAveragePace
} from '../../lib/statistics';
import MinimalLineChart from '../chart/MinimalLineChart';

interface AverageStatisticsProps {
    entries: Entry[];
}

function AverageStatistics({entries}: AverageStatisticsProps) {
    const avgDistance = getAverageDistance(entries);
    const avgDuration = getAverageDuration(entries);
    const avgIntensity = getAverageIntensity(entries);
    const points = getEntriesFieldValues(entries);
    return (
        <Panel>
            <SecondaryHeader style={[utils.marginBottomM]} color="secondary">
                Averages
            </SecondaryHeader>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getDistanceText(avgDistance)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Distance</SecondaryText>
                </View>
                <MinimalLineChart data={points.distance} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getDurationText(avgDuration)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Duration</SecondaryText>
                </View>
                <MinimalLineChart data={points.duration} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getAveragePace(entries)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
                <MinimalLineChart data={points.pace} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getIntensityText(avgIntensity)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Intensity</SecondaryText>
                </View>
                <MinimalLineChart data={points.intensity} />
            </StatisticsRow>
        </Panel>
    );
}

const styles = StyleSheet.create({
    textBlock: {
        width: 135
    },
    textHeader: {
        paddingBottom: theme.SPACING.XS
    }
});

export default AverageStatistics;
