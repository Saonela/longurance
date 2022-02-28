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

const formatDate = (entry: Entry) => moment(entry?.date).format('yyyy, MMM DD');

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
                    disabled={!distanceEntry}
                    onPress={() => distanceEntry && onPress(distanceEntry.id)}
                >
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getDistanceText(distanceEntry?.distance || 0)}
                        </SecondaryHeader>
                        <SecondaryText>Farthest distance</SecondaryText>
                    </View>
                    {distanceEntry && (
                        <SecondaryText>
                            {formatDate(distanceEntry)}
                        </SecondaryText>
                    )}
                </TouchableStatisticsRow>
                <TouchableStatisticsRow
                    disabled={!durationEntry}
                    onPress={() => durationEntry && onPress(durationEntry.id)}
                >
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getDurationText(durationEntry?.duration || 0)}
                        </SecondaryHeader>
                        <SecondaryText>Longest duration</SecondaryText>
                    </View>
                    {durationEntry && (
                        <SecondaryText>
                            {formatDate(durationEntry)}
                        </SecondaryText>
                    )}
                </TouchableStatisticsRow>
                <TouchableStatisticsRow
                    disabled={!paceEntry}
                    onPress={() => paceEntry && onPress(paceEntry.id)}
                >
                    <View>
                        <SecondaryHeader style={styles.textHeader}>
                            {getPaceText(
                                paceEntry?.duration || 0,
                                paceEntry?.distance || 0
                            )}
                        </SecondaryHeader>
                        <SecondaryText>Fastest Pace</SecondaryText>
                    </View>
                    {paceEntry && (
                        <SecondaryText>{formatDate(paceEntry)}</SecondaryText>
                    )}
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
