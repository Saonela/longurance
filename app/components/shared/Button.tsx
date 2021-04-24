import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import theme from '../../theme';
import appStyles from '../../styles';

function Button(props) {
    return (
        <TouchableOpacity {...props} style={styles.button}>
            <Text style={{...appStyles.primaryText}}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingTop: theme.SPACING.S,
        paddingRight: theme.SPACING.L,
        paddingBottom: theme.SPACING.S,
        paddingLeft: theme.SPACING.L,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        elevation: 4
    }
});

export default Button;
