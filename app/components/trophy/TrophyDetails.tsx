import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';
import {Trophy} from '../../types/Trophy';
import {Entry} from '../../types/Entry';
import EntryDetails from '../entry/EntryDetails';
import { SimpleLineIcons } from '@expo/vector-icons';
import theme from '../../theme';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import EntryService from '../../services/EntryService';

interface TrophyDetailsProps {
    trophy: Trophy,
    entry: Entry
}

function TrophyNotCompletedMessage() {
    return (
        <View style={{...appStyles.panel, alignItems: 'center', justifyContent: 'space-around', height: 90, overflow: 'hidden'}}>
            <Text style={styles.text}>Trophy is yet to be achieved.</Text>
            <Text style={styles.text}>Keep going!</Text>
            <View style={styles.decoratorLine}/>
        </View>
    )
}

function TrophyDetails({trophy, entry}: TrophyDetailsProps) {
    return (
        <ScrollView>
            <View style={{...appStyles.panel, height: 175, overflow: 'hidden', alignItems: 'center', justifyContent: 'flex-start', flexDirection: 'row'}}>
                <SimpleLineIcons name="trophy"
                                 size={150}
                                 color={trophy.completed ? theme.COLORS.THEME_FONT : theme.COLORS.BACKGROUND_SECONDARY}/>
                <View style={{marginLeft: theme.SPACING.L}}>
                    <Text style={[styles.text, styles.activityText]}>{EntryService.getActivityTypeText(trophy.activity)}</Text>
                    {trophy.distance && <Text style={[styles.text, styles.labelText]}>Distance:</Text>}
                    <DistanceText distance={trophy.distance} style={[styles.text, styles.statsText]}/>
                    {trophy.duration && <Text style={[styles.text, styles.labelText, {marginTop: theme.SPACING.S}]}>Duration:</Text>}
                    <DurationText duration={trophy.duration} style={[styles.text, styles.statsText]}/>
                </View>
            </View>
            {!entry && <TrophyNotCompletedMessage/>}
            {entry && <EntryDetails entry={entry}/>}
        </ScrollView>
    );
}

export default TrophyDetails;

const styles = StyleSheet.create({
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
    decoratorLine: {
        width: '100%',
        height: theme.SPACING.XS,
        marginTop: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY
    }
});
