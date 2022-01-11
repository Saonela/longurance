import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import Panel from '../ui/Panel';
import {
    calculatePace,
    getDistanceText,
    getDurationText,
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

    const distancePoints = entries.map((entry) => entry.distance);
    const durationPoints = entries.map((entry) => entry.duration);
    const intensityPoints = entries.map((entry) => entry.effort);
    const pacePoints = entries.map((entry) =>
        calculatePace(entry.duration, entry.distance)
    );
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
                <MinimalLineChart data={distancePoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getDurationText(avgDuration)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Duration</SecondaryText>
                </View>
                <MinimalLineChart data={durationPoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getAveragePace(entries)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
                <MinimalLineChart data={pacePoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getIntensityText(avgIntensity)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Intensity</SecondaryText>
                </View>
                <MinimalLineChart data={intensityPoints} />
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
