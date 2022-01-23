import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import EntryFilters from '../components/entry/EntryFilters';

function EntryFiltersScreen() {
    return (
        <View style={appStyles.screenContainer}>
            <EntryFilters />
        </View>
    );
}

export default EntryFiltersScreen;
