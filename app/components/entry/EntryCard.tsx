import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import theme from '../../theme';
import moment from 'moment';
import {getActivityTypeText, getDistanceText, getDurationText, getPaceText} from '../../lib/entry';
import {EffortIcons} from '../../types/Effort';
import utils from '../../styles-utilities';
import {FontAwesome5} from '@expo/vector-icons';
import {Activity} from '../../types/Activity';

interface EntryProps {
    entry: Entry,
    onPress: any
}

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle',
}

function EntryCard({entry, onPress}: EntryProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.card}>
                <FontAwesome5 name={activityIconNames[entry.activity]}
                              size={185}
                              style={[styles.activityImage, styles[entry.activity]]}/>
                <View style={utils.row}>
                    <View style={utils.flex1}>
                        <Text style={styles.date}>{moment(entry.date).format("ddd, MMM DD")}</Text>
                        <Text style={styles.title}>{entry.title}</Text>
                    </View>
                    <Text style={styles.activity}>{getActivityTypeText(entry.activity)}</Text>
                </View>
                <View style={styles.separator}/>
                <View style={utils.row}>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>{getDistanceText(entry.distance)}</Text>
                        <Text style={styles.detailsLabel}>Distance</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>{getDurationText(entry.duration)}</Text>
                        <Text style={styles.detailsLabel}>Duration</Text>
                    </View>
                    <View style={styles.detailsContainer}>
                        <Text style={styles.detailsText}>{getPaceText(entry.duration, entry.distance)}</Text>
                        <Text style={styles.detailsLabel}>Pace</Text>
                    </View>
                </View>
                <View style={[styles.effortIndicator, {backgroundColor: EffortIcons[entry.effort].color}]}/>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        ...appStyles.panel,
        overflow: 'hidden'
    },
    date: {
        ...appStyles.primaryText,
        fontSize: theme.FONT_SIZE.SECONDARY,
        marginBottom: theme.SPACING.S
    },
    title: appStyles.secondaryText,
    detailsContainer: {
        marginRight: theme.SPACING.XL
    },
    detailsLabel: appStyles.secondaryText,
    detailsText: {
        ...appStyles.primaryText,
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS,
    },
    separator: {
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY,
        marginTop: theme.SPACING.S,
        marginBottom: theme.SPACING.L,
        height: 2,
    },
    effortIndicator: {
        position: 'absolute',
        right: 0,
        width: 1,
        height: 200,
    },
    activity: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER,
        color: theme.COLORS.THEME_FONT,
        textAlign: 'right',
    },
    activityImage: {
        position: 'absolute',
        color: theme.COLORS.BACKGROUND_TERTIARY,
    },
    [Activity.RUNNING]: {
        right: -4,
        bottom: -36,
        transform: [{rotateY: '180deg'}]
    },
    [Activity.SWIMMING]: {
        right: -32,
        bottom: -56,
    },
    [Activity.CYCLING]: {
        right: -10,
        bottom: -45,
        transform: [{rotateY: '180deg'}]
    },
});

export default EntryCard;
