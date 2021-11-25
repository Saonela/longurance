import React from 'react';
import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import appStyles from '../../styles';
import { SimpleLineIcons } from '@expo/vector-icons';
import theme from '../../theme';
import {Trophy} from '../../types/Trophy';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import ActivityIcon from '../activity-icon/ActivityIcon';
import {getActivityTypeText} from '../../lib/entry';

interface TrophyCardProps {
    trophy: Trophy,
    onPress: any
}

function TrophyCard({trophy, onPress}: TrophyCardProps) {
    const trophyColor = trophy.completed ? theme.COLORS.THEME_FONT : theme.COLORS.BACKGROUND_TERTIARY;
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={[appStyles.panel, {overflow: 'hidden'}]}>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}>
                    <SimpleLineIcons style={styles.trophyIcon}
                                     name="trophy"
                                     size={50}
                                     color={trophyColor}/>
                    <Text style={[appStyles.primaryText]}>{trophy.title}</Text>
                </View>
                <View style={[styles.separatorLine, {borderBottomColor: trophyColor}]}/>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={appStyles.primaryText}>{getActivityTypeText(trophy.activity)}</Text>
                        <DistanceText distance={trophy.distance} style={{marginLeft: 8}}/>
                        <DurationText duration={trophy.duration} style={{marginLeft: 8}}/>
                    </View>
                </View>
                <ActivityIcon activity={trophy.activity} size={150} style={styles.activityIcon}/>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    activityIcon: {
        position: 'absolute',
        right: -20,
        bottom: -40,
        color: theme.COLORS.BACKGROUND_TERTIARY
    },
    trophyIcon: {
        marginRight: theme.SPACING.M,
        marginBottom: -12
    },
    separatorLine: {
        width: '55%',
        marginTop: theme.SPACING.SM,
        marginBottom: theme.SPACING.SM,
        marginLeft: theme.SPACING.S,
        borderBottomColor: theme.COLORS.THEME_FONT,
        borderBottomWidth: 3,
        borderRadius: 6,
        elevation: 4
    }
});

export default TrophyCard;
