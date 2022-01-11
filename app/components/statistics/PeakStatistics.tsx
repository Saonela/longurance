import React from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import Panel from '../ui/Panel';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import {getDistanceText, getDurationText, getPaceText} from '../../lib/entry';
import {
    getFarthestDistanceEntry,
    getFastestPaceEntry,
    getLongestDurationEntry
} from '../../lib/statistics';
import {TouchableStatisticsRow} from './StatisticsRow';

interface PeakStatisticsProps {
    entries: Entry[];
    onPress: (id: string) => void;
}

const formatDate = (entry: Entry) => moment(entry.date).format('yyyy, MMM DD');

function PeakStatistics({entries, onPress}: PeakStatisticsProps) {
    const distanceEntry = getFarthestDistanceEntry(entries);
    const durationEntry = getLongestDurationEntry(entries);
    const paceEntry = getFastestPaceEntry(entries);
    return (
        <Panel>
            <SecondaryHeader
                style={[utils.marginBottomM, styles.textHeader]}
                color="secondary"
            >
                Records
            </SecondaryHeader>
            <View style={[utils.col, utils.justifyBetween]}>
                <TouchableStatisticsRow
                    onPress={() => onPress(distanceEntry.id)}
                >
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getDistanceText(distanceEntry.distance)}
                        </SecondaryHeader>
                        <SecondaryText>Farthest distance</SecondaryText>
                    </View>
                    <SecondaryText>{formatDate(distanceEntry)}</SecondaryText>
                </TouchableStatisticsRow>
                <TouchableStatisticsRow
                    onPress={() => onPress(durationEntry.id)}
                >
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getDurationText(durationEntry.duration)}
                        </SecondaryHeader>
                        <SecondaryText>Longest duration</SecondaryText>
                    </View>
                    <SecondaryText>{formatDate(durationEntry)}</SecondaryText>
                </TouchableStatisticsRow>
                <TouchableStatisticsRow onPress={() => onPress(paceEntry.id)}>
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getPaceText(
                                paceEntry.duration,
                                paceEntry.distance
                            )}
                        </SecondaryHeader>
                        <SecondaryText>Fastest Pace</SecondaryText>
                    </View>
                    <SecondaryText>{formatDate(paceEntry)}</SecondaryText>
                </TouchableStatisticsRow>
            </View>
        </Panel>
    );
}

const styles = StyleSheet.create({
    textHeader: {
        paddingBottom: theme.SPACING.XS
    }
});

export default PeakStatistics;
