import React, {useLayoutEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {FormikValues} from 'formik';
import HeaderButton from '../components/header/HeaderButton';
import theme from '../theme';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import {getTrophy, saveTrophy} from '../redux/slices/trophiesSlice';
import TrophyForm from '../components/trophy/TrophyForm';
import {Trophy} from '../types/Trophy';

function TrophyFormScreen({route, navigation}) {
    const dispatch = useDispatch();
    const trophy = useSelector((state) => getTrophy(state, route.params.id));

    const formRef = useRef<FormikValues>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: trophy ? 'Edit Trophy' : 'New Trophy',
            headerRight: () => (
                <HeaderButton style={{marginRight: theme.SPACING.S}}
                              iconName="check"
                              onPress={() => {
                                  if (formRef.current) {
                                      formRef.current.handleSubmit();
                                  }
                              }}/>
            ),
        });
    }, [navigation]);

    const handleSubmit = (trophy: Trophy) => {
        dispatch(saveTrophy(trophy));
        navigation.goBack()
    };

    return (
        <View style={appStyles.container}>
            <ScrollView keyboardShouldPersistTaps="handled">
                <TrophyForm trophy={trophy} innerRef={formRef} onSubmit={handleSubmit}/>
            </ScrollView>
        </View>
    );
}

export default TrophyFormScreen;
