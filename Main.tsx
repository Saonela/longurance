import React, {useEffect} from 'react';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import theme from './app/theme';
import EntryListScreen from './app/screens/EntryListScreen';
import EntryFormScreen from './app/screens/EntryFormScreen';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {loadEntries} from './app/redux/slices/entriesSlice';
import HeaderButton from './app/components/header/HeaderButton';

const Stack = createStackNavigator();

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
                <Stack.Screen name="entry-list" component={EntryListScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="entry-form" component={EntryFormScreen} options={{}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Main;
