import React from 'react';
import {Entry} from '../../types/Entry';
import StatisticsService from '../../services/StatisticsService';
import StatisticsPanel from './StatisticsPanel';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import theme from '../../theme';

interface AverageStatisticsProps {
    entries: Entry[];
    style?: any;
}

function AverageStatistics({entries, style}: AverageStatisticsProps) {
    const duration = StatisticsService.getAverageDuration(entries);
    const distance = StatisticsService.getAverageDistance(entries);

    return (
        <StatisticsPanel style={style}>
            <StatisticsPanel.Row>
                <StatisticsPanel.Column>
                    <StatisticsPanel.Label>Average distance</StatisticsPanel.Label>
                    <StatisticsPanel.Row>
                        <StatisticsPanel.Icon>
                            <MaterialCommunityIcons name="map-marker-distance" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                        </StatisticsPanel.Icon>
                        <StatisticsPanel.DistanceText value={distance}/>
                    </StatisticsPanel.Row>
                </StatisticsPanel.Column>

                <StatisticsPanel.Column lastColumn>
                    <StatisticsPanel.Label>Average duration</StatisticsPanel.Label>
                    <StatisticsPanel.Row>
                        <StatisticsPanel.Icon>
                            <MaterialIcons name="timer" size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_PRIMARY}/>
                        </StatisticsPanel.Icon>
                        <StatisticsPanel.DurationText value={duration}/>
                    </StatisticsPanel.Row>
                </StatisticsPanel.Column>
            </StatisticsPanel.Row>
        </StatisticsPanel>
    )
}

export default AverageStatistics;
