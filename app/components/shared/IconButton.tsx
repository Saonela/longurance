import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import theme from '../../theme';

function IconButton({icon, size = 36, style = {}, onPress, noBackground = false}) {
    const backgroundColor = noBackground ? '' : theme.COLORS.BACKGROUND_TERTIARY;
    return (
        <View style={[styles.button, style]}>
            <TouchableNativeFeedback style={{...styles.button}} onPress={onPress}>
                <View style={{...styles.button, width: size, height: size, backgroundColor}}>
                    {icon}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden',
    }
});

export default IconButton;
