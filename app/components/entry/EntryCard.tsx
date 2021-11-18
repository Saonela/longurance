import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import theme from '../../theme';
import moment from 'moment';
import EntryEnergyIndicator from '../entry-energy-indicator/EntryEnergyIndicator';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import ActivityIcon from '../activity-icon/ActivityIcon';
import {getActivityTypeText} from '../../services/EntryService';

interface EntryProps {
    entry: Entry,
    onPress: any
}

function EntryCard({entry, onPress}: EntryProps) {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={{...appStyles.panel, overflow: 'hidden'}}>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{display: 'flex', flexDirection: 'column'}}>
                        <Text style={{...styles.headerText, fontSize: 13}}>{moment(entry.date).format("YYYY")}</Text>
                        <View style={{display: 'flex', flexDirection: 'row'}}>
                            <Text style={{...styles.headerText, fontSize: 22}}>{moment(entry.date).format("MMM DD")}</Text>
                            <Text style={{...styles.headerText, marginTop: 6, fontSize: 15}}>{moment(entry.date).format("HH:mm")}</Text>
                            <Text style={[appStyles.primaryText, {marginTop: 6, color: theme.COLORS.FONT_SECONDARY}]}>{getActivityTypeText(entry.activity)}</Text>
                        </View>
                    </View>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', overflow: 'visible', zIndex: 1}}>
                    <View style={styles.detailsContainer}>
                        <EntryEnergyIndicator style={[styles.details, {marginTop: -2}]} value={entry.energy}/>
                        <DistanceText style={styles.details} distance={entry.distance}/>
                        <DurationText style={styles.details} duration={entry.duration}/>
                    </View>
                </View>
                {entry.title ? <Text style={styles.title} numberOfLines={1}>{entry.title}</Text> : null}
                <ActivityIcon activity={entry.activity} size={150} style={styles.activityIcon}/>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    activityIcon: {
        position: 'absolute',
        right: -20,
        bottom: -40,
        color: theme.COLORS.BACKGROUND_SECONDARY
    },
    headerText: {
        ...appStyles.primaryText,
        marginRight: theme.SPACING.S
    },
    title: {
        ...appStyles.primaryText,
        zIndex: 1,
        marginTop: 8,
        color: theme.COLORS.FONT_SECONDARY
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexGrow: 1,
        marginTop: theme.SPACING.S
    },
    details: {
        marginRight: theme.SPACING.S
    },
    separatorLine: {
        marginTop: theme.SPACING.SM,
        marginBottom: theme.SPACING.SM,
        borderBottomColor: theme.COLORS.FONT_SECONDARY,
        borderBottomWidth: 1,
    }
});

export default EntryCard;
