/* eslint-disable react/jsx-props-no-spreading */
import React, {useEffect} from 'react';
import {
    CardStyleInterpolators,
    createStackNavigator
} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import theme from './app/theme';
import EntryListScreen from './app/screens/EntryListScreen';
import EntryFormScreen from './app/screens/EntryFormScreen';
import TabBar from './app/components/tab-navigation/TabBar';
import TrophyFormScreen from './app/screens/TrophyFormScreen';
import EntryDetailsScreen from './app/screens/EntryDetailsScreen';
import StatisticsScreen from './app/screens/StatisticsScreen';
import useFiltersStore from './app/state/filters';
import {loadEntries} from './app/state/entries';
import {loadActivityFilter} from './app/state/activity-filter';
import DashboardScreen from './app/screens/DashboardScreen';
import {loadTrophies} from './app/state/trophies';
import TrophyDetailsScreen from './app/screens/TrophyDetailsScreen';
import TrophyListScreen from './app/screens/TrophyListScreen';
import EntriesFilterScreen from './app/screens/EntriesFilterScreen';
import TrophiesFilterScreen from './app/screens/TrophiesFilterScreen';
import TimelineScreen from './app/screens/TimelineScreen';
import TimelineDetailsScreen from './app/screens/TimelineDetailsScreen';
import SettingsScreen from './app/screens/SettingsScreen';
import {Screen, TabScreen} from './app/enums/Screen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackScreenOptions = {
    presentation: 'modal',
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    title: '',
    headerStyle: {
        height: theme.HEADER_HEIGHT,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        elevation: 0
    },
    headerTintColor: theme.COLORS.FONT_PRIMARY,
    headerTitleAlign: 'center'
} as any;

const entryDetailsStackScreen = (
    <Stack.Screen
        name={Screen.ENTRY_DETAILS}
        component={EntryDetailsScreen}
        options={{title: 'Entry Details'}}
    />
);

function DashboardScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name={Screen.DASHBOARD} component={DashboardScreen} />
            <Stack.Screen
                name={Screen.ENTRY_LIST}
                component={EntryListScreen}
                options={{title: 'Entries'}}
            />
            <Stack.Screen
                name={Screen.ENTRIES_FILTER}
                component={EntriesFilterScreen}
                options={{title: 'Entries Filter'}}
            />
            {entryDetailsStackScreen}
            <Stack.Screen
                name={Screen.ENTRY_FORM}
                component={EntryFormScreen}
            />
            <Stack.Screen
                name={Screen.TROPHY_LIST}
                component={TrophyListScreen}
                options={{title: 'Trophies'}}
            />
            <Stack.Screen
                name={Screen.TROPHIES_FILTER}
                component={TrophiesFilterScreen}
                options={{title: 'Trophies Settings'}}
            />
            <Stack.Screen
                name={Screen.TROPHY_DETAILS}
                component={TrophyDetailsScreen}
                options={{title: 'Trophy Details'}}
            />
            <Stack.Screen
                name={Screen.TROPHY_FORM}
                component={TrophyFormScreen}
            />
        </Stack.Navigator>
    );
}

function TimelineScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name={Screen.TIMELINE} component={TimelineScreen} />
            <Stack.Screen
                name={Screen.TIMELINE_DETAILS}
                component={TimelineDetailsScreen}
            />
        </Stack.Navigator>
    );
}

function StatisticsScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen
                name={Screen.STATISTICS}
                component={StatisticsScreen}
            />
            {entryDetailsStackScreen}
        </Stack.Navigator>
    );
}

function SettingsScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen
                name={Screen.SETTINGS}
                component={SettingsScreen}
                options={{title: 'Settings'}}
            />
        </Stack.Navigator>
    );
}

const tabScreenOptions = {headerShown: false};

function Main() {
    useEffect(() => {
        loadActivityFilter();
        loadEntries();
        loadTrophies();
        useFiltersStore.getState().loadDashboardTimeInterval();
    }, []);

    return (
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
                <Tab.Screen
                    options={tabScreenOptions}
                    name={TabScreen.DASHBOARD}
                    component={DashboardScreenStack}
                />
                <Tab.Screen
                    options={tabScreenOptions}
                    name={TabScreen.TIMELINE}
                    component={TimelineScreenStack}
                />
                <Tab.Screen
                    options={tabScreenOptions}
                    name={TabScreen.STATISTICS}
                    component={StatisticsScreenStack}
                />
                <Tab.Screen
                    options={tabScreenOptions}
                    name={TabScreen.SETTINGS}
                    component={SettingsScreenStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;
