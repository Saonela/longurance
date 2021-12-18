import React from 'react';
import {StyleSheet} from 'react-native';
import theme from '../../theme';
import * as Animatable from 'react-native-animatable';

function ErrorMessage({message, style = {}}) {
    return (
        <Animatable.Text style={{...styles.error, ...style}} animation="shake">
            {message}
        </Animatable.Text>
    );
}

const styles = StyleSheet.create({
    error: {
        color: theme.COLORS.FONT_DANGER,
        fontSize: theme.FONT_SIZE.SECONDARY
    }
});

export default ErrorMessage;
