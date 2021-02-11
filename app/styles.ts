import {StyleSheet} from "react-native";
import theme from "./theme";

const appStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.BACKGROUND_BASE,
    },
    panel: {
        padding: theme.SPACING.M,
        margin: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
    },
    primaryText: {
        fontFamily: 'Source-Sans-Pro',
        fontSize: theme.FONT_SIZE.PRIMARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    secondaryText: {
        fontFamily: 'Source-Sans-Pro',
        fontSize: theme.FONT_SIZE.SECONDARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: theme.COLORS.FONT_PRIMARY
    }
});

export default appStyles;
