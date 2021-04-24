import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';
import IconButton from '../shared/IconButton';
import {Feather} from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import theme from '../../theme';
import {Trophy} from '../../types/Trophy';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import ActivityText from '../shared/ActivityText';

interface TrophyCardProps {
    trophy: Trophy,
    onEdit: any,
    onDelete: any
}

function TrophyCard({trophy, onEdit, onDelete}: TrophyCardProps) {
    return (
        <View style={[appStyles.panel, trophy.completed ? styles.completedTrophyPanel : null]}>
            <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text style={[appStyles.primaryText, {marginRight: 'auto'}]}>{trophy.title}</Text>
                <SimpleLineIcons name="trophy" size={24} color={trophy.completed ? theme.COLORS.SUCCESS : theme.COLORS.FONT_PRIMARY} />
            </View>
            <View style={styles.separatorLine}/>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <ActivityText activity={trophy.activity} style={{marginRight: theme.SPACING.S}}/>
                    {trophy.distance ? <DistanceText distance={trophy.distance} style={{marginLeft: 8}}/> : null}
                    {trophy.duration ? <DurationText duration={trophy.duration} style={{marginLeft: 8}}/> : null}
                </View>
                <IconButton style={styles.editButton}
                            icon={<Feather name="edit" size={theme.ICON_SIZE.S} color={theme.COLORS.FONT_PRIMARY} />}
                            onPress={() => onEdit(trophy.id)}/>
                <IconButton style={styles.deleteButton}
                            icon={<Feather name="x" size={theme.ICON_SIZE.S} color={theme.COLORS.FONT_PRIMARY} />}
                            onPress={() => onDelete(trophy.id)}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    completedTrophyPanel: {
        borderWidth: 1,
        borderColor: theme.COLORS.SUCCESS
    },
    note: {
        marginTop: theme.SPACING.S
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

export default TrophyCard;
