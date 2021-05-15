import React from 'react';
import {ScrollView} from "react-native";
import appStyles from "../styles";
import TotalStatistics from '../components/statistics/TotalStatistics';
import {useSelector} from 'react-redux';
import {getEntries} from '../redux/slices/entriesSlice';
import {getTrophies} from '../redux/slices/trophiesSlice';
import PeakStatistics from '../components/statistics/PeakStatistics';
import AverageStatistics from '../components/statistics/AverageStatistics';
import theme from '../theme';

function StatisticsScreen({navigation}) {
    const entries = useSelector(getEntries)
    const trophies = useSelector(getTrophies)

    return (
        <ScrollView style={appStyles.container}>
            <TotalStatistics entries={entries} trophiesCount={trophies.length}/>
            <PeakStatistics entries={entries}/>
            <AverageStatistics entries={entries} style={{marginBottom: theme.SPACING.M}}/>
        </ScrollView>
    );
}

export default StatisticsScreen;
