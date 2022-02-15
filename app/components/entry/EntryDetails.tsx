import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {FontAwesome5} from '@expo/vector-icons';
import {Entry} from '../../types/Entry';
import theme from '../../theme';
import appStyles from '../../styles';
import {
    getActivityTypeText,
    getDistanceText,
    getDurationText,
    getIntensityText,
    getPaceText
} from '../../lib/entry';
import EntryEffortBar from './EntryEffortBar';
import utils from '../../styles-utilities';
import {PrimaryText, SecondaryText} from '../ui/Text';
import {Activity} from '../../enums/Activity';
import Separator from '../ui/Separator';

interface EntryDetailsProps {
    entry: Entry;
}

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle'
};

function EntryDetails({entry}: EntryDetailsProps) {
    return (
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
            <Separator
                marginTop={theme.SPACING.S}
                marginBottom={theme.SPACING.L}
            />
            <View style={[utils.row, utils.marginBottomXL]}>
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
            <View style={[utils.row, utils.alignCenter, utils.justifyBetween]}>
                <SecondaryText style={utils.marginBottomXS}>
                    Intensity
                </SecondaryText>
                <PrimaryText style={styles.detailsText}>
                    {getIntensityText(entry.effort)}
                </PrimaryText>
            </View>
            <EntryEffortBar effort={entry.effort} />
            <View style={utils.marginTopXL}>
                <SecondaryText style={[utils.marginBottomS]}>
                    Note
                </SecondaryText>
                <PrimaryText>{entry.note || '-'}</PrimaryText>
            </View>
        </View>
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
        fontFamily: theme.FONT_FAMILY.PRIMARY_ACCENT,
        paddingBottom: theme.SPACING.XS
    },
    activity: {
        fontFamily: theme.FONT_FAMILY.PRIMARY_ACCENT,
        fontSize: theme.FONT_SIZE.HEADER_PRIMARY,
        color: theme.COLORS.THEME,
        textAlign: 'right'
    },
    activityImage: {
        position: 'absolute',
        color: theme.COLORS.BACKGROUND_TERTIARY
    },
    [Activity.RUNNING]: {
        right: -4,
        top: 16,
        transform: [{rotateY: '180deg'}]
    },
    [Activity.SWIMMING]: {
        right: -32,
        top: 24
    },
    [Activity.CYCLING]: {
        right: -10,
        top: 12,
        transform: [{rotateY: '180deg'}]
    }
});

export default EntryDetails;
