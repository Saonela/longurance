import React from 'react';
import {StyleSheet, View} from 'react-native';
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
                <TouchableStatisticsRow
                    onPress={() => onPress(distanceEntry.id)}
                >
                    <View>
                        <PrimaryText style={styles.tertiaryHeader}>
                            {getDistanceText(distanceEntry.distance)}
                        </PrimaryText>
                        <SecondaryText>Farthest distance</SecondaryText>
                    </View>
                    <SecondaryText>{formatDate(distanceEntry)}</SecondaryText>
                </TouchableStatisticsRow>
                <TouchableStatisticsRow
                    onPress={() => onPress(durationEntry.id)}
                >
                    <View>
                        <PrimaryText style={styles.tertiaryHeader}>
                            {getDurationText(durationEntry.duration)}
                        </PrimaryText>
                        <SecondaryText>Longest duration</SecondaryText>
                    </View>
                    <SecondaryText>{formatDate(durationEntry)}</SecondaryText>
                </TouchableStatisticsRow>
                <TouchableStatisticsRow onPress={() => onPress(paceEntry.id)}>
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
                </TouchableStatisticsRow>
            </View>
        </Panel>
    );
}

const styles = StyleSheet.create({
    tertiaryHeader: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER_SECONDARY,
        paddingBottom: theme.SPACING.XS
    }
});

export default PeakStatistics;
