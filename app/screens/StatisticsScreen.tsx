import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import TotalStatistics from '../components/statistics/TotalStatistics';
import {useSelector} from 'react-redux';
import {getEntries} from '../redux/slices/entriesSlice';
import {getFilteredCompletedTrophies} from '../redux/slices/trophiesSlice';
import PeakStatistics from '../components/statistics/PeakStatistics';
import AverageStatistics from '../components/statistics/AverageStatistics';
import theme from '../theme';
import StatisticsChart from '../components/statistics/StatisticsChart';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';

function StatisticsScreen({navigation}) {
    const entries = useSelector(getEntries);
    const trophies = useSelector(getFilteredCompletedTrophies);

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    <TotalStatistics
                        entries={entries}
                        trophiesCount={trophies.length}
                    />
                    <PeakStatistics entries={entries} />
                    <AverageStatistics
                        entries={entries}
                        style={{marginBottom: theme.SPACING.M}}
                    />
                    <StatisticsChart entries={entries} />
                </ScrollView>
            </View>
        </>
    );
}

export default StatisticsScreen;
