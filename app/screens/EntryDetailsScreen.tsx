import React, {useLayoutEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import appStyles from '../styles';
import EntryDetails from '../components/entry/EntryDetails';
import {deleteEntry, getEntry, useEntriesStore} from '../state/entries';
import {Entry} from '../types/Entry';
import {
    getEntryTrophies,
    updateCompletedTrophies,
    useTrophiesStore
} from '../state/trophies';
import TrophyCardLite from '../components/trophy/TrophyCardLite';
import {TrophyType} from '../enums/TrophyType';
import {Screen} from '../enums/Screen';
import utils from '../styles-utilities';

function EntryDetailsScreen({route, navigation}) {
    const entry = useEntriesStore(getEntry(route.params.id)) as Entry;

    const trophies = useTrophiesStore(
        getEntryTrophies(entry?.id, TrophyType.INDIVIDUAL)
    );

    const navigateToEntryForm = () =>
        navigation.navigate(Screen.ENTRY_FORM, {id: entry.id});

    useLayoutEffect(() => {
        const confirmDelete = () => {
            Alert.alert(
                'Delete entry',
                'Entry will be removed from history',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            deleteEntry(entry.id);
                            updateCompletedTrophies();
                            navigation.goBack();
                        }
                    }
                ],
                {cancelable: false}
            );
        };

        navigation.setOptions({
            headerTitleStyle: {
                maxWidth: 200
            },
            headerRight: () => (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <HeaderButton
                        iconName="edit"
                        onPress={navigateToEntryForm}
                    />
                    <HeaderButton iconName="x" onPress={confirmDelete} />
                </View>
            )
        });
    }, [navigation, entry?.id]);

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView contentContainerStyle={utils.paddingBottomM}>
                {entry && <EntryDetails entry={entry} />}
                {trophies.map((trophy) => (
                    <TrophyCardLite key={trophy.id} trophy={trophy} />
                ))}
            </ScrollView>
        </View>
    );
}

export default EntryDetailsScreen;
