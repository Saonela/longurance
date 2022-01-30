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
import HeaderButton from './app/components/header/HeaderButton';
import TabBar from './app/components/tab-navigation/TabBar';
import TrophyFormScreen from './app/screens/TrophyFormScreen';
import EntryDetailsScreen from './app/screens/EntryDetailsScreen';
import StatisticsScreen from './app/screens/StatisticsScreen';
import useFiltersStore from './app/state/filters';
import {loadEntries} from './app/state/entries';
import {loadActivityFilter} from './app/state/activityFilter';
import DashboardScreen from './app/screens/DashboardScreen';
import {loadTrophies} from './app/state/trophies';
import TrophyDetailsScreen from './app/screens/TrophyDetailsScreen';
import TrophyListScreen from './app/screens/TrophyListScreen';
import EntryFiltersScreen from './app/screens/EntryFiltersScreen';
import TrophiesFilterScreen from './app/screens/TrophiesFilterScreen';
import TimelineScreen from './app/screens/TimelineScreen';
import TimelineDetailsScreen from './app/screens/TimelineDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mainStackScreenOptions: any = () => {
    return {
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
    };
};

const stackScreenOptions: any = ({navigation}) => {
    return {
        ...mainStackScreenOptions(navigation),
        headerLeft: () => (
            <HeaderButton
                style={{marginLeft: theme.SPACING.S}}
                iconName="arrow-left"
                onPress={navigation.goBack}
            />
        )
    };
};

function DashboardScreenStack() {
    return (
        <Stack.Navigator screenOptions={mainStackScreenOptions}>
            <Stack.Screen
                name="dashboard"
                component={DashboardScreen}
                options={{}}
            />
            <Stack.Screen
                name="entry-list"
                component={EntryListScreen}
                options={{}}
            />
            <Stack.Screen
                name="entry-filters"
                component={EntryFiltersScreen}
                options={{title: 'Entries Filter'}}
            />
            <Stack.Screen
                name="entry-details"
                component={EntryDetailsScreen}
                options={{}}
            />
            <Stack.Screen
                name="entry-form"
                component={EntryFormScreen}
                options={{}}
            />
            <Stack.Screen
                name="trophy-list"
                component={TrophyListScreen}
                options={{title: 'Trophies'}}
            />
            <Stack.Screen
                name="trophies-filter"
                component={TrophiesFilterScreen}
                options={{title: 'Trophies Settings'}}
            />
            <Stack.Screen
                name="trophy-details"
                component={TrophyDetailsScreen}
                options={{}}
            />
            <Stack.Screen
                name="trophy-form"
                component={TrophyFormScreen}
                options={{}}
            />
        </Stack.Navigator>
    );
}

function TimelineScreenStack() {
    return (
        <Stack.Navigator screenOptions={mainStackScreenOptions}>
            <Stack.Screen
                name="timeline"
                component={TimelineScreen}
                options={{}}
            />
            <Stack.Screen
                name="timeline-details"
                component={TimelineDetailsScreen}
                options={{}}
            />
        </Stack.Navigator>
    );
}

function StatisticsScreenStack() {
    return (
        <Stack.Navigator screenOptions={mainStackScreenOptions}>
            <Stack.Screen
                name="statistics"
                component={StatisticsScreen}
                options={{}}
            />
            <Stack.Screen
                name="entry-details"
                component={EntryDetailsScreen}
                options={{}}
            />
        </Stack.Navigator>
    );
}

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
                    options={{headerShown: false}}
                    name="Dashboard"
                    component={DashboardScreenStack}
                />
                <Tab.Screen
                    options={{headerShown: false}}
                    name="Timeline"
                    component={TimelineScreenStack}
                />
                <Tab.Screen
                    options={{headerShown: false}}
                    name="Statistics"
                    component={StatisticsScreenStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;
