import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {withFormik} from 'formik';
import {Activity} from '../../types/Activity';
import theme from '../../theme';
import DistanceFormField from '../form/DistanceFormField';
import DurationFormField from '../form/DurationFormField';
import ErrorMessage from '../shared/ErrorMessage';
import ActivityFormField from '../form/ActivityFormField';
import TextFormField from '../form/TextFormField';
import {Trophy} from '../../types/Trophy';

const defaultTrophy: Partial<Trophy> = {
    title: '',
    activity: Activity.RUNNING,
    distance: null as any,
    duration: null as any,
    markedAsRead: false
}

const options = {
    mapPropsToValues: ({trophy, ...props}) => {
        return trophy ? trophy : defaultTrophy;
    },
    validate: (values) => {
        if (values.distance && typeof values.distance !== 'number') {
            values.distance = parseFloat(values.distance);
        }
        if (values.duration && typeof values.duration !== 'number') {
            const {hours, minutes} = values.duration as any;
            values.duration = hours * 60 + minutes;
        }

        console.log('values.duration', values.duration)

        const errors: any = {};
        if (!values.title) {
            errors.title = 'Title must be set!';
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

function TrophyForm({values, errors, handleChange, setFieldValue, setErrors}) {
    return (
        <View style={styles.form}>
            <TextFormField style={styles.field}
                           value={values.title}
                           label={'Title'}
                           placeholder={'Title'}
                           onChange={(value) => {
                               setErrors({});
                               setFieldValue('title', value);
                           }}/>

            {errors.title
                ? <ErrorMessage style={styles.errorField} message={errors.title}/>
                : null}

            <ActivityFormField style={styles.field}
                               value={values.activity}
                               onChange={handleChange('activity')}/>

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

            {errors.durationOrDistance
                ? <ErrorMessage style={styles.errorField} message={errors.durationOrDistance}/>
                : null}
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
        paddingBottom: theme.SPACING.M,
        marginTop: -theme.SPACING.M
    }
});

export default withFormik(options)(TrophyForm);
