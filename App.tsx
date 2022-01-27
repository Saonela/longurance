import React from 'react';
import {useFonts} from 'expo-font';
import {StatusBar} from 'react-native';
import AppLoading from 'expo-app-loading';
import Main from './Main';

export default function App() {
    const [fontsLoaded] = useFonts({
        Lato: require('./assets/fonts/Lato-Regular.ttf'),
        LatoBlack: require('./assets/fonts/Lato-Black.ttf')
    });
    return (
        <>
            <StatusBar barStyle="light-content" />
            {fontsLoaded ? (
                <>
                    <StatusBar barStyle="light-content" />
                    <Main />
                </>
            ) : (
                <AppLoading autoHideSplash />
            )}
        </>
    );
}
