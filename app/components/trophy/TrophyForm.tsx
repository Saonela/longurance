import React from 'react';
import {Keyboard, StyleSheet, View} from 'react-native';
import {withFormik} from 'formik';
import {Activity} from '../../types/Activity';
import theme from '../../theme';
import DistanceFormField from '../form/DistanceFormField';
import DurationFormField from '../form/DurationFormField';
import ErrorMessage from '../ui/ErrorMessage';
import ActivityFormField from '../form/ActivityFormField';
import TextFormField from '../form/TextFormField';
import {Trophy, TrophyType} from '../../types/Trophy';
import Panel from '../ui/Panel';
import FormLabel from '../form/FormLabel';
import RadioButton from '../ui/RadioButton';
import FormHint from '../form/FormHint';
import utils from '../../styles-utilities';

const defaultTrophy: Trophy = {
    id: '',
    entryIds: [],
    createdAt: '',
    completedAt: null,
    completed: false,
    markedAsRead: false,
    predefined: false,
    title: '',
    activity: Activity.RUNNING,
    type: TrophyType.TOTAL,
    distance: 0,
    duration: 0
};

const options = {
    mapPropsToValues: ({trophy, ...props}) => {
        return trophy || defaultTrophy;
    },
    validate: (values) => {
        const errors: {title?: string; durationOrDistance?: string} = {};
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
                    label="Title"
                    placeholder="Title"
                    value={values.title}
                    onChange={(value) => {
                        setErrors({});
                        setFieldValue('title', value);
                    }}
                />
                {errors.title && (
                    <ErrorMessage style={styles.error}>
                        {errors.title}
                    </ErrorMessage>
                )}
            </Panel>
            <Panel>
                <FormLabel>Trophy type</FormLabel>
                <View style={[utils.row, utils.marginTopS]}>
                    <RadioButton
                        value={TrophyType.TOTAL}
                        selected={values.type === TrophyType.TOTAL}
                        onPress={handleChange('type')}
                    >
                        Total
                    </RadioButton>
                    <RadioButton
                        style={utils.marginLeftXL}
                        value={TrophyType.INDIVIDUAL}
                        selected={values.type === TrophyType.INDIVIDUAL}
                        onPress={handleChange('type')}
                    >
                        Individual
                    </RadioButton>
                </View>
                <FormHint>
                    Choose to apply conditions per all activity or per entry
                </FormHint>
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
                {errors.durationOrDistance && (
                    <ErrorMessage style={styles.error}>
                        {errors.durationOrDistance}
                    </ErrorMessage>
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
