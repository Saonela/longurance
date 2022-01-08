import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import PeakStatistics from '../components/statistics/PeakStatistics';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import {useActivityFilterStore} from '../state/activityFilter';
import {getEntries, useEntriesStore} from '../state/entries';
import AverageStatistics from '../components/statistics/AverageStatistics';

function StatisticsScreen({navigation}) {
    const {filter} = useActivityFilterStore();
    const entries = useEntriesStore((state) => getEntries(state, filter));

    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    {/* <TotalStatistics */}
                    {/*     entries={entries} */}
                    {/*     trophiesCount={trophies.length} */}
                    {/* /> */}
                    <PeakStatistics
                        entries={entries}
                        onPress={navigateToEntryDetails}
                    />
                    <AverageStatistics entries={entries} />
                    {/* <StatisticsChart entries={entries} /> */}
                </ScrollView>
            </View>
        </>
    );
}

export default StatisticsScreen;
