import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import TrophiesFilter from '../components/trophy/TrophiesFilter';

function TrophiesFilterScreen() {
    return (
        <View style={appStyles.screenContainer}>
            <TrophiesFilter />
        </View>
    );
}

export default TrophiesFilterScreen;
