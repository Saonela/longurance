import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {Entry} from '../../types/Entry';
import ActivityIcon from '../activity-icon/ActivityIcon';
import theme from '../../theme';
import moment from 'moment';
import appStyles from '../../styles';
import EntryService from '../../services/EntryService';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import {MaterialIcons} from '@expo/vector-icons';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SimpleLineIcons} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface EntryDetailsProps {
    entry: Entry
}

const energyEffortPosition = {
    [-2]: '93%',
    [-1]: '70%',
    [0]: '47%',
    [1]: '25%',
    [2]: '0%'
};

function DetailsBlock({label, value, icon, style = {}}) {
    return (
        <View style={[styles.detailsBlock, style]}>
            <View style={styles.detailsIcon}>{icon}</View>
            <Text style={styles.detailsLabel}>{label}</Text>
            <Text style={styles.detailsValue}>{value ? value : '-'}</Text>
        </View>
    );
}

function EffortBlock({energy}) {
    return (
        <View style={styles.detailsBlock}>
            <Text style={styles.detailsLabel}>Effort</Text>
            <LinearGradient
                style={styles.effortBar}
                start={{x: 0, y: 0}} end={{x: 1, y: 0}}
                colors={[theme.COLORS.ENERGY_POSITIVE, theme.COLORS.ENERGY_NEUTRAL, theme.COLORS.ENERGY_NEGATIVE]}>
                <View style={[styles.effortBarIndicator, {left: energyEffortPosition[energy]}]}/>
            </LinearGradient>
            <View style={styles.effortBarLabels}>
                <Text style={styles.effortBarLabel}>Light</Text>
                <Text style={[styles.effortBarLabel, {marginLeft: 24}]}>Moderate</Text>
                <Text style={styles.effortBarLabel}>Vigorous</Text>
            </View>
        </View>
    );
}

function PaceText({duration, distance}) {
    return (
        <>
            <Text>KM / </Text>
            <View/>
            <DurationText duration={duration && distance ? (duration / distance) : 0}/>
        </>
    )
}

function EntryDetails({entry}: EntryDetailsProps) {
    return (
        <ScrollView>
            <View style={{...appStyles.panel, height: 120, overflow: 'hidden'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{...styles.headerText, fontSize: 13}}>{moment(entry.date).format("YYYY")}</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={{...styles.headerText, fontSize: 22}}>{moment(entry.date).format("MMM DD")}</Text>
                            <Text style={{...styles.headerText, marginTop: 6, fontSize: 15}}>{moment(entry.date).format("HH:mm")}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.activityText}>{EntryService.getActivityTypeText(entry.activity)}</Text>
                <View style={{alignItems: "center"}}>
                    <ActivityIcon activity={entry.activity} size={200} style={styles.activityIcon}/>
                </View>
            </View>
            <View style={styles.detailsRow}>
                <DetailsBlock label="Distance"
                              value={<DistanceText distance={entry.distance}/>}
                              icon={<MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>}
                              style={{flexBasis: 1}}/>
                <DetailsBlock label="Duration"
                              value={<DurationText duration={entry.duration}/>}
                              icon={<MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>}
                              style={{flexBasis: 1}}/>
            </View>
            <View style={styles.detailsRow}>
                <DetailsBlock label="Pace"
                              value={<PaceText duration={entry.duration} distance={entry.distance}/>}
                              icon={<MaterialIcons name="speed" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>}
                              style={{flexBasis: 1}}/>
                <DetailsBlock label="Trophy"
                              value="-"
                              icon={<SimpleLineIcons name="trophy" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} />}
                              style={{flexBasis: 1}}/>
            </View>
            <EffortBlock energy={entry.energy}/>
            <DetailsBlock label="Note"
                          value={entry.note}
                          icon={<MaterialCommunityIcons name="note-outline" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    activityIcon: {
        position: 'absolute',
        top: -90,
        right: -30,
        color: theme.COLORS.BACKGROUND_SECONDARY,
    },
    activityText: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        color: theme.COLORS.FONT_PRIMARY,
        fontSize: theme.FONT_SIZE.HEADER
    },
    headerText: {
        ...appStyles.primaryText,
        fontSize: theme.FONT_SIZE.HEADER,
        marginRight: theme.SPACING.S
    },
    detailsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    detailsBlock: {
        ...appStyles.panel,
        flexGrow: 1
    },
    detailsIcon: {
        position: 'absolute',
        top: '50%',
        right: theme.SPACING.M,
    },
    detailsLabel: {
        ...appStyles.primaryText,
        marginBottom: theme.SPACING.XS,
    },
    detailsValue: {
        ...appStyles.primaryText,
        maxWidth: '90%'
    },
    effortBar: {
        width: '100%',
        height: 10,
        marginTop: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.THEME_FONT
    },
    effortBarIndicator: {
        position: 'absolute',
        top: -7,
        left: -14,
        width: 24,
        height: 24,
        borderWidth: 5,
        borderColor: theme.COLORS.FONT_PRIMARY,
        borderRadius: 15,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        elevation: 4
    },
    effortBarLabels: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: theme.SPACING.XS,
        paddingLeft: theme.SPACING.XS,
        marginTop: theme.SPACING.M
    },
    effortBarLabel: {
        ...appStyles.secondaryText,
        color: theme.COLORS.FONT_SECONDARY
    },
});

export default EntryDetails;
