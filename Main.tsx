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
import TabBar from './app/components/tab-bar/TabBar';
import TrophyFormScreen from './app/screens/TrophyFormScreen';
import EntryDetailsScreen from './app/screens/EntryDetailsScreen';
import TrophyDetailsScreen from './app/screens/TrophyDetailsScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const stackScreenOptions: any = ({navigation}) => {
    return {
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        title: '',
        headerStyle: {
            height: theme.HEADER_HEIGHT,
            backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
        },
        headerTintColor: theme.COLORS.FONT_PRIMARY,
        headerTitleAlign: 'center',
        headerLeft: () => (
            <HeaderButton style={{marginLeft: theme.SPACING.S}}
                          iconName="arrow-left"
                          onPress={navigation.goBack}/>
        )
    };
}

// TODO:
// * Duration should have seconds + improved control;

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

function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadEntries());
    }, []);

    return (
        <NavigationContainer theme={DarkTheme}>
            <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
                <Tab.Screen name="Entries" component={EntryScreenStack}/>
                <Tab.Screen name="Trophies" component={TrophyScreenStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Main;
