import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Entry} from '../../types/Entry';
import appStyles from '../../styles';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import theme from '../../theme';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import StatisticsService from '../../services/StatisticsService';

interface PeakStatisticsProps {
    entries: Entry[];
}

function PeakStatistics({entries}: PeakStatisticsProps) {
    const duration = StatisticsService.getTotalDuration(entries);
    const distance = StatisticsService.getTotalDistance(entries);

    return (
        <View style={{...appStyles.panel}}>
            <Text style={styles.label}>Farthest distance</Text>
            <View style={[styles.row, styles.rowMargin]}>
                <MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <DistanceText distance={distance} placeholder={'-'}/>
            </View>
            <Text style={styles.label}>Longest duration</Text>
            <View style={[styles.row, styles.rowMargin]}>
                <MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <DurationText duration={duration} placeholder={'-'}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    label: {
        ...appStyles.primaryText,
        marginBottom: theme.SPACING.XS,
    },
    icon: {
        marginRight: theme.SPACING.S
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    rowMargin: {
        marginBottom: theme.SPACING.M
    }
});

export default PeakStatistics;
