import React from 'react';
import {StyleSheet, View} from "react-native";
import appStyles from "../styles";
import TotalStatistics from '../components/statistics/TotalStatistics';
import {useSelector} from 'react-redux';
import {getEntries} from '../redux/slices/entriesSlice';
import {getTrophies} from '../redux/slices/trophiesSlice';
import PeakStatistics from '../components/statistics/PeakStatistics';
import AverageStatistics from '../components/statistics/AverageStatistics';

function StatisticsScreen({navigation}) {
    const entries = useSelector(getEntries)
    const trophies = useSelector(getTrophies)

    return (
        <View style={styles.wrapper}>
            <View style={appStyles.container}>
                <TotalStatistics entries={entries} trophiesCount={trophies.length}/>
                <PeakStatistics entries={entries}/>
                <AverageStatistics entries={entries}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default StatisticsScreen;
