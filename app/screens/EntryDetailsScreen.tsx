import React, {useLayoutEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {deleteEntry, getEntry} from '../redux/slices/entriesSlice';
import {Entry} from '../types/Entry';
import HeaderButton from '../components/header/HeaderButton';
import appStyles from '../styles';
import EntryDetails from '../components/entry/EntryDetails';
import {getTrophiesByEntry, saveEntryTrophies} from '../redux/slices/trophiesSlice';
import {useAppDispatch} from '../redux/store';
import {Trophy} from '../types/Trophy';

function EntryDetailsScreen({route, navigation}) {
    const entry: Entry = useSelector((state) => getEntry(state, route.params.id));
    const trophies: Trophy[] = useSelector((state) => getTrophiesByEntry(state, entry));

    const dispatch = useAppDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Entry Details',
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
                        navigation.navigate('entry-list');
                        dispatch(deleteEntry(entry.id)).then(() => {
                            dispatch(saveEntryTrophies(entry));
                        });
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={appStyles.screenContainer}>
                {entry && <EntryDetails entry={entry} trophies={trophies}/>}
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
