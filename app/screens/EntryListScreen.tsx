import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from "react-native";
import appStyles from "../styles";
import theme from "../theme";
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import EntryList from '../components/entry/EntryList';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';
import HeaderButton from '../components/header/HeaderButton';

function EntryListScreen({navigation}) {
    const navigateToEntryForm = (id?: string) => {
        const params = id ? {id} : {};
        navigation.navigate('entry-form', params);
    };

    const navigateToEntryDetails = (id: string) => {
        navigation.navigate('entry-details', {id});
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <HeaderButton style={{marginRight: theme.SPACING.S}}
                              iconName="plus"
                              onPress={() => navigateToEntryForm()}/>
            )
        });
    }, [navigation]);

    return (
        <>
            <HeaderActivityFilter/>
            <View style={appStyles.screenContainer}>
                <EntryList onPress={navigateToEntryDetails}/>
                <TrophyCongratulations/>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default EntryListScreen;
