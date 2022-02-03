import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import TotalStatistics from '../components/statistics/TotalStatistics';
import AverageStatistics from '../components/statistics/AverageStatistics';
import PeakStatistics from '../components/statistics/PeakStatistics';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import {useActivityFilterStore} from '../state/activity-filter';
import {getEntries, useEntriesStore} from '../state/entries';
import {getTrophiesByState, useTrophiesStore} from '../state/trophies';

function StatisticsScreen({navigation}) {
    const {filter} = useActivityFilterStore();
    const entries = useEntriesStore((state) => getEntries(state, filter));
    const trophies = useTrophiesStore(getTrophiesByState(true));

    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    <TotalStatistics
                        entries={entries}
                        trophiesCount={trophies.length}
                    />
                    <AverageStatistics entries={entries} />
                    <PeakStatistics
                        entries={entries}
                        onPress={navigateToEntryDetails}
                    />
                </ScrollView>
            </View>
        </>
    );
}

export default StatisticsScreen;
