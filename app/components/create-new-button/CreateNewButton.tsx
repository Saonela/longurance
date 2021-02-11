import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from "react-native";
import { Feather } from '@expo/vector-icons';
import theme from "../../theme";

function CreateNewButton({style, onPress}) {
    return (
        <View style={[styles.button, style]}>
            <TouchableNativeFeedback style={styles.button} onPress={onPress}>
                <View style={styles.button}>
                     <Feather style={styles.icon} name="plus" size={32} color="black"/>
                 </View>
            </TouchableNativeFeedback>
         </View>
    );
}

const styles = StyleSheet.create({
    icon: {
        color: theme.COLORS.FONT_PRIMARY
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 50,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        overflow: 'hidden',
    }
});

export default CreateNewButton;
