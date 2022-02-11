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
import theme from '../theme';
import TrophyCardLite from '../components/trophy/TrophyCardLite';
import {TrophyType} from '../enums/TrophyType';

function EntryDetailsScreen({route, navigation}) {
    const entry = useEntriesStore((state) =>
        getEntry(state, route.params.id)
    ) as Entry;

    const trophies = useTrophiesStore(
        getEntryTrophies(entry?.id, TrophyType.INDIVIDUAL)
    );

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
                        onPress={() =>
                            navigation.navigate('entry-form', {id: entry.id})
                        }
                    />
                    <HeaderButton iconName="x" onPress={confirmDelete} />
                </View>
            )
        });
    }, [navigation, entry?.id]);

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView
                contentContainerStyle={{paddingBottom: theme.SPACING.M}}
            >
                {entry && <EntryDetails entry={entry} />}
                {trophies.map((trophy) => (
                    <TrophyCardLite key={trophy.id} trophy={trophy} />
                ))}
            </ScrollView>
        </View>
    );
}

export default EntryDetailsScreen;
