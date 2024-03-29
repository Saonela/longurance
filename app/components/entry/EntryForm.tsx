import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {withFormik} from 'formik';
import {Activity} from '../../enums/Activity';
import theme from '../../theme';
import ErrorMessage from '../ui/ErrorMessage';
import ActivityFormField from '../form/ActivityFormField';
import DistanceFormField from '../form/DistanceFormField';
import DurationFormField from '../form/DurationFormField';
import DateFormField from '../form/DateFormField';
import EffortFormField from '../form/EffortFormField';
import NoteFormField from '../form/NoteFormField';
import TextFormField from '../form/TextFormField';
import FormHint from '../form/FormHint';
import Panel from '../ui/Panel';
import {Entry} from '../../types/Entry';

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
    return `${timeOfTheDay} ${activityName}`;
}

const isPlaceholderEdited = (activity: Activity, date: string, title: string) =>
    title !== getTitlePlaceholder(activity, new Date(date));

const getDefaultEntry = (): Entry => {
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
    // keep spread so formik would be recognized when passing props
    mapPropsToValues: ({entry, ...props}) => {
        return entry || getDefaultEntry();
    },
    validate: (values) => {
        const errors: {durationOrDistance?: string} = {};
        if (values.distance && typeof values.distance !== 'number') {
            Object.assign(values, {distance: parseFloat(values.distance)});
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
                    label="Title"
                    placeholder="Title"
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
                    onChange={(newActivity) => {
                        const {activity, date, title} = values;
                        if (!isPlaceholderEdited(activity, date, title)) {
                            handleChange('title')(
                                getTitlePlaceholder(newActivity, new Date(date))
                            );
                        }
                        handleChange('activity')(newActivity);
                    }}
                />
            </Panel>
            <Panel>
                <DateFormField
                    value={values.date}
                    onChange={(newDate) => {
                        const {activity, date, title} = values;
                        if (!isPlaceholderEdited(activity, date, title)) {
                            handleChange('title')(
                                getTitlePlaceholder(activity, newDate)
                            );
                        }
                        setFieldValue('date', newDate.toISOString());
                    }}
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
                    <ErrorMessage style={styles.error}>
                        {errors.durationOrDistance}
                    </ErrorMessage>
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
                    <ErrorMessage style={styles.error}>
                        {errors.durationOrDistance}
                    </ErrorMessage>
                )}
            </Panel>
            <Panel>
                <EffortFormField
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
