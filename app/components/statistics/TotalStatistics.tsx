import React from 'react';
import theme from '../../theme';
import {Feather, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons} from '@expo/vector-icons';
import {Entry} from '../../types/Entry';
import StatisticsService from '../../services/StatisticsService';
import DurationText from '../shared/DurationText';
import DistanceText from '../shared/DistanceText';
import StatisticsPanel from './StatisticsPanel';

interface TotalStatisticsProps {
    entries: Entry[];
    trophiesCount: number;
}

function TotalStatistics({entries, trophiesCount}: TotalStatisticsProps) {
    const duration = StatisticsService.getTotalDuration(entries);
    const distance = StatisticsService.getTotalDistance(entries);

    return (
        <StatisticsPanel>
            <StatisticsPanel.Label>Total activities</StatisticsPanel.Label>
            <StatisticsPanel.Row>
                <StatisticsPanel.Icon>
                    <Feather name="activity" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <StatisticsPanel.Text>{entries.length}</StatisticsPanel.Text>
            </StatisticsPanel.Row>

            <StatisticsPanel.Label>Total mileage</StatisticsPanel.Label>
            <StatisticsPanel.Row>
                <StatisticsPanel.Icon>
                    <MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <DistanceText distance={distance} placeholder={'-'}/>
            </StatisticsPanel.Row>

            <StatisticsPanel.Label>Total duration</StatisticsPanel.Label>
            <StatisticsPanel.Row>
                <StatisticsPanel.Icon>
                    <MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <DurationText duration={duration} placeholder={'-'}/>
            </StatisticsPanel.Row>

            <StatisticsPanel.Label>Trophies achieved</StatisticsPanel.Label>
            <StatisticsPanel.Row lastRow>
                <StatisticsPanel.Icon>
                    <SimpleLineIcons name="trophy" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                </StatisticsPanel.Icon>
                <StatisticsPanel.Text>{trophiesCount}</StatisticsPanel.Text>
            </StatisticsPanel.Row>
        </StatisticsPanel>
    );
}

export default TotalStatistics;