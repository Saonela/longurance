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
import Panel from '../ui/Panel';

function getTitlePlaceholder(activity: Activity, date: Date) {
    const hours = date.getHours();

    let activityName = 'Workout';
    if (activity === Activity.RUNNING) activityName = 'Run';
    if (activity === Activity.SWIMMING) activityName = 'Swim';
    if (activity === Activity.CYCLING) activityName = 'Cycle';

    let timeOfTheDay = '';
    if (hours >= 6 && hours < 12) {
        timeOfTheDay = 'Morning';
    } else if (hours >= 12 && hours < 17) {
        timeOfTheDay = 'Afternoon';
    } else if (hours >= 17 && hours < 21) {
        timeOfTheDay = 'Evening';
    } else if (hours >= 21) {
        timeOfTheDay = 'Night';
    }
    return timeOfTheDay + ' ' + activityName;
}

const getDefaultEntry = () => {
    const date = new Date();
    const defaultActivity = Activity.RUNNING;
    return {
        id: '',
        createdAt: '',
        activity: defaultActivity,
        distance: 0,
        duration: 0,
        date: date.toISOString(),
        effort: 3,
        title: getTitlePlaceholder(defaultActivity, date),
        note: ''
    };
};

const options = {
    mapPropsToValues: ({entry, ...props}) => {
        return entry ? entry : getDefaultEntry();
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
};

function EntryForm({
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setErrors
}) {
    const durationOrDistanceError =
        errors.durationOrDistance && (touched.duration || touched.distance);
    return (
        <View>
            <Panel>
                <TextFormField
                    label={'Title'}
                    placeholder={'Title'}
                    value={values.title}
                    onChange={handleChange('title')}
                />
                <FormHint>
                    Write a short title to display in the list screen.
                </FormHint>
            </Panel>
            <Panel>
                <ActivityFormField
                    value={values.activity}
                    onChange={(value) => {
                        const date = new Date();
                        const oldPlaceholder = getTitlePlaceholder(
                            values.activity,
                            date
                        );
                        const newPlaceholder = getTitlePlaceholder(value, date);
                        if (values.title === oldPlaceholder) {
                            handleChange('title')(newPlaceholder);
                        }
                        handleChange('activity')(value);
                    }}
                />
            </Panel>
            <Panel>
                <DateFormField
                    value={values.date}
                    onChange={(value) =>
                        setFieldValue('date', value.toISOString())
                    }
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
                {durationOrDistanceError && (
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
                {durationOrDistanceError && (
                    <ErrorMessage
                        style={styles.error}
                        message={errors.durationOrDistance}
                    />
                )}
            </Panel>
            <Panel>
                <EnergyFormField
                    value={values.effort}
                    onChange={(value) => setFieldValue('effort', value)}
                />
            </Panel>
            <Panel>
                <NoteFormField
                    value={values.note}
                    onChange={(value) => setFieldValue('note', value)}
                />
            </Panel>
        </View>
    );
}

const styles = StyleSheet.create({
    error: {
        paddingTop: theme.SPACING.S
    }
});

export default withFormik(options)(EntryForm);
