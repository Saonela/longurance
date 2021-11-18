import theme from '../../theme';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import appStyles from '../../styles';
import React from 'react';
import * as Animatable from 'react-native-animatable';
import {Feather} from '@expo/vector-icons';

const zoomIn = {
    0: {
        opacity: 1,
        scale: 1,
    },
    0.5: {
        opacity: 1.05,
        scale: 1,
    },
    1: {
        opacity: 1,
        scale: 1.1
    },
};

const TabIcon = (iconName, textColor) => (
    <Feather name={iconName} size={24} color={textColor}/>
);

const AnimatedTabIcon = (iconName, textColor) => (
    <Animatable.View animation={zoomIn}
                     duration={300}
                     useNativeDriver>
        {TabIcon(iconName, textColor)}
    </Animatable.View>
)

function TabButton({route, options, isFocused, onPress, onLongPress}) {
    const label = options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
            ? options.title
            : route.name;

    const textColor = isFocused ? theme.COLORS.FONT_PRIMARY : theme.COLORS.FONT_SECONDARY;

    let iconName;
    if (route.name === 'Entries') {
        iconName = 'list';
    }
    if (route.name === 'Trophies') {
        iconName = 'award';
    }
    if (route.name === 'Statistics') {
        iconName = 'bar-chart';
    }

    return (
        <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}>
            {isFocused
                ? AnimatedTabIcon(iconName, textColor)
                : TabIcon(iconName, textColor)
            }
            <Text style={{...appStyles.secondaryText, color: textColor, marginTop: 2}}>
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
    }
});

export default TabButton
