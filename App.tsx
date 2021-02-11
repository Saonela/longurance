import React from 'react';
import {useFonts} from "expo-font";
import {Provider} from "react-redux";
import store from './app/redux/store';
import Main from './Main';
import {StatusBar} from 'react-native';
import AppLoading from 'expo-app-loading';

export default function App() {
    const [fontsLoaded] = useFonts({
        'Source-Sans-Pro': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    });

    return (
        <React.Fragment>
            <StatusBar barStyle={'light-content'}/>
            {fontsLoaded ?
                <Provider store={store}>
                    <StatusBar barStyle={'light-content'}/>
                    <Main/>
                </Provider> :
                <AppLoading autoHideSplash={true}/>
            }
        </React.Fragment>
    )
}
