import React from "react";
import {StyleSheet, View} from "react-native";
import theme from "../../theme";

function EntryListHeader(props) {
    return (
        <View style={styles.header}/>
    );
}

const styles = StyleSheet.create({
    header: {
        zIndex: 1,
        display: 'flex',
        justifyContent: 'center',
        minWidth: '100%',
        height: theme.HEADER_HEIGHT,
        paddingLeft: theme.SPACING.S,
        paddingRight: theme.SPACING.S,
        borderBottomColor: theme.COLORS.BACKGROUND_BASE,
        borderBottomWidth: 1,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
    },
    createButton: {
        position: 'absolute',
        top: 20,
        right: theme.SPACING.M
    }
});

export default EntryListHeader;
