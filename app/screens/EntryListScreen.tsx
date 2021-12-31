import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import EntryList from '../components/entry/EntryList';

function EntryListScreen({navigation}) {
    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Entries'
        });
    }, [navigation]);

    return (
        <View style={appStyles.screenContainer}>
            <EntryList onPress={navigateToEntryDetails} />
        </View>
    );
}

export default EntryListScreen;
