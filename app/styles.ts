import {StyleSheet} from 'react-native';
import theme from './theme';

const appStyles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        paddingBottom: theme.TAB_NAVIGATOR_HEIGHT,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY
    },
    panel: {
        padding: theme.SPACING.L,
        marginTop: theme.SPACING.M,
        marginRight: theme.SPACING.M,
        marginLeft: theme.SPACING.M,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
    },
    primaryText: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.PRIMARY,
        color: theme.COLORS.FONT_PRIMARY
    },
    secondaryText: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        fontSize: theme.FONT_SIZE.SECONDARY,
        color: theme.COLORS.FONT_SECONDARY
    },
    inputField: {
        borderBottomWidth: 1,
        borderBottomColor: theme.COLORS.FONT_PRIMARY
    }
});

export default appStyles;
