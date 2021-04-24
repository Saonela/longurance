import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import theme from '../../theme';

function FormSubText({text, style = {}}) {
    return (
        <View style={[styles.container, style]}>
            <SimpleLineIcons name="question" size={theme.ICON_SIZE.S} color={theme.COLORS.FONT_SECONDARY} style={{marginRight: theme.SPACING.S}}/>
            <Text style={styles.text}>{text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontSize: theme.FONT_SIZE.SECONDARY,
        color: theme.COLORS.FONT_SECONDARY
    }
});

export default FormSubText;
