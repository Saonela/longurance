import React, {useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import appStyles from '../styles';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import EntryList from '../components/entry/EntryList';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import HeaderButton from '../components/header/HeaderButton';
import Dashboard from '../components/dashboard/Dashboard';
import theme from '../theme';

function EntryListScreen({navigation}) {
    const navigateToEntryForm = () => navigation.navigate('entry-form', {});
    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                height: theme.HEADER_HEIGHT,
                backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
                elevation: 0
            },
            headerLeft: null,
            headerRight: () => (
                <HeaderButton iconName="plus" onPress={navigateToEntryForm} />
            )
        });
    }, [navigation]);

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <Dashboard />
                <EntryList onPress={navigateToEntryDetails} />
                <TrophyCongratulations />
            </View>
        </>
    );
}

export default EntryListScreen;
