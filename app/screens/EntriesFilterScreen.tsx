import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import EntriesFilter from '../components/entry/EntriesFilter';

function EntriesFilterScreen() {
    return (
        <View style={appStyles.screenContainer}>
            <EntriesFilter />
        </View>
    );
}

export default EntriesFilterScreen;
