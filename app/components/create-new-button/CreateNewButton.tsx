import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from "react-native";
import { Feather } from '@expo/vector-icons';
import theme from "../../theme";

function CreateNewButton({style = {}, onPress}) {
    return (
        <View style={[styles.button, styles.container, style]}>
            <TouchableNativeFeedback style={styles.button} onPress={() => onPress()}>
                <View style={styles.button}>
                     <Feather style={styles.icon} name="plus" size={32} color="black"/>
                 </View>
            </TouchableNativeFeedback>
         </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 10,
        right: theme.SPACING.M,
        zIndex: 1
    },
    icon: {
        color: theme.COLORS.FONT_PRIMARY
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        overflow: 'hidden',
        elevation: 24,
    }
});

export default CreateNewButton;
