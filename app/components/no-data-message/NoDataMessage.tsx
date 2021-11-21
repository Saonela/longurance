import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import appStyles from '../../styles';

function NoDataMessage({children, ...props}) {
    return (
        <View style={styles.message} {...props}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    message: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        ...appStyles.primaryText,
    }
});

export default NoDataMessage;
