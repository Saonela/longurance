import React, {useLayoutEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import {Trophy} from '../types/Trophy';
import appStyles from '../styles';
import TrophyDetails from '../components/trophy/TrophyDetails';
import {deleteTrophy, getTrophy, useTrophiesStore} from '../state/trophies';
import {getEntriesByIds, useEntriesStore} from '../state/entries';
import EntryCard from '../components/entry/EntryCard';
import theme from '../theme';
import utils from '../styles-utilities';
import {Screen} from '../enums/Screen';

function TrophyDetailsScreen({route, navigation}) {
    const trophy = useTrophiesStore((state) =>
        getTrophy(state, route.params.id)
    ) as Trophy;

    const entries = useEntriesStore(getEntriesByIds(trophy?.entryIds || []));

    const navigateToEntryDetails = (id) =>
        navigation.navigate(Screen.ENTRY_DETAILS, {id});

    useLayoutEffect(() => {
        const confirmDelete = () => {
            Alert.alert(
                'Delete trophy',
                'Trophy will be removed from history',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel'
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            deleteTrophy(trophy.id);
                            navigation.goBack();
                        }
                    }
                ],
                {cancelable: false}
            );
        };

        navigation.setOptions({
            headerRight: () => (
                <View style={utils.row}>
                    <HeaderButton
                        iconName="edit"
                        onPress={() =>
                            navigation.navigate(Screen.TROPHY_FORM, {
                                id: trophy.id
                            })
                        }
                    />
                    <HeaderButton iconName="x" onPress={confirmDelete} />
                </View>
            )
        });
    }, [navigation, trophy?.id]);

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView contentContainerStyle={utils.paddingBottomM}>
                {trophy && <TrophyDetails trophy={trophy} />}
                {entries.map((entry) => (
                    <EntryCard
                        key={entry.id}
                        entry={entry}
                        onPress={() => navigateToEntryDetails(entry.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

export default TrophyDetailsScreen;
