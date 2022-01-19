import React, {useLayoutEffect} from 'react';
import {Alert, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import {Trophy} from '../types/Trophy';
import appStyles from '../styles';
import TrophyDetails from '../components/trophy/TrophyDetails';
import {deleteTrophy, getTrophy, useTrophiesStore} from '../state/trophies';

function TrophyDetailsScreen({route, navigation}) {
    const trophy = useTrophiesStore((state) =>
        getTrophy(state, route.params.id)
    ) as Trophy;

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
            title: 'Trophy Details',
            headerTitleStyle: {
                maxWidth: 200
            },
            headerRight: () => (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <HeaderButton
                        iconName="edit"
                        onPress={() =>
                            navigation.navigate('trophy-form', {id: trophy.id})
                        }
                    />
                    <HeaderButton iconName="x" onPress={confirmDelete} />
                </View>
            )
        });
    }, [navigation, trophy?.id]);

    return (
        <View style={appStyles.screenContainer}>
            {trophy && <TrophyDetails trophy={trophy} />}
        </View>
    );
}

export default TrophyDetailsScreen;
