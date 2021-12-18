import React, {useRef} from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import TrophyForm from './TrophyForm';
import {Activity} from '../../types/Activity';
import {FormikValues} from 'formik';
import {View, Button} from 'react-native';
import {Trophy} from '../../types/Trophy';

function FormWithRef({trophy, onSubmit}) {
    const formRef = useRef<FormikValues>(null);
    return (
        <View>
            <Button
                title={'Save'}
                onPress={() => {
                    if (formRef.current) {
                        formRef.current.handleSubmit();
                    }
                }}
            />
            <TrophyForm
                trophy={trophy}
                innerRef={formRef}
                onSubmit={onSubmit}
            />
        </View>
    );
}

describe('TrophyForm', () => {
    test('should submit default form', async () => {
        const submitSpy = jest.fn();

        const {getByText, getAllByText, getByPlaceholderText, getByTestId} =
            render(<FormWithRef trophy={null} onSubmit={submitSpy} />);

        await waitFor(() => {
            fireEvent.press(getByText('Save'));
        });

        getByText('Title must be set!');
        getAllByText('Duration or distance must be set!');
        submitSpy.mockClear();

        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Title'), 'Ironman swim');
        });
        await act(async () => {
            fireEvent(
                getByTestId('dropdown'),
                'valueChange',
                Activity.SWIMMING
            );
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('HH'), '2');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('MM'), '16');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Km'), '2.5');
        });
        await act(async () => {
            fireEvent.press(getByText('Save'));
        });

        expect(submitSpy).toHaveBeenCalledWith({
            title: 'Ironman swim',
            activity: Activity.SWIMMING,
            distance: 2.5,
            duration: 8160,
            markedAsRead: false
        });
    });

    test('should submit edit form', async () => {
        const submitSpy = jest.fn();

        const trophy: Partial<Trophy> = {
            id: '1',
            title: '100km',
            activity: Activity.RUNNING,
            distance: 15,
            duration: 92,
            markedAsRead: false
        };

        const {getByText} = render(
            <FormWithRef trophy={trophy} onSubmit={submitSpy} />
        );

        await act(async () => {
            fireEvent.press(getByText('Save'));
        });
        expect(submitSpy).toHaveBeenCalledWith(trophy);
    });
});
