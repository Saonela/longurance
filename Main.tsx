import React, {useEffect} from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './app/theme';
import EntryListScreen from './app/screens/EntryListScreen';
import EntryFormScreen from './app/screens/EntryFormScreen';
import {DarkTheme, NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loadEntries} from './app/redux/slices/entriesSlice';
import HeaderButton from './app/components/header/HeaderButton';
import TrophyListScreen from './app/screens/TrophyListScreen';
import TabBar from './app/components/tab-navigation/TabBar';
import TrophyFormScreen from './app/screens/TrophyFormScreen';
import EntryDetailsScreen from './app/screens/EntryDetailsScreen';
import TrophyDetailsScreen from './app/screens/TrophyDetailsScreen';
import {loadTrophies} from './app/redux/slices/trophiesSlice';
import StatisticsScreen from './app/screens/StatisticsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const mainStackScreenOptions: any = () => {
    return {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        title: '',
        headerStyle: {
            height: theme.HEADER_HEIGHT,
            backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
        },
        headerTintColor: theme.COLORS.FONT_PRIMARY,
        headerTitleAlign: 'center'
    };
}

const stackScreenOptions: any = ({navigation}) => {
    return {
        ...mainStackScreenOptions(navigation),
        headerLeft: () => (
            <HeaderButton style={{marginLeft: theme.SPACING.S}}
                          iconName="arrow-left"
                          onPress={navigation.goBack}/>
        )
    }
}

function EntryScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions} mode="modal">
            <Stack.Screen name="entry-list" component={EntryListScreen} options={{}}/>
            <Stack.Screen name="entry-details" component={EntryDetailsScreen} options={{}}/>
            <Stack.Screen name="entry-form" component={EntryFormScreen} options={{}}/>
        </Stack.Navigator>
    )
}

function TrophyScreenStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions} mode="modal">
            <Stack.Screen name="trophy-list" component={TrophyListScreen} options={{}}/>
            <Stack.Screen name="trophy-details" component={TrophyDetailsScreen} options={{}}/>
            <Stack.Screen name="trophy-form" component={TrophyFormScreen} options={{}}/>
        </Stack.Navigator>
    )
}

function StatisticsScreenStack() {
    return (
        <Stack.Navigator screenOptions={mainStackScreenOptions} mode="modal">
            <Stack.Screen name="statistics" component={StatisticsScreen} options={{}}/>
        </Stack.Navigator>
    )
}

function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadEntries());
        dispatch(loadTrophies());
        dispatch(loadTrophies());
    }, []);

    return (
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
                <Tab.Screen name="Entries" component={EntryScreenStack}/>
                <Tab.Screen name="Trophies" component={TrophyScreenStack} />
                <Tab.Screen name="Statistics" component={StatisticsScreenStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;
