import React, {useLayoutEffect} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import {useDispatch, useSelector} from 'react-redux';
import {Trophy} from '../types/Trophy';
import {deleteTrophy, getTrophy} from '../redux/slices/trophiesSlice';
import appStyles from '../styles';
import TrophyDetails from '../components/trophy/TrophyDetails';
import {Entry} from '../types/Entry';
import {getEntry} from '../redux/slices/entriesSlice';

function TrophyDetailsScreen({route, navigation}) {
    const trophy: Trophy = useSelector((state) => getTrophy(state, route.params.id));
    const entry: Entry = useSelector((state) => getEntry(state, trophy?.entryId));
    
    const dispatch = useDispatch();

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Trophy Details',
            headerTitleStyle: {
                maxWidth: 200,
            },
            headerRight: () => (
                <View style={{display: 'flex', flexDirection: 'row'}}>
                    <HeaderButton iconName="edit"
                                  onPress={navigateToTrophyForm}/>
                    <HeaderButton iconName="x"
                                  onPress={confirmDelete}/>
                </View>

            ),
        });
    }, [navigation]);

    const navigateToTrophyForm = () => {
        navigation.navigate('trophy-form', {id: trophy.id});
    };

    const confirmDelete = () => {
        Alert.alert(
            'Delete trophy',
            'Trophy will be removed from history',
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
                        navigation.navigate('trophy-list');
                        dispatch(deleteTrophy(trophy.id));
                    }
                }
            ],
            {cancelable: false}
        );
    }

    return (
        <View style={styles.wrapper}>
            <View style={appStyles.screenContainer}>
                {trophy && <TrophyDetails trophy={trophy} entry={entry}/>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default TrophyDetailsScreen;
