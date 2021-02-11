import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import {Activity} from '../../types/Activity.enum';
import theme from '../../theme';
import EntryEnergyIndicator from '../entry-energy-indicator/EntryEnergyIndicator';
import {Feather} from '@expo/vector-icons';
import IconButton from '../shared/IconButton';
import ActivityIcon from '../activity-icon/ActivityIcon';
import moment from 'moment';

interface EntryProps {
    entry: Entry,
    onEdit: any,
    onDelete: any
}

function getActivityTypeText(type: Activity) {
    if (type === Activity.CYCLING) return 'CYCLE';
    if (type === Activity.SWIMMING) return 'SWIM';
    if (type === Activity.RUNNING) return 'RUN';
}

function getDurationTimeText(duration: number) {
    if (!duration) {
        return null;
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return {
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
    }
}

function EntryCard({entry, onEdit, onDelete}: EntryProps) {
    const duration = getDurationTimeText(entry.duration);

    return (
        <View style={appStyles.panel}>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{...styles.headerText, marginRight: 8}}>{moment(entry.date).format("YYYY-MM-DD")}</Text>
                    <Text style={{...styles.headerText}}>{moment(entry.date).format("HH:mm")}</Text>
                </View>
                <IconButton style={styles.editButton}
                            icon={<Feather name="edit" size={theme.ICON_SIZE.S} color={theme.COLORS.FONT_PRIMARY} />}
                            onPress={() => onEdit(entry.id)}/>
                <IconButton style={styles.deleteButton}
                            icon={<Feather name="x" size={theme.ICON_SIZE.S} color={theme.COLORS.FONT_PRIMARY} />}
                            onPress={() => onDelete(entry.id)}/>
            </View>
            <View style={styles.separatorLine}/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', flexGrow: 5}}>
                    <ActivityIcon activity={entry.activity} style={styles.activityIcon}/>
                    <Text style={styles.text}>{getActivityTypeText(entry.activity)}</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexGrow: 1}}>
                    {entry.distance ? <Text style={styles.text}>{entry.distance} KM</Text> : null}
                    {entry.duration ? <Text style={styles.text}>{duration?.hours}:{duration?.minutes} H</Text> : null}
                    <EntryEnergyIndicator value={entry.energy}/>
                </View>
            </View>
            {entry.note ? <Text style={{...styles.text, ...styles.note}}>{entry.note}</Text> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    headerText: {
        ...appStyles.primaryText,
    },
    text: {
        ...appStyles.primaryText,
    },
    note: {
        marginTop: theme.SPACING.S
    },
    activityIcon: {
        marginRight: theme.SPACING.S,
        color: theme.COLORS.FONT_PRIMARY
    },
    separatorLine: {
        marginTop: theme.SPACING.SM,
        marginBottom: theme.SPACING.SM,
        borderBottomColor: theme.COLORS.FONT_SECONDARY,
        borderBottomWidth: 1,
    },
    editButton: {
        position: 'absolute',
        top: -theme.SPACING.S,
        right: theme.SPACING.L + theme.SPACING.SM
    },
    deleteButton: {
        position: 'absolute',
        top: -theme.SPACING.S,
        right: -theme.SPACING.S
    }
});

export default EntryCard;
