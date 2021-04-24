import React, {useLayoutEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteEntry, getEntry} from '../redux/slices/entriesSlice';
import {Entry} from '../types/Entry';
import HeaderButton from '../components/header/HeaderButton';
import appStyles from '../styles';
import EntryDetails from '../components/entry/EntryDetails';

function EntryDetailsScreen({route, navigation}) {
    const entry: Entry = useSelector((state) => getEntry(state, route.params.id));

    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: entry.title,
            headerTitleStyle: {
                maxWidth: 200,
            },
            headerRight: () => (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <HeaderButton iconName="edit"
                                  onPress={navigateToEntryForm}/>
                    <HeaderButton iconName="x"
                                  onPress={confirmDelete}/>
                </View>

            ),
        });
    }, [navigation]);

    const navigateToEntryForm = () => {
        navigation.navigate('entry-form', {id: entry.id});
    };

    const confirmDelete = () => {
        Alert.alert(
            'Delete entry',
            'Entry will be removed from history',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        dispatch(deleteEntry(entry.id));
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={appStyles.container}>
                <EntryDetails entry={entry}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default EntryDetailsScreen;
