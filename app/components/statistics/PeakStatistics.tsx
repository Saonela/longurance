import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import moment from 'moment';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import Panel from '../ui/Panel';
import {PrimaryText, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import {getDistanceText, getDurationText, getPaceText} from '../../lib/entry';
import {
    getFarthestDistanceEntry,
    getFastestPaceEntry,
    getLongestDurationEntry
} from '../../lib/statistics';

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
            <PrimaryText
                style={[
                    utils.marginBottomM,
                    styles.tertiaryHeader,
                    {color: theme.COLORS.FONT_SECONDARY}
                ]}
            >
                Records
            </PrimaryText>
            <View style={[utils.col, utils.justifyBetween]}>
                <TouchableNativeFeedback
                    onPress={() => onPress(distanceEntry.id)}
                >
                    <View style={styles.statsRow}>
                        <View>
                            <PrimaryText style={styles.tertiaryHeader}>
                                {getDistanceText(distanceEntry.distance)}
                            </PrimaryText>
                            <SecondaryText>Farthest distance</SecondaryText>
                        </View>
                        <SecondaryText>
                            {formatDate(distanceEntry)}
                        </SecondaryText>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback
                    onPress={() => onPress(durationEntry.id)}
                >
                    <View style={styles.statsRow}>
                        <View>
                            <PrimaryText style={styles.tertiaryHeader}>
                                {getDurationText(durationEntry.duration)}
                            </PrimaryText>
                            <SecondaryText>Longest duration</SecondaryText>
                        </View>
                        <SecondaryText>
                            {formatDate(durationEntry)}
                        </SecondaryText>
                    </View>
                </TouchableNativeFeedback>
                <TouchableNativeFeedback onPress={() => onPress(paceEntry.id)}>
                    <View style={[styles.statsRow, utils.marginBottomNone]}>
                        <View>
                            <PrimaryText style={styles.tertiaryHeader}>
                                {getPaceText(
                                    paceEntry.duration,
                                    paceEntry.distance
                                )}
                            </PrimaryText>
                            <SecondaryText>Fastest Pace</SecondaryText>
                        </View>
                        <SecondaryText>{formatDate(paceEntry)}</SecondaryText>
                    </View>
                </TouchableNativeFeedback>
            </View>
        </Panel>
    );
}

const styles = StyleSheet.create({
    tertiaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: 24,
        paddingBottom: theme.SPACING.XS
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: theme.SPACING.SM,
        paddingVertical: theme.SPACING.ML,
        marginHorizontal: -theme.SPACING.SM,
        borderBottomColor: theme.COLORS.BACKGROUND_TERTIARY,
        borderBottomWidth: 1
    }
});

export default PeakStatistics;
