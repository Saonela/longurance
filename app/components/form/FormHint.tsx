import React from 'react';
import {StyleSheet, Text} from 'react-native';
import theme from '../../theme';
import appStyles from '../../styles';

function FormHint({children}) {
    return (
        <Text style={styles.text}>{children}</Text>
    );
}

const styles = StyleSheet.create({
    text: {
        ...appStyles.secondaryText,
        paddingTop: theme.SPACING.S
    }
});

export default FormHint;
