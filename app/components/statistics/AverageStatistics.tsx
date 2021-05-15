import React from 'react';
import {Entry} from '../../types/Entry';
import StatisticsService from '../../services/StatisticsService';
import StatisticsPanel from './StatisticsPanel';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import theme from '../../theme';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';

interface AverageStatisticsProps {
    entries: Entry[];
    style?: any;
}

function AverageStatistics({entries, style}: AverageStatisticsProps) {
    const duration = StatisticsService.getAverageDuration(entries);
    const distance = StatisticsService.getAverageDistance(entries);

    return (
        <StatisticsPanel style={style}>
            <StatisticsPanel.Label>Average distance</StatisticsPanel.Label>
            <StatisticsPanel.Row>
                <StatisticsPanel.Icon>
                    <MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <DistanceText distance={distance} placeholder={'-'}/>
            </StatisticsPanel.Row>

            <StatisticsPanel.Label>Average duration</StatisticsPanel.Label>
            <StatisticsPanel.Row lastRow>
                <StatisticsPanel.Icon>
                    <MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <DurationText duration={duration} placeholder={'-'}/>
            </StatisticsPanel.Row>
        </StatisticsPanel>
    );
}

export default AverageStatistics;
