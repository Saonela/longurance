import React, {useLayoutEffect, useRef} from 'react';
import {ScrollView, View} from 'react-native';
import {FormikValues} from 'formik';
import appStyles from '../styles';
import EntryForm from '../components/entry/EntryForm';
import {Entry} from '../types/Entry';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import {
    addEntry,
    getEntry,
    updateEntry,
    useEntriesStore
} from '../state/entries';
import {updateCompletedTrophies} from '../state/trophies';
import utils from '../styles-utilities';

function EntryFormScreen({route, navigation}) {
    const isUpdateForm = route.params.id !== undefined;
    const entryToEdit = useEntriesStore(getEntry(route.params.id));
    const formRef = useRef<FormikValues>(null);

    const submit = () => {
        if (formRef.current) {
            formRef.current.handleSubmit();
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isUpdateForm ? 'Edit Entry' : 'New Entry',
            headerRight: () => (
                <HeaderButton
                    iconName="check"
                    style={{marginRight: theme.SPACING.S}}
                    onPress={submit}
                />
            )
        });
    }, [navigation, isUpdateForm]);

    const handleSubmit = (entry: Entry) => {
        if (isUpdateForm) {
            updateEntry(entry);
        } else {
            addEntry(entry);
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
                <EntryForm
                    entry={entryToEdit}
                    innerRef={formRef}
                    onSubmit={(entry) => handleSubmit(entry)}
                />
            </ScrollView>
        </View>
    );
}
export default EntryFormScreen;
