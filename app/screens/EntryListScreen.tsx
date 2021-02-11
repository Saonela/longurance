import React from 'react';
import {ActivityIndicator, Alert, ScrollView, StyleSheet, View} from "react-native";
import appStyles from "../styles";
import CreateNewButton from "../components/create-new-button/CreateNewButton";
import theme from "../theme";
import {deleteEntry, getEntries, getEntriesStatus} from '../redux/slices/entriesSlice';
import {useSelector, useDispatch} from "react-redux";
import {Entry} from '../types/Entry';
import EntryListEmptyMessage from '../components/entry-list-empty-message/EntryListEmptyMessage';
import EntryListHeader from '../components/entry-list-header/EntryListHeader';
import EntryCard from '../components/entry-card/EntryCard';
import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';

function EntryListScreen({navigation}) {

    const entries = useSelector(getEntries)
    const entriesStatus = useSelector(getEntriesStatus);

    const dispatch = useDispatch();

    const navigateToEntryForm = (id?: string) => {
        const params = id ? {id} : {};
        navigation.navigate('entry-form', params);
    };

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Delete entry',
            'Entry will be removed from history',
            [
                {
                    text: 'Cancel',
                    onPress: () => {},
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        dispatch(deleteEntry(id));
                    }}
            ],
            { cancelable: false }
        );
    }

    return (
        <View style={styles.wrapper}>
            <EntryListHeader/>
            <CreateNewButton style={styles.createButton} onPress={() => navigateToEntryForm()}/>
            <ScrollView style={appStyles.container}>
                <View style={styles.list}>
                    {!entries.length && entriesStatus === ASYNC_STATE_STATUS.SUCCEEDED ? <EntryListEmptyMessage/> : null}
                    {entries.map((entry: Entry) => {
                        return <EntryCard key={entry.id} entry={entry} onEdit={navigateToEntryForm} onDelete={confirmDelete}/>
                    })}
                </View>
            </ScrollView>
            {entriesStatus === ASYNC_STATE_STATUS.LOADING ? <ActivityIndicator style={styles.loader} size={46} color={theme.COLORS.FONT_PRIMARY}/> : null}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    list: {
        paddingTop: theme.SPACING.XL,
        paddingBottom: theme.SPACING.M
    },
    createButton: {
        position: 'absolute',
        top: 30,
        right: theme.SPACING.M,
        zIndex: 1
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [
            {translateX: -23},
            {translateY: -23}
        ],
        zIndex: 1,
    }
});

export default EntryListScreen;
