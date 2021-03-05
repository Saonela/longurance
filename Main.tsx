import React, {useEffect} from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import theme from './app/theme';
import EntryListScreen from './app/screens/EntryListScreen';
import EntryFormScreen from './app/screens/EntryFormScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loadEntries} from './app/redux/slices/entriesSlice';
import HeaderButton from './app/components/header/HeaderButton';
import TrophyListScreen from './app/screens/TrophyListScreen';
import TabBar from './app/components/tab-bar/TabBar';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function ListScreens() {
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props}/>}>
            <Tab.Screen name="Entries" component={EntryListScreen} />
            <Tab.Screen name="Trophies" component={TrophyListScreen} />
        </Tab.Navigator>
    );
}

function Main() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadEntries());
    }, []);

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={({navigation}) => {
                return {
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
            }}}>
                <Stack.Screen name="entry-list" component={ListScreens} options={{ headerShown: false }}/>
                <Stack.Screen name="entry-form" component={EntryFormScreen} options={{}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;
