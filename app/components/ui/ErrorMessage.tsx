import React from 'react';
import {StyleSheet, TextStyle} from 'react-native';
import * as Animatable from 'react-native-animatable';
import theme from '../../theme';

interface ErrorMessageProps {
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
}

function ErrorMessage({children, style = {}}: ErrorMessageProps) {
    return (
        <Animatable.Text style={[styles.error, style]} animation="shake">
            {children}
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
