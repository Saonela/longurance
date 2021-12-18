import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';
import {Trophy} from '../../types/Trophy';
import {Entry} from '../../types/Entry';
import EntryDetails from '../entry/EntryDetails';
import theme from '../../theme';
import TrophyDetailsPanel from './TrophyDetailsPanel';

interface TrophyDetailsProps {
    trophy: Trophy;
    entry: Entry;
}

function TrophyNotCompletedMessage() {
    return (
        <View style={styles.container}>
            <Text style={appStyles.primaryText}>
                Trophy is yet to be achieved.
            </Text>
            <Text style={appStyles.primaryText}>Keep going!</Text>
            <View style={styles.decoratorLine} />
        </View>
    );
}

function TrophyDetails({trophy, entry}: TrophyDetailsProps) {
    return (
        <ScrollView>
            <TrophyDetailsPanel trophy={trophy} />
            {!entry && <TrophyNotCompletedMessage />}
            {entry && <EntryDetails entry={entry} trophies={[]} />}
        </ScrollView>
    );
}

export default TrophyDetails;

const styles = StyleSheet.create({
    container: {
        ...appStyles.panel,
        alignItems: 'center',
        justifyContent: 'space-around',
        height: 90,
        overflow: 'hidden'
    },
    decoratorLine: {
        width: '100%',
        height: theme.SPACING.XS,
        marginTop: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY
    }
});
