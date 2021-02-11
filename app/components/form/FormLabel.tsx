import React from 'react';
import {StyleSheet, Text} from 'react-native';
import appStyles from '../../styles';
import theme from '../../theme';

function FormLabel({label}) {
    return (
        <Text style={styles.label}>{label}</Text>
    );
}

const styles = StyleSheet.create({
    label: {
        ...appStyles.secondaryText,
        paddingTop: theme.SPACING.S
    }
});

export default FormLabel;
