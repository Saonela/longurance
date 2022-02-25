/* eslint-disable global-require */
import React from 'react';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import Main from './Main';

export default function App() {
    const [fontsLoaded] = useFonts({
        Lato: require('./assets/fonts/Lato-Regular.ttf'),
        LatoBlack: require('./assets/fonts/Lato-Black.ttf')
    });
    if (!fontsLoaded) {
        return <AppLoading autoHideSplash />;
    }
    return <Main />;
}
