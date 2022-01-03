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

interface PeakStatisticsProps {
    entries: Entry[];
}

function PeakStatistics({entries}: PeakStatisticsProps) {
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
                <View style={utils.marginBottomL}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDistanceText(getFarthestDistance(entries))}
                    </PrimaryText>
                    <SecondaryText>Farthest distance</SecondaryText>
                </View>
                <View style={utils.marginBottomL}>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getDurationText(getLongestDuration(entries))}
                    </PrimaryText>
                    <SecondaryText>Longest duration</SecondaryText>
                </View>
                <View>
                    <PrimaryText style={styles.tertiaryHeader}>
                        {getFastestPace(entries)}
                    </PrimaryText>
                    <SecondaryText>Fastest Pace</SecondaryText>
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
    }
});

export default PeakStatistics;
