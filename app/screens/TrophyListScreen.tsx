import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import TrophyList from '../components/trophy/TrophyList';
import HeaderButton from '../components/header/HeaderButton';
import {Screen} from '../enums/Screen';

function TrophyListScreen({navigation}) {
    const navigateToTrophyDetails = (id: string) =>
        navigation.navigate(Screen.TROPHY_DETAILS, {id});
    const navigateToTrophiesFilter = () =>
        navigation.navigate(Screen.TROPHIES_FILTER);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconName="filter"
                    onPress={navigateToTrophiesFilter}
                />
            )
        });
    }, [navigation]);

    return (
        <View style={appStyles.screenContainer}>
            <TrophyList onPress={navigateToTrophyDetails} />
        </View>
    );
}

export default TrophyListScreen;
