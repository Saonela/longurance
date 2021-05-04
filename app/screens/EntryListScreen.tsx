import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from "react-native";
import appStyles from "../styles";
import theme from "../theme";
import ActivityFilter from '../components/activity-filter/ActivityFilter';
import EntryList from '../components/entry/EntryList';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import HeaderButton from '../components/header/HeaderButton';

function EntryListScreen({navigation}) {
    const navigateToEntryForm = (id?: string) => {
        const params = id ? {id} : {};
        navigation.navigate('entry-form', params);
    };

    const navigateToEntryDetails = (id: string) => {
        navigation.navigate('entry-details', {id});
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <HeaderButton style={{marginRight: theme.SPACING.S}}
                              iconName="plus"
                              onPress={() => navigateToEntryForm()}/>
            )
        });
    }, [navigation]);
    
    return (
        <View style={styles.wrapper}>
            <ActivityFilter style={styles.entriesFilter}/>
            <View style={appStyles.container}>
                <EntryList onPress={navigateToEntryDetails}/>
            </View>
            <TrophyCongratulations/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    entriesFilter: {
        position: 'absolute',
        top: -theme.HEADER_HEIGHT + 10,
        left: theme.SPACING.S,
        zIndex: 10,
        height: '100%',
        elevation: 6
    }
});

export default EntryListScreen;
