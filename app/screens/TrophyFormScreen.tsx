import React, {useLayoutEffect, useRef} from 'react';
import {FormikValues} from 'formik';
import {ScrollView, View} from 'react-native';
import HeaderButton from '../components/header/HeaderButton';
import theme from '../theme';
import appStyles from '../styles';
import TrophyForm from '../components/trophy/TrophyForm';
import {Trophy} from '../types/Trophy';
import {
    addTrophy,
    getTrophy,
    updateCompletedTrophies,
    updateTrophy,
    useTrophiesStore
} from '../state/trophies';
import utils from '../styles-utilities';

function TrophyFormScreen({route, navigation}) {
    const isUpdateForm = route.params.id !== undefined;
    const trophyToEdit = useTrophiesStore(getTrophy(route.params.id));
    const formRef = useRef<FormikValues>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isUpdateForm ? 'Edit Trophy' : 'New Trophy',
            headerRight: () => (
                <HeaderButton
                    iconName="check"
                    style={{marginRight: theme.SPACING.S}}
                    onPress={() => {
                        if (formRef.current) {
                            formRef.current.handleSubmit();
                        }
                    }}
                />
            )
        });
    }, [navigation, isUpdateForm]);

    const handleSubmit = (trophy: Trophy) => {
        if (isUpdateForm) {
            updateTrophy({...trophy, predefined: false});
        } else {
            addTrophy(trophy);
        }
        updateCompletedTrophies();
        navigation.goBack();
    };

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={utils.paddingBottomM}
            >
                <TrophyForm
                    trophy={trophyToEdit}
                    innerRef={formRef}
                    onSubmit={handleSubmit}
                />
            </ScrollView>
        </View>
    );
}

export default TrophyFormScreen;
