import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';
import {Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import {Entry} from '../../types/Entry';
import StatisticsService from '../../services/StatisticsService';
import DurationText from '../shared/DurationText';
import DistanceText from '../shared/DistanceText';

interface TotalStatisticsProps {
    entries: Entry[],
    trophiesCount: number
}

function TotalStatistics({entries, trophiesCount}: TotalStatisticsProps) {
    const duration = StatisticsService.getTotalDuration(entries);
    const distance = StatisticsService.getTotalDistance(entries);

    return (
        <View style={{...appStyles.panel}}>
            <Text style={styles.label}>Total activities</Text>
            <View style={[styles.row, styles.rowMargin]}>
                <Feather name="activity" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <Text style={appStyles.primaryText}>{entries.length}</Text>
            </View>
            <Text style={styles.label}>Total mileage</Text>
            <View style={[styles.row, styles.rowMargin]}>
                <MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <DistanceText distance={distance} placeholder={'-'}/>
            </View>
            <Text style={styles.label}>Total duration</Text>
            <View style={[styles.row, styles.rowMargin]}>
                <MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <DurationText duration={duration} placeholder={'-'}/>
            </View>
            <Text style={styles.label}>Trophies achieved</Text>
            <View style={styles.row}>
                <SimpleLineIcons name="trophy" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY} style={styles.icon}/>
                <Text style={appStyles.primaryText}>{trophiesCount}</Text>
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

export default TotalStatistics;
