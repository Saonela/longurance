import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import {PrimaryText, SecondaryText} from '../ui/Text';
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
            <PrimaryText
                style={[
                    utils.marginBottomM,
                    styles.tertiaryHeader,
                    {color: theme.COLORS.FONT_SECONDARY}
                ]}
            >
                Averages
            </PrimaryText>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDistanceText(avgDistance)}
                    </PrimaryText>
                    <SecondaryText>Avg. Distance</SecondaryText>
                </View>
                <MinimalLineChart data={distancePoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDurationText(avgDuration)}
                    </PrimaryText>
                    <SecondaryText>Avg. Duration</SecondaryText>
                </View>
                <MinimalLineChart data={durationPoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getAveragePace(entries)}
                    </PrimaryText>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
                <MinimalLineChart data={pacePoints} />
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getIntensityText(avgIntensity)}
                    </PrimaryText>
                    <SecondaryText>Avg. Intensity</SecondaryText>
                </View>
                <MinimalLineChart data={intensityPoints} />
            </StatisticsRow>
        </Panel>
    );
}

const styles = StyleSheet.create({
    tertiaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER_SECONDARY,
        paddingBottom: theme.SPACING.XS
    },
    textBlock: {
        width: 135
    }
});

export default AverageStatistics;
