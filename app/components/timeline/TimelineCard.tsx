import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Panel from '../ui/Panel';
import {PrimaryText, SecondaryHeader, SecondaryText} from '../ui/Text';
import {
    getDistanceText,
    getDurationText,
    getPaceText,
    getWorkoutsLabel
} from '../../lib/entry';
import Separator from '../ui/Separator';
import theme from '../../theme';
import utils from '../../styles-utilities';
import {EffortIcons} from '../../types/Effort';
import {TimelineEntry} from '../../types/TimelineEntry';

interface TimelineCardProps {
    timelineEntry: TimelineEntry;
    onPress: () => void;
}

function TimelineCard({timelineEntry, onPress}: TimelineCardProps) {
    const {title, distance, duration, effort, entryIds} = timelineEntry;
    return (
        <TouchableNativeFeedback
            accessibilityLabel="Timeline card"
            onPress={onPress}
        >
            <View>
                <Panel>
                    <SecondaryHeader color="primary">{title} </SecondaryHeader>
                    <SecondaryText style={utils.marginTopS} color="secondary">
                        {entryIds.length} {getWorkoutsLabel(entryIds.length)}
                    </SecondaryText>
                    <Separator marginBottom={theme.SPACING.L} />
                    <View style={[utils.row]}>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getDistanceText(distance)}
                            </PrimaryText>
                            <SecondaryText>Distance</SecondaryText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getDurationText(duration)}
                            </PrimaryText>
                            <SecondaryText>Duration</SecondaryText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getPaceText(duration, distance)}
                            </PrimaryText>
                            <SecondaryText>Avg. Pace</SecondaryText>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.effortIndicator,
                            {backgroundColor: EffortIcons[effort].color}
                        ]}
                    />
                </Panel>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        marginRight: theme.SPACING.XL
    },
    detailsText: {
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS
    },
    effortIndicator: {
        position: 'absolute',
        right: 0,
        width: 1,
        height: 200
    }
});

export default TimelineCard;
