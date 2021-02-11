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
        minWidth: '100%',
        height: theme.HEADER_HEIGHT,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
        borderBottomColor: theme.COLORS.BACKGROUND_BASE,
        borderBottomWidth: 1,
        zIndex: 1
    },
    createButton: {
        position: 'absolute',
        top: 20,
        right: theme.SPACING.M
    }
});

export default EntryListHeader;
