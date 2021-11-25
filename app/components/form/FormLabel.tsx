import React from 'react';
import {StyleSheet, Text} from 'react-native';
import appStyles from '../../styles';

function FormLabel({children}) {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        ...appStyles.secondaryText,
    }
});

export default FormLabel;
