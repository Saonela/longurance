import React from 'react';
import {StyleSheet, View} from 'react-native';
import Panel from '../ui/Panel';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import StatisticsRow from './StatisticsRow';
import {getDistanceText, getDurationText} from '../../lib/entry';
import {getTotalDistance, getTotalDuration} from '../../lib/statistics';
import theme from '../../theme';
import {Entry} from '../../types/Entry';

interface TotalStatisticsProps {
    entries: Entry[];
    trophiesCount: number;
}

function TotalStatistics({entries, trophiesCount}: TotalStatisticsProps) {
    const distance = getTotalDistance(entries);
    const duration = getTotalDuration(entries);
    return (
        <Panel>
            <SecondaryHeader style={[utils.marginBottomM]} color="secondary">
                Totals
            </SecondaryHeader>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {entries.length}
                    </SecondaryHeader>
                    <SecondaryText>
                        {entries.length === 1 ? 'Workout' : 'Workouts'}
                    </SecondaryText>
                </View>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {trophiesCount}
                    </SecondaryHeader>
                    <SecondaryText>
                        {trophiesCount === 1 ? 'Trophy' : 'Trophies'}
                    </SecondaryText>
                </View>
            </StatisticsRow>
            <StatisticsRow>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getDistanceText(distance)}
                    </SecondaryHeader>
                    <SecondaryText>Total Distance</SecondaryText>
                </View>
                <View style={styles.textBlock}>
                    <SecondaryHeader style={styles.textHeader}>
                        {getDurationText(duration)}
                    </SecondaryHeader>
                    <SecondaryText>Total Duration</SecondaryText>
                </View>
            </StatisticsRow>
        </Panel>
    );
}

const styles = StyleSheet.create({
    textBlock: {
        flex: 1
    },
    textHeader: {
        paddingBottom: theme.SPACING.XS
    }
});

export default TotalStatistics;
