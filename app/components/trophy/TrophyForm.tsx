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
import Panel from '../ui/Panel';

const defaultTrophy: Trophy = {
    id: '',
    entryId: null,
    createdAt: '',
    completedAt: null,
    completed: false,
    markedAsRead: false,
    title: '',
    activity: Activity.RUNNING,
    distance: 0,
    duration: 0
};

const options = {
    mapPropsToValues: ({trophy, ...props}) => {
        return trophy ? trophy : defaultTrophy;
    },
    validate: (values) => {
        if (values.distance && typeof values.distance !== 'number') {
            values.distance = parseFloat(values.distance);
        }

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
};

function TrophyForm({values, errors, handleChange, setFieldValue, setErrors}) {
    return (
        <View style={styles.form}>
            <Panel>
                <TextFormField
                    label={'Title'}
                    placeholder={'Title'}
                    value={values.title}
                    onChange={(value) => {
                        setErrors({});
                        setFieldValue('title', value);
                    }}
                />
                {errors.title && (
                    <ErrorMessage style={styles.error} message={errors.title} />
                )}
            </Panel>
            <Panel>
                <ActivityFormField
                    value={values.activity}
                    onChange={handleChange('activity')}
                />
            </Panel>
            <Panel>
                <DistanceFormField
                    value={values.distance}
                    onChange={(value) => {
                        setErrors({});
                        setFieldValue('distance', value);
                    }}
                />
                {errors.durationOrDistance && (
                    <ErrorMessage
                        style={styles.error}
                        message={errors.durationOrDistance}
                    />
                )}
            </Panel>
            <Panel>
                <DurationFormField
                    value={values.duration}
                    onChange={(value) => {
                        setErrors({});
                        setFieldValue('duration', value);
                    }}
                />
                {errors.durationOrDistance && (
                    <ErrorMessage
                        style={styles.error}
                        message={errors.durationOrDistance}
                    />
                )}
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
    }
});

export default withFormik(options)(TrophyForm);
