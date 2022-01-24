import React, {useLayoutEffect} from 'react';
import {Alert, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import appStyles from '../styles';
import EntryDetails from '../components/entry/EntryDetails';
import {deleteEntry, getEntry, useEntriesStore} from '../state/entries';
import {Entry} from '../types/Entry';
import {updateCompletedTrophies} from '../state/trophies';

function EntryDetailsScreen({route, navigation}) {
    const entry = useEntriesStore((state) =>
        getEntry(state, route.params.id)
    ) as Entry;

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
            title: 'Entry Details',
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
            {entry && <EntryDetails entry={entry} trophies={[]} />}
        </View>
    );
}

export default EntryDetailsScreen;
