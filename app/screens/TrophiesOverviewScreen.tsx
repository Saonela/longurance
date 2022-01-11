import React, {useLayoutEffect} from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import TrophiesOverview from '../components/trophy/TrophiesOverview';

function TrophiesOverviewScreen({navigation}) {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                height: theme.HEADER_HEIGHT,
                backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
                elevation: 0
            },
            headerLeft: null,
            headerRight: () => (
                <HeaderButton
                    iconName="plus"
                    onPress={() => navigation.navigate('trophy-form', {})}
                />
            )
        });
    }, [navigation]);

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    <TrophiesOverview />
                </ScrollView>
            </View>
        </>
    );
}

export default TrophiesOverviewScreen;
