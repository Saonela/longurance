import React, {useLayoutEffect} from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import TrophyList from '../components/trophy/TrophyList';

function TrophyListScreen({navigation}) {
    const navigateToTrophyDetails = (id: string) =>
        navigation.navigate('trophy-details', {id});

    useLayoutEffect(() => {
        navigation.setOptions({});
    }, [navigation]);

    return (
        <View style={appStyles.screenContainer}>
            <TrophyList onPress={navigateToTrophyDetails} />
        </View>
    );
}

export default TrophyListScreen;
