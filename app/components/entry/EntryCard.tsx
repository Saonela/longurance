import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import theme from '../../theme';
import moment from 'moment';
import ActivityIcon from '../activity-icon/ActivityIcon';
import {getActivityTypeText} from '../../lib/entry';
import {EffortIcons} from '../../types/Effort';
import utils from '../../styles-utilities';
import DurationText from '../shared/DurationText';
import DistanceText from '../shared/DistanceText';

interface EntryProps {
    entry: Entry,
    onPress: any
}

function EntryCard({entry, onPress}: EntryProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.card}>
                <ActivityIcon activity={entry.activity} size={175} style={styles.activityBackgroundImage}/>
                <View style={utils.justifyBetween}>
                    <Text style={styles.yearText}>{moment(entry.date).format("YYYY")}</Text>
                    <View style={[utils.row, utils.alignEnd]}>
                        <Text style={styles.dateText}>{moment(entry.date).format("MMM DD")}</Text>
                        <Text style={styles.timeText}>{moment(entry.date).format("HH:mm")}</Text>
                    </View>
                    <Text style={styles.activity}>{getActivityTypeText(entry.activity)}</Text>
                </View>
                <View style={styles.rightBlock}>
                    <Text style={styles.entryTitle}>{entry.title}</Text>
                    <View style={[utils.row, utils.alignEnd]}>
                        <View>
                            <Text style={styles.detailsLabel}>Effort</Text>
                            <Text style={styles.detailsText}>{entry.effort}/5</Text>
                        </View>
                        <View style={utils.paddingLeftM}>
                            <Text style={styles.detailsLabel}>Distance</Text>
                            <DistanceText distance={entry.distance} placeholder="-" style={styles.detailsText}/>
                        </View>
                        <View style={utils.paddingLeftM}>
                            <Text style={styles.detailsLabel}>Duration</Text>
                            <DurationText duration={entry.duration} placeholder="-" style={styles.detailsText}/>
                        </View>
                    </View>
                </View>
                <View style={[styles.effortIndicator, {backgroundColor: EffortIcons[entry.effort].color}]}/>
            </View>
        </TouchableNativeFeedback>
    );
}

const cardHeight = 110;

const styles = StyleSheet.create({
    card: {
        ...appStyles.panel,
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden',
        height: cardHeight
    },
    entryTitle: appStyles.primaryText,
    yearText: appStyles.primaryText,
    dateText: {
        ...appStyles.primaryText,
        fontSize: theme.FONT_SIZE.HEADER,
        paddingRight: theme.SPACING.S
    },
    timeText: {
        ...appStyles.primaryText,
        marginBottom: 3
    },
    activity: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER,
        color: theme.COLORS.THEME_FONT,
    },
    rightBlock: {
        justifyContent: 'space-between',
        minWidth: 180,
    },
    detailsLabel: {
        ...appStyles.secondaryText,
        paddingBottom: theme.SPACING.XS,
    },
    detailsText: {
        ...appStyles.primaryText,
    },
    effortIndicator: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 10,
        right: 8,
        top: 8,
        zIndex: 1,
        backgroundColor: theme.COLORS.ENERGY_POSITIVE
    },
    activityBackgroundImage: {
        position: 'absolute',
        right: -4,
        bottom: -50,
        color: theme.COLORS.BACKGROUND_TERTIARY,
        opacity: 0.75
    },
});

export default EntryCard;
