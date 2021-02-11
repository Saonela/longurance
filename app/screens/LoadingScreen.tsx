import React from 'react';
import appStyles from "../styles";
import {ActivityIndicator, View} from "react-native";
import theme from '../theme';

function LoadingScreen() {
    return (
        <View style={{...appStyles.container, ...{justifyContent: 'center'}}}>
            <ActivityIndicator size={50} color={theme.COLORS.FONT_PRIMARY} />
        </View>
    );
}

export default LoadingScreen;
