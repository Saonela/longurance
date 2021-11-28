import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {withFormik} from 'formik';
import {Activity} from '../../types/Activity';
import theme from '../../theme';
import ErrorMessage from '../shared/ErrorMessage';
import ActivityFormField from '../form/ActivityFormField';
import DistanceFormField from '../form/DistanceFormField';
import DurationFormField from '../form/DurationFormField';
import DateFormField from '../form/DateFormField';
import EnergyFormField from '../form/EnergyFormField';
import NoteFormField from '../form/NoteFormField';
import TextFormField from '../form/TextFormField';
import FormHint from '../form/FormHint';
import Panel from '../shared/Panel';
import {Entry} from '../../types/Entry';

const defaultEntry: Entry = {
    id: '',
    createdAt: '',
    activity: Activity.RUNNING,
    distance: null,
    duration: null,
    date: new Date().toISOString(),
    effort: 3,
    title: '',
    note: ''
}

const options = {
    mapPropsToValues: ({entry, ...props}) => {
        return entry ? entry : defaultEntry;
    },
    validate: (values) => {
        const errors: any = {};
        if (values.distance && typeof values.distance !== 'number') {
            values.distance = parseFloat(values.distance);
        }
        if (!values.duration && !values.distance) {
            errors.durationOrDistance = 'Duration or distance must be set!';
        }
        return errors;
    },
    validateOnChange: false,
    validateOnBlur: false,
    handleSubmit: (values, {props}) => {
        Keyboard.dismiss();
        props.onSubmit(values);
    }
}

function EntryForm({values, errors, touched, handleChange, setFieldValue, setErrors}) {
    const durationOrDistanceError = errors.durationOrDistance && (touched.duration || touched.distance);
    return (
        <View style={styles.form}>
            <Panel>
                <TextFormField label={'Title'}
                               placeholder={'Title'}
                               value={values.title}
                               onChange={handleChange('title')}/>
                <FormHint>Write a short title to display in the list screen.</FormHint>
            </Panel>
            <Panel>
                <ActivityFormField value={values.activity} onChange={handleChange('activity')}/>
            </Panel>
            <Panel>
                <DateFormField value={values.date} onChange={value => setFieldValue('date', value.toISOString())}/>
            </Panel>
            <Panel>
                <DistanceFormField value={values.distance}
                                   onChange={(value) => {
                                       setErrors({});
                                       setFieldValue('distance', value)
                                   }}/>
                {durationOrDistanceError && <ErrorMessage style={styles.error} message={errors.durationOrDistance}/>}
            </Panel>
            <Panel>
                <DurationFormField value={values.duration}
                                   onChange={(value) => {
                                       setErrors({});
                                       setFieldValue('duration', value)
                                   }}/>
                {durationOrDistanceError && <ErrorMessage style={styles.error} message={errors.durationOrDistance}/>}
            </Panel>
            <Panel>
                <EnergyFormField value={values.effort} onChange={value => setFieldValue('effort', value)}/>
            </Panel>
            <Panel>
                <NoteFormField value={values.note} onChange={value => setFieldValue('note', value)}/>
            </Panel>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        paddingHorizontal: theme.SPACING.M,
        paddingBottom: theme.SPACING.M
    },
    error: {
        paddingTop: theme.SPACING.S
    },
});

export default withFormik(options)(EntryForm);
