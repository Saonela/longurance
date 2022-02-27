import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import EntryList from '../components/entry/EntryList';
import HeaderButton from '../components/header/HeaderButton';
import {Screen} from '../enums/Screen';

function EntryListScreen({navigation}) {
    const navigateToEntriesFilter = () =>
        navigation.navigate(Screen.ENTRIES_FILTER);
    const navigateToEntryDetails = (id) =>
        navigation.navigate(Screen.ENTRY_DETAILS, {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconName="filter"
                    onPress={navigateToEntriesFilter}
                />
            )
        });
    }, [navigation]);

    return (
        <View style={appStyles.screenContainer}>
            <EntryList onPress={navigateToEntryDetails} />
        </View>
    );
}

export default EntryListScreen;
