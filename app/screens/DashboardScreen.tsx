import React, {useCallback, useLayoutEffect} from 'react';
import {ScrollView, View} from 'react-native';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import appStyles from '../styles';
import Dashboard from '../components/dashboard/Dashboard';
import LatestEntries from '../components/dashboard/LatestEntries';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import LatestTrophies from '../components/dashboard/LatestTrophies';

function DashboardScreen({navigation}) {
    const navigateToEntryForm = useCallback(
        () => navigation.navigate('entry-form', {}),
        [navigation]
    );
    const navigateToEntryList = () => navigation.navigate('entry-list');
    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    const navigateToTrophyForm = () => navigation.navigate('trophy-form', {});
    const navigateToTrophyList = () => navigation.navigate('trophy-list');
    const navigateToTrophyDetails = (id) =>
        navigation.navigate('trophy-details', {id});

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
                <TrophyCongratulations />
            </View>
        </>
    );
}

export default DashboardScreen;
