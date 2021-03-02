import React from 'react';
import {StyleSheet, View} from "react-native";
import appStyles from "../styles";
import CreateNewButton from "../components/create-new-button/CreateNewButton";
import theme from "../theme";
import EntryListHeader from '../components/entry-list-header/EntryListHeader';
import ActivityFilter from '../components/activity-filter/ActivityFilter';
import EntryList from '../components/entry-list/EntryList';


function EntryListScreen({navigation}) {

    const navigateToEntryForm = (id?: string) => {
        const params = id ? {id} : {};
        navigation.navigate('entry-form', params);
    };

    return (
        <View style={styles.wrapper}>
            <EntryListHeader/>
            <CreateNewButton style={styles.createButton} onPress={() => navigateToEntryForm()}/>
            <ActivityFilter style={styles.entriesFilter}/>
            <View style={appStyles.container}>
                <EntryList onEdit={navigateToEntryForm}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    createButton: {
        position: 'absolute',
        top: 30,
        right: theme.SPACING.M,
        zIndex: 1
    },
    entriesFilter: {
        position: 'absolute',
        top: 10,
        left: theme.SPACING.S,
        zIndex: 10,
        height: '100%'
    }
});

export default EntryListScreen;
