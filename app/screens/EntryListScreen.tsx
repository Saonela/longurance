import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import EntryList from '../components/entry/EntryList';
import HeaderButton from '../components/header/HeaderButton';

function EntryListScreen({navigation}) {
    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconName="filter"
                    onPress={() => navigation.navigate('entry-filters')}
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
