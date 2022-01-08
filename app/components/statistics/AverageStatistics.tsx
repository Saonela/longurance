import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import {PrimaryText, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import Panel from '../ui/Panel';
import {
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

interface AverageStatisticsProps {
    entries: Entry[];
}

function AverageStatistics({entries}: AverageStatisticsProps) {
    const duration = getAverageDuration(entries);
    const distance = getAverageDistance(entries);
    const intensity = getAverageIntensity(entries);
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
                <View>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDistanceText(distance)}
                    </PrimaryText>
                    <SecondaryText>Avg. Distance</SecondaryText>
                </View>
            </StatisticsRow>
            <StatisticsRow>
                <View>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDurationText(duration)}
                    </PrimaryText>
                    <SecondaryText>Avg. Duration</SecondaryText>
                </View>
            </StatisticsRow>
            <StatisticsRow>
                <View>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getAveragePace(entries)}
                    </PrimaryText>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
            </StatisticsRow>
            <StatisticsRow>
                <View>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getIntensityText(intensity)}
                    </PrimaryText>
                    <SecondaryText>Avg. Intensity</SecondaryText>
                </View>
            </StatisticsRow>
        </Panel>
    );
}

const styles = StyleSheet.create({
    tertiaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: 24,
        paddingBottom: theme.SPACING.XS
    }
});

export default AverageStatistics;
