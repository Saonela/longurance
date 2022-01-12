import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {FontAwesome5} from '@expo/vector-icons';
import moment from 'moment';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import theme from '../../theme';
import {
    getActivityTypeText,
    getDistanceText,
    getDurationText,
    getPaceText
} from '../../lib/entry';
import {EffortIcons} from '../../types/Effort';
import utils from '../../styles-utilities';
import {Activity} from '../../types/Activity';
import {PrimaryText, SecondaryText} from '../ui/Text';

interface EntryCardProps {
    entry: Entry;
    onPress: () => void;
}

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle'
};

function EntryCard({entry, onPress}: EntryCardProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.card}>
                <FontAwesome5
                    name={activityIconNames[entry.activity]}
                    size={185}
                    style={[styles.activityImage, styles[entry.activity]]}
                />
                <View style={utils.row}>
                    <View style={utils.flex1}>
                        <PrimaryText style={styles.date}>
                            {moment(entry.date).format('ddd, MMM DD')}
                        </PrimaryText>
                        <SecondaryText>{entry.title}</SecondaryText>
                    </View>
                    <Text style={styles.activity}>
                        {getActivityTypeText(entry.activity)}
                    </Text>
                </View>
                <View style={styles.separator} />
                <View style={utils.row}>
                    <View style={styles.detailsContainer}>
                        <PrimaryText style={styles.detailsText}>
                            {getDistanceText(entry.distance)}
                        </PrimaryText>
                        <SecondaryText>Distance</SecondaryText>
                    </View>
                    <View style={styles.detailsContainer}>
                        <PrimaryText style={styles.detailsText}>
                            {getDurationText(entry.duration)}
                        </PrimaryText>
                        <SecondaryText>Duration</SecondaryText>
                    </View>
                    <View style={styles.detailsContainer}>
                        <PrimaryText style={styles.detailsText}>
                            {getPaceText(entry.duration, entry.distance)}
                        </PrimaryText>
                        <SecondaryText>Pace</SecondaryText>
                    </View>
                </View>
                <View
                    style={[
                        styles.effortIndicator,
                        {backgroundColor: EffortIcons[entry.effort].color}
                    ]}
                />
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
        fontSize: theme.FONT_SIZE.SECONDARY,
        marginBottom: theme.SPACING.S
    },
    detailsContainer: {
        marginRight: theme.SPACING.XL
    },
    detailsText: {
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS
    },
    separator: {
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY,
        marginTop: theme.SPACING.S,
        marginBottom: theme.SPACING.L,
        height: 2
    },
    effortIndicator: {
        position: 'absolute',
        right: 0,
        width: 1,
        height: 200
    },
    activity: {
        fontFamily: 'LatoBlack',
        fontSize: theme.FONT_SIZE.HEADER_PRIMARY,
        color: theme.COLORS.THEME_FONT,
        textAlign: 'right'
    },
    activityImage: {
        position: 'absolute',
        color: theme.COLORS.BACKGROUND_TERTIARY
    },
    [Activity.RUNNING]: {
        right: -4,
        bottom: -36,
        transform: [{rotateY: '180deg'}]
    },
    [Activity.SWIMMING]: {
        right: -32,
        bottom: -56
    },
    [Activity.CYCLING]: {
        right: -10,
        bottom: -45,
        transform: [{rotateY: '180deg'}]
    }
});

export default EntryCard;
