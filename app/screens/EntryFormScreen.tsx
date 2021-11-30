import React, {useLayoutEffect, useRef} from 'react';
import {ScrollView, View} from "react-native";
import appStyles from "../styles";
import EntryForm from '../components/entry/EntryForm';
import {Entry} from '../types/Entry';
import {getEntry, saveEntry} from '../redux/slices/entriesSlice';
import {useSelector} from "react-redux";
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import {FormikValues} from 'formik';
import {useAppDispatch} from '../redux/store';
import {saveEntryTrophies} from '../redux/slices/trophiesSlice';

function EntryFormScreen({route, navigation}) {
    const dispatch = useAppDispatch();

    const entry = useSelector(state => getEntry(state, route.params.id));
    const formRef = useRef<FormikValues>(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: entry ? 'Edit Entry' : 'New Entry',
            headerRight: () => (
                <HeaderButton iconName="check"
                              style={{marginRight: theme.SPACING.S}}
                              onPress={() => {
                                  if (formRef.current) {
                                      formRef.current.handleSubmit();
                                  }
                              }}/>
            ),
        });
    }, [navigation]);

    const handleSubmit = (entry: Entry) => {
        dispatch(saveEntry(entry)).then(() => {
            dispatch(saveEntryTrophies(entry));
        });
        navigation.goBack();
    };

    return (
        <View style={appStyles.screenContainer}>
            <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{paddingBottom: theme.SPACING.M}}>
                <EntryForm entry={entry}
                           innerRef={formRef}
                           onSubmit={entry => handleSubmit(entry)}/>
            </ScrollView>
        </View>
    );
}
export default EntryFormScreen;
