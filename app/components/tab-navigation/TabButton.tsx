import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Feather} from '@expo/vector-icons';
import appStyles from '../../styles';
import theme from '../../theme';

const zoomIn = {
    from: {
        translateY: 0,
        scale: 1
    },
    to: {
        translateY: -3,
        scale: 1.2
    }
};

const zoomOut = {
    from: {
        translateY: -3,
        scale: 1.2
    },
    to: {
        translateY: 0,
        scale: 1
    }
};

const routeIcon = {
    Dashboard: 'home',
    Timeline: 'activity',
    Statistics: 'bar-chart'
};

function TabButton({route, options, isFocused, onPress, onLongPress}) {
    const label = options.tabBarLabel || options.title || route.name;
    const textColor = isFocused
        ? theme.COLORS.FONT_PRIMARY
        : theme.COLORS.FONT_SECONDARY;
    const iconName = routeIcon[route.name];

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{...styles.tab}}
        >
            <Animatable.View
                animation={isFocused ? zoomIn : zoomOut}
                duration={175}
                useNativeDriver
            >
                <Feather name={iconName} size={24} color={textColor} />
            </Animatable.View>
            <Text
                style={{
                    ...appStyles.secondaryText,
                    color: textColor,
                    marginTop: 2
                }}
            >
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.TAB_NAVIGATOR_HEIGHT,
        paddingTop: 2
    }
});

export default TabButton;
