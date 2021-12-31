import React, {useCallback, useLayoutEffect} from 'react';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import Dashboard from '../components/dashboard/Dashboard';
import LatestEntries from '../components/dashboard/LatestEntries';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';

function DashboardScreen({navigation}) {
    const navigateToEntryForm = useCallback(
        () => navigation.navigate('entry-form', {}),
        [navigation]
    );

    const navigateToEntryDetails = (id) =>
        navigation.navigate('entry-details', {id});

    const navigateToEntryList = () => navigation.navigate('entry-list');

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
                        style={{marginTop: -8}}
                        itemsCount={3}
                        onPress={navigateToEntryDetails}
                        onAddNew={navigateToEntryForm}
                        onSeeMore={navigateToEntryList}
                    />
                    <TrophyCongratulations />
                </ScrollView>
            </View>
        </>
    );
}

export default DashboardScreen;
