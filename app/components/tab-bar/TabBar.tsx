import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import theme from '../../theme';
import {Feather} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import appStyles from '../../styles';


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

const AnimatedTabIcon = (iconName, textColor) => (
    <Animatable.View animation={zoomIn}
                     duration={300}
                     useNativeDriver>
        {TabIcon(iconName, textColor)}
    </Animatable.View>
)

const TabIcon = (iconName, textColor) => (
    <Feather name={iconName} size={24} color={textColor}/>
);

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

function TabBar({state, descriptors, navigation}) {

    const onPress = (route, isFocused) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
        });

        if (!isFocused && !event.defaultPrevented) {
            if (route.name === 'Entries') {
                navigation.navigate(route.name, {screen: 'entry-list'});
            } else if (route.name === 'Trophies') {
                navigation.navigate(route.name, {screen: 'trophy-list'});
            } else {
                navigation.navigate(route.name);
            }
        }
    };

    const onLongPress = (route) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) =>
                <TabButton key={index}
                           route={route}
                           options={descriptors[route.key]}
                           isFocused={state.index === index}
                           onPress={() => onPress(route, state.index === index)}
                           onLongPress={() => onLongPress(route)}/>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: theme.COLORS.BACKGROUND_BASE,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: theme.TAB_NAVIGATOR_HEIGHT,
    },
    text: {

    }
});

export default TabBar;
