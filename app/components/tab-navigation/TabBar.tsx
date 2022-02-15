import React from 'react';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';
import TabButton from './TabButton';
import {Screen, TabScreen} from '../../enums/Screen';

function TabBar({state, descriptors, navigation}) {
    const onPress = (route, isFocused) => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key
        });

        if (!isFocused && !event.defaultPrevented) {
            if (route.name === TabScreen.DASHBOARD) {
                navigation.navigate(route.name, {screen: Screen.DASHBOARD});
            } else if (route.name === TabScreen.TIMELINE) {
                navigation.navigate(route.name, {screen: Screen.TIMELINE});
            } else {
                navigation.navigate(route.name);
            }
        }
    };

    const onLongPress = (route) => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key
        });
    };

    return (
        <View style={styles.tabBar}>
            {state.routes.map((route, index) => (
                <TabButton
                    key={index}
                    route={route}
                    options={descriptors[route.key]}
                    isFocused={state.index === index}
                    onPress={() => onPress(route, state.index === index)}
                    onLongPress={() => onLongPress(route)}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: -1,
        right: -1,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: theme.SPACING.SM,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY
    }
});

export default TabBar;
