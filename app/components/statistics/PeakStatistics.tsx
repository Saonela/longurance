import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import Panel from '../ui/Panel';
import {PrimaryText, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import {getDistanceText, getDurationText} from '../../lib/entry';
import {
    getFarthestDistance,
    getFastestPace,
    getLongestDuration
} from '../../lib/statistics';
import moment from 'moment';

interface PeakStatisticsProps {
    entries: Entry[];
}

const formatDate = (entry: Entry) => moment(entry.date).format('yyyy, MMM DD');

function PeakStatistics({entries}: PeakStatisticsProps) {
    const distanceRecordEntry = getFarthestDistance(entries);
    const durationRecordEntry = getLongestDuration(entries);
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
                <View style={styles.statsRow}>
                    <View>
                        <PrimaryText style={styles.tertiaryHeader}>
                            {getDistanceText(distanceRecordEntry.distance)}
                        </PrimaryText>
                        <SecondaryText>Farthest distance</SecondaryText>
                    </View>
                    <SecondaryText>
                        {formatDate(distanceRecordEntry)}
                    </SecondaryText>
                </View>
                <View style={styles.statsRow}>
                    <View>
                        <PrimaryText style={styles.tertiaryHeader}>
                            {getDurationText(durationRecordEntry.duration)}
                        </PrimaryText>
                        <SecondaryText>Longest duration</SecondaryText>
                    </View>
                    <SecondaryText>
                        {formatDate(durationRecordEntry)}
                    </SecondaryText>
                </View>
                <View style={[styles.statsRow, utils.marginBottomNone]}>
                    <View>
                        <PrimaryText style={styles.tertiaryHeader}>
                            {getFastestPace(entries)}
                        </PrimaryText>
                        <SecondaryText>Fastest Pace</SecondaryText>
                    </View>
                </View>
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
        marginBottom: theme.SPACING.L
    }
});

export default PeakStatistics;
