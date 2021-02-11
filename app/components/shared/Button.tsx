import React from 'react';
import {Button as DefaultButton, StyleSheet} from 'react-native';
import theme from '../../theme';

function Button(props) {
    return (
        <DefaultButton {...props} style={styles}/>
    );
}

const styles = StyleSheet.create({
    button: {
        color: theme.COLORS.FONT_PRIMARY
    }
});

export default Button;
