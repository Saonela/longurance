import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';
import {SimpleLineIcons} from '@expo/vector-icons';
import theme from '../../theme';
import {getActivityTypeText} from '../../lib/entry';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import {Trophy} from '../../types/Trophy';

interface TrophyDetailsPanelProps {
    trophy: Trophy
}

function TrophyDetailsPanel({trophy}: TrophyDetailsPanelProps) {
    return (
        <View style={styles.container}>
            <View style={{paddingRight: theme.SPACING.S, paddingLeft: theme.SPACING.S}}>
                <Text style={styles.titleSubText} numberOfLines={1}>{trophy.completed ? 'Trophy achieved!' : 'Trophy not achieved'}</Text>
                <Text style={styles.title} numberOfLines={1}>{trophy.title}</Text>
            </View>
            <View style={styles.section}>
                <SimpleLineIcons name="trophy"
                                 size={150}
                                 color={trophy.completed ? theme.COLORS.THEME_FONT : theme.COLORS.BACKGROUND_TERTIARY}/>
                <View style={{marginLeft: theme.SPACING.XL, flexGrow: 1}}>
                    <Text style={[styles.text, styles.activityText]}>{getActivityTypeText(trophy.activity)}</Text>
                    {trophy.distance && <Text style={[styles.text, styles.labelText]}>Distance:</Text>}
                    <DistanceText distance={trophy.distance} style={[styles.text, styles.statsText]}/>
                    {trophy.duration && <Text style={[styles.text, styles.labelText, {marginTop: theme.SPACING.S}]}>Duration:</Text>}
                    <DurationText duration={trophy.duration} style={[styles.text, styles.statsText]}/>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...appStyles.panel,
        overflow: 'hidden',
        flexDirection: 'column'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingRight: theme.SPACING.L,
        paddingLeft: theme.SPACING.L
    },
    title: {
        ...appStyles.primaryText,
        marginBottom: theme.SPACING.SM,
        fontSize: theme.FONT_SIZE.HEADER,
    },
    titleSubText: {
        ...appStyles.primaryText,
        marginBottom: 2,
        color: theme.COLORS.FONT_SECONDARY,
    },
    text: {
        ...appStyles.primaryText,
    },
    activityText: {
        marginBottom: theme.SPACING.SM,
        fontSize: theme.FONT_SIZE.HEADER
    },
    labelText: {
        marginBottom: theme.SPACING.XS
    },
    statsText: {
        fontSize: 20
    },
});

export default TrophyDetailsPanel;
