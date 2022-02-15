import React, {useCallback, useLayoutEffect} from 'react';
import {ScrollView, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import appStyles from '../styles';
import Dashboard from '../components/dashboard/Dashboard';
import LatestEntries from '../components/dashboard/LatestEntries';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import LatestTrophies from '../components/dashboard/LatestTrophies';
import {Screen} from '../enums/Screen';

function DashboardScreen({navigation}) {
    const isFocused = useIsFocused();

    const navigateToEntryForm = useCallback(
        () => navigation.navigate(Screen.ENTRY_FORM, {}),
        [navigation]
    );
    const navigateToEntryList = () => navigation.navigate(Screen.ENTRY_LIST);

    const navigateToEntryDetails = (id) =>
        navigation.navigate(Screen.ENTRY_DETAILS, {id});

    const navigateToTrophyForm = () =>
        navigation.navigate(Screen.TROPHY_FORM, {});

    const navigateToTrophyList = () => navigation.navigate(Screen.TROPHY_LIST);

    const navigateToTrophyDetails = (id) =>
        navigation.navigate(Screen.TROPHY_DETAILS, {id});

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
    }, [navigation, navigateToEntryForm]);

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    <Dashboard />
                    <LatestEntries
                        style={{marginTop: -8, marginBottom: theme.SPACING.XL}}
                        itemsCount={3}
                        onPress={navigateToEntryDetails}
                        onAddNew={navigateToEntryForm}
                        onSeeMore={navigateToEntryList}
                    />
                    <LatestTrophies
                        itemsCount={3}
                        onPress={navigateToTrophyDetails}
                        onAddNew={navigateToTrophyForm}
                        onSeeMore={navigateToTrophyList}
                    />
                </ScrollView>
                {isFocused && <TrophyCongratulations />}
            </View>
        </>
    );
}

export default DashboardScreen;
