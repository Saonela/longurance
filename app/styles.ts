import {StyleSheet} from "react-native";
import theme from "./theme";

const appStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingBottom: theme.TAB_NAVIGATOR_HEIGHT,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY
    },
    panel: {
        padding: theme.SPACING.M,
        marginTop: theme.SPACING.M,
        marginRight: theme.SPACING.S,
        marginLeft: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
    },
    primaryText: {
        fontFamily: 'Lato',
        fontSize: theme.FONT_SIZE.PRIMARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    secondaryText: {
        fontFamily: 'Lato',
        fontSize: theme.FONT_SIZE.SECONDARY,
        color: theme.COLORS.FONT_SECONDARY
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: theme.COLORS.FONT_PRIMARY
    }
});

export default appStyles;
