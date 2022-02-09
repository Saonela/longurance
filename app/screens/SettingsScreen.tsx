import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import About from '../components/settings/About';
import ImportExport from '../components/settings/ImportExport';

function SettingsScreen() {
    return (
        <View style={appStyles.screenContainer}>
            <About />
            <ImportExport />
        </View>
    );
}

export default SettingsScreen;
