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
import FormSubText from '../form/FormSubText';

const defaultEntry: any = {
    activity: Activity.RUNNING,
    distance: null,
    duration: null,
    date: new Date().toISOString(),
    energy: 0,
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
    return (
        <View style={styles.form}>
            <TextFormField style={styles.field}
                           value={values.title}
                           label={'Title'}
                           placeholder={'Title'}
                           onChange={handleChange('title')}/>
            <FormSubText style={styles.subText}
                         text="Write a short title to display in the list screen."/>

            <ActivityFormField style={styles.field}
                               value={values.activity}
                               onChange={handleChange('activity')}/>

            <DateFormField style={styles.field}
                           value={values.date}
                           onChange={value => setFieldValue('date', value.toISOString())}/>

            <DistanceFormField style={styles.field}
                               value={values.distance}
                               onChange={(value) => {
                                   setErrors({});
                                   setFieldValue('distance', value)
                               }}/>

            <DurationFormField style={styles.field}
                               value={values.duration}
                               onChange={(value) => {
                                   setErrors({});
                                   setFieldValue('duration', value)
                               }}/>

            {errors.durationOrDistance && (touched.duration || touched.distance)
                ? <ErrorMessage style={styles.errorField} message={errors.durationOrDistance}/>
                : null}

            <EnergyFormField style={{paddingBottom: theme.SPACING.S}}
                             value={values.energy}
                             onChange={value => setFieldValue('energy', value)}/>

            <NoteFormField style={styles.field}
                           value={values.note}
                           onChange={value => setFieldValue('note', value)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        padding: theme.SPACING.M,
    },
    field: {
        paddingBottom: theme.SPACING.L
    },
    errorField: {
        paddingBottom: theme.SPACING.M
    },
    subText: {
        marginTop: -20,
        marginBottom: theme.SPACING.M
    }
});

export default withFormik(options)(EntryForm);
