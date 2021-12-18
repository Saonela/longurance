import React from 'react';
import {Entry} from '../../types/Entry';
import {MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import theme from '../../theme';
import StatisticsService from '../../services/StatisticsService';
import StatisticsPanel from './StatisticsPanel';

interface PeakStatisticsProps {
    entries: Entry[];
}

function PeakStatistics({entries}: PeakStatisticsProps) {
    const duration = StatisticsService.getLongestDuration(entries);
    const distance = StatisticsService.getFarthestDistance(entries);

    return (
        <StatisticsPanel>
            <StatisticsPanel.Row>
                <StatisticsPanel.Column>
                    <StatisticsPanel.Label>
                        Farthest distance
                    </StatisticsPanel.Label>
                    <StatisticsPanel.Row>
                        <StatisticsPanel.Icon>
                            <MaterialCommunityIcons
                                name="map-marker-distance"
                                size={theme.ICON_SIZE.M}
                                color={theme.COLORS.FONT_PRIMARY}
                            />
                        </StatisticsPanel.Icon>
                        <StatisticsPanel.DistanceText value={distance} />
                    </StatisticsPanel.Row>
                </StatisticsPanel.Column>

                <StatisticsPanel.Column lastColumn>
                    <StatisticsPanel.Label>
                        Longest duration
                    </StatisticsPanel.Label>
                    <StatisticsPanel.Row>
                        <StatisticsPanel.Icon>
                            <MaterialIcons
                                name="timer"
                                size={theme.ICON_SIZE.M}
                                color={theme.COLORS.FONT_PRIMARY}
                            />
                        </StatisticsPanel.Icon>
                        <StatisticsPanel.DurationText value={duration} />
                    </StatisticsPanel.Row>
                </StatisticsPanel.Column>
            </StatisticsPanel.Row>
        </StatisticsPanel>
    );
}

export default PeakStatistics;
