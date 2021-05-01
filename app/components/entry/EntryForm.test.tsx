import React, {useRef} from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import EntryForm from './EntryForm';
import {Activity} from '../../types/Activity';
import {Entry} from '../../types/Entry';
import {FormikValues} from 'formik';
import {View, Button} from 'react-native';

function FormWithRef({entry, onSubmit}) {
    const formRef = useRef<FormikValues>(null);
    return (
        <View>
            <Button title={'Save'} onPress={() => {
                if (formRef.current) {
                    formRef.current.handleSubmit();
                }
            }}/>
            <EntryForm entry={entry} innerRef={formRef} onSubmit={onSubmit}/>
        </View>
    );
}

describe('EntryForm', () => {

    test('should submit default form', async () => {
        const submitSpy = jest.fn();

        const { getByText, getByPlaceholderText, getByA11yLabel, getByTestId } = render(<FormWithRef entry={null} onSubmit={submitSpy}/>)

        await waitFor(() => {
            fireEvent.press(getByText('Save'));
        });

        getByText('Duration or distance must be set!');
        submitSpy.mockClear();

        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Title'), 'My title!');
        });
        await act(async () => {
            fireEvent(getByTestId('dropdown'), 'valueChange', Activity.SWIMMING);
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('HH'), '2');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('MM'), '16');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('SS'), '5');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Km'), '2.5');
        });
        await act(async () => {
            fireEvent.press(getByTestId('datepicker-trigger'));
        });
        await act(async () => {
            fireEvent(getByTestId('datepicker'), 'onConfirm', new Date('2020-09-01'));
        });
        await act(async () => {
            fireEvent.changeText(getByA11yLabel('Note field'), 'My interesting note.');
        });

        await act(async () => {
            fireEvent.press(getByText('Save'));
        });

        expect(submitSpy).toHaveBeenCalledWith({
                activity: Activity.SWIMMING,
                distance: 2.5,
                duration: 8165,
                date: '2020-09-01T00:00:00.000Z',
                energy: 0,
                title: 'My title!',
                note: 'My interesting note.'
            }
        );
    });

    test('should submit edit entry form', async () => {
        const submitSpy = jest.fn();

        const entry: Partial<Entry> = {
            id: '1',
            activity: Activity.RUNNING,
            distance: 15,
            duration: 9200,
            date: '2021-01-07T09:10:02.207Z',
            energy: 2,
            note: 'Was really enjoying. Got into flow state.',
        };

        const { debug, getByText } = render(<FormWithRef entry={entry} onSubmit={submitSpy}/>)

        await waitFor(() => {
            fireEvent.press(getByText('Save'));
        });
        expect(submitSpy).toHaveBeenCalledWith(entry);
    });
});
