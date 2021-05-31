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
import StatisticsChart from '../components/statistics/StatisticsChart';
import ActivityFilter from '../components/activity-filter/ActivityFilter';
import {getEntriesFilter} from '../redux/slices/entriesFilterSlice';

function StatisticsScreen({navigation}) {
    const filter = useSelector(getEntriesFilter);
    const entries = useSelector(getEntries)
    const trophies = useSelector(getTrophies)

    return (
        <>
            <ActivityFilter/>
            <ScrollView style={appStyles.container}>
                <TotalStatistics entries={entries} trophiesCount={trophies.length}/>
                <PeakStatistics entries={entries}/>
                <AverageStatistics entries={entries} style={{marginBottom: theme.SPACING.M}}/>
                {filter && <StatisticsChart entries={entries}/>}
            </ScrollView>
        </>
    );
}

export default StatisticsScreen;
