import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import TrophyList from '../components/trophy/TrophyList';
import HeaderButton from '../components/header/HeaderButton';

function TrophyListScreen({navigation}) {
    const navigateToTrophyDetails = (id: string) =>
        navigation.navigate('trophy-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconName="filter"
                    onPress={() => navigation.navigate('trophies-filter')}
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
