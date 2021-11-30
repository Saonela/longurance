import React from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import theme from '../../theme';

function ListLoader(props) {
    return <ActivityIndicator style={styles.loader} size={46} color={theme.COLORS.FONT_PRIMARY} {...props}/>;
}

const styles = StyleSheet.create({
    loader: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: [
            {translateX: -23},
            {translateY: -23}
        ],
        zIndex: 1,
    }
});

export default ListLoader;
