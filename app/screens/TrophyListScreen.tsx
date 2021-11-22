import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import appStyles from '../styles';
import theme from '../theme';
import TrophyList from '../components/trophy/TrophyList';
import HeaderButton from '../components/header/HeaderButton';
import TrophyCongratulations from '../components/trophy/TrophyCongratulations';

function TrophyListScreen({navigation}) {

    const navigateToTrophyForm = (id?: string) => {
        const params = id ? {id} : {};
        navigation.navigate('trophy-form', params);
    };

    const navigateToTrophyDetails = (id: string) => {
        navigation.navigate('trophy-details', {id});
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: null,
            headerRight: () => (
                <HeaderButton style={{marginRight: theme.SPACING.S}}
                              iconName="plus"
                              onPress={() => navigateToTrophyForm()}/>
            )
        });
    }, [navigation]);

    return (
        <View style={styles.wrapper}>
            <View style={appStyles.screenContainer}>
                <TrophyList onPress={navigateToTrophyDetails}/>
            </View>
            <TrophyCongratulations/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default TrophyListScreen;
