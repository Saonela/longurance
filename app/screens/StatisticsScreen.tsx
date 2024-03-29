import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import TotalStatistics from '../components/statistics/TotalStatistics';
import AverageStatistics from '../components/statistics/AverageStatistics';
import PeakStatistics from '../components/statistics/PeakStatistics';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import {useActivityFilterStore} from '../state/activity-filter';
import {getEntriesByActivity, useEntriesStore} from '../state/entries';
import {getTrophiesByState, useTrophiesStore} from '../state/trophies';
import {Screen} from '../enums/Screen';
import utils from '../styles-utilities';

function StatisticsScreen({navigation}) {
    const {filter} = useActivityFilterStore();
    const entries = [
        ...useEntriesStore(getEntriesByActivity(filter))
    ].reverse();
    const trophies = useTrophiesStore(getTrophiesByState(true));

    const navigateToEntryDetails = (id) =>
        navigation.navigate(Screen.ENTRY_DETAILS, {id});

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView contentContainerStyle={utils.paddingBottomM}>
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
