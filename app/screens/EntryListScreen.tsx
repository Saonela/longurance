import React, {useLayoutEffect} from 'react';
import {View} from "react-native";
import appStyles from "../styles";
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import EntryList from '../components/entry/EntryList';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import HeaderButton from '../components/header/HeaderButton';

function EntryListScreen({navigation}) {
    const navigateToEntryForm = () => navigation.navigate('entry-form', {});
    const navigateToEntryDetails = id => navigation.navigate('entry-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => <HeaderButton iconName="plus" onPress={navigateToEntryForm}/>
        });
    }, [navigation]);

    return (
        <>
            <HeaderActivityFilter/>
            <View style={appStyles.screenContainer}>
                <EntryList onPress={navigateToEntryDetails}/>
                <TrophyCongratulations/>
            </View>
        </>
    );
}

export default EntryListScreen;
