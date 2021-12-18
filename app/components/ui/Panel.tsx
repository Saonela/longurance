/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {StyleSheet, TextStyle, View, ViewProps} from 'react-native';
import theme from '../../theme';

interface PanelProps {
    children: React.ReactNode;
    style?: TextStyle;
    props?: ViewProps;
}

function Panel({children, props}: PanelProps) {
    return (
        <View {...props} style={styles.panel}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        padding: theme.SPACING.L,
        marginTop: theme.SPACING.M,
        marginRight: theme.SPACING.M,
        marginLeft: theme.SPACING.M,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
        overflow: 'hidden'
    }
});

export default Panel;
