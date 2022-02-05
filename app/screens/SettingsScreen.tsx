import React from 'react';
import {View} from 'react-native';
import appStyles from '../styles';
import About from '../components/settings/About';

function SettingsScreen() {
    return (
        <View style={appStyles.screenContainer}>
            <About />
        </View>
    );
}

export default SettingsScreen;
