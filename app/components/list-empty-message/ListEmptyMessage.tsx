import React from 'react';
import { Feather } from '@expo/vector-icons';
import theme from '../../theme';
import {StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';

function ListEmptyMessage({message, iconName = 'activity', ...props}) {
    return (
        <View style={styles.message} {...props}>
            <Feather name={iconName} size={theme.ICON_SIZE.M} color={theme.COLORS.FONT_SECONDARY}/>
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '70%'
    },
    text: {
        ...appStyles.primaryText,
        marginLeft: theme.SPACING.M,
        color: theme.COLORS.FONT_SECONDARY
    }
});

export default ListEmptyMessage;
