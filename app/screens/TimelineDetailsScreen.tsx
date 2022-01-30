import React, {useLayoutEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import appStyles from '../styles';
import EntryDetails from '../components/entry/EntryDetails';
import {deleteEntry, getEntry, useEntriesStore} from '../state/entries';
import {Entry} from '../types/Entry';
import {
    getEntryIndividualTrophies,
    updateCompletedTrophies,
    useTrophiesStore
} from '../state/trophies';
import theme from '../theme';
import TrophyCardLite from '../components/trophy/TrophyCardLite';
import TimelineDetails from '../components/timeline/TimelineDetails';

function TimelineDetailsScreen({route, navigation}) {
    console.log('TimelineDetailsScreen', route.params);
    const item = route.params;

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView>
                <TimelineDetails item={item} />
            </ScrollView>
            {/* <ScrollView */}
            {/*     contentContainerStyle={{paddingBottom: theme.SPACING.M}} */}
            {/* > */}
            {/*     {entry && <EntryDetails entry={entry} />} */}
            {/*     {trophies.map((trophy) => ( */}
            {/*         <TrophyCardLite key={trophy.id} trophy={trophy} /> */}
            {/*     ))} */}
            {/* </ScrollView> */}
        </View>
    );
}

export default TimelineDetailsScreen;
