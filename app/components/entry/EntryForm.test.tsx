import React, {useRef} from 'react';
import {act, fireEvent, render, waitFor} from '@testing-library/react-native';
import {FormikValues} from 'formik';
import {View, Button} from 'react-native';
import EntryForm from './EntryForm';
import {Activity} from '../../enums/Activity';
import {Entry} from '../../types/Entry';

function FormWithRef({entry, onSubmit}) {
    const formRef = useRef<FormikValues>(null);
    return (
        <View>
            <Button
                title="Save"
                onPress={() => {
                    if (formRef.current) {
                        formRef.current.handleSubmit();
                    }
                }}
            />
            <EntryForm entry={entry} innerRef={formRef} onSubmit={onSubmit} />
        </View>
    );
}

describe('EntryForm', () => {
    describe('title placeholder', () => {
        let OriginalDate;

        beforeAll(() => {
            OriginalDate = Date;
            setFakeDate(new Date().toISOString());
            Date.now = OriginalDate.now;
        });

        afterAll(() => {
            // eslint-disable-next-line no-global-assign
            Date = OriginalDate;
        });

        const setFakeDate = (isoDate: string) => {
            jest.spyOn(global, 'Date').mockImplementation(
                () => new OriginalDate(isoDate)
            );
        };

        const createComponent = (isoDate: string) => {
            setFakeDate(isoDate);
            return render(<FormWithRef entry={null} onSubmit={jest.fn()} />);
        };

        it('should set morning title', () => {
            const {getByPlaceholderText} = createComponent(
                '2022-01-01T09:00:00.000'
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Morning Run'
            );
        });

        it('should set afternoon title', () => {
            const {getByPlaceholderText} = createComponent(
                '2022-01-01T14:00:00.000'
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Afternoon Run'
            );
        });

        it('should set evening title', () => {
            const {getByPlaceholderText} = createComponent(
                '2022-01-01T18:00:00.000'
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Evening Run'
            );
        });

        it('should set night title', () => {
            const {getByPlaceholderText} = createComponent(
                '2022-01-01T22:00:00.000'
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Night Run'
            );
        });

        it('should update title on date change', () => {
            const {getByTestId, getByPlaceholderText} = createComponent(
                '2022-01-01T22:00:00.000'
            );
            fireEvent.press(getByTestId('datepicker-trigger'));
            fireEvent(
                getByTestId('datepicker'),
                'onConfirm',
                new OriginalDate('2022-01-01T10:00:00.000')
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Morning Run'
            );
        });

        it('should change activity in title if not edited yet', () => {
            const {getByTestId, getByPlaceholderText} = createComponent(
                '2022-01-11T15:00:00.000'
            );
            fireEvent(
                getByTestId('dropdown'),
                'valueChange',
                Activity.SWIMMING
            );
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'Afternoon Swim'
            );

            fireEvent.changeText(getByPlaceholderText('Title'), 'My title!');
            fireEvent(getByTestId('dropdown'), 'valueChange', Activity.CYCLING);
            expect(getByPlaceholderText('Title').props.value).toEqual(
                'My title!'
            );
        });
    });

    test('should submit default form', async () => {
        const submitSpy = jest.fn();

        const {
            getByText,
            getAllByText,
            getByPlaceholderText,
            getByA11yLabel,
            getByTestId
        } = render(<FormWithRef entry={null} onSubmit={submitSpy} />);

        await waitFor(() => {
            fireEvent.press(getByText('Save'));
        });

        getAllByText('Duration or distance must be set!');
        submitSpy.mockClear();

        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Title'), 'My title!');
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
            fireEvent.changeText(getByPlaceholderText('SS'), '5');
        });
        await act(async () => {
            fireEvent.changeText(getByPlaceholderText('Km'), '2.5');
        });
        await act(async () => {
            fireEvent.press(getByTestId('datepicker-trigger'));
        });
        await act(async () => {
            fireEvent(
                getByTestId('datepicker'),
                'onConfirm',
                new Date('2020-09-01')
            );
        });
        await act(async () => {
            fireEvent.changeText(
                getByA11yLabel('Note field'),
                'My interesting note.'
            );
        });

        await act(async () => {
            fireEvent.press(getByText('Save'));
        });

        expect(submitSpy).toHaveBeenCalledWith({
            id: '',
            createdAt: '',
            activity: Activity.SWIMMING,
            distance: 2.5,
            duration: 8165,
            date: '2020-09-01T00:00:00.000Z',
            effort: 3,
            title: 'My title!',
            note: 'My interesting note.'
        });
    });

    test('should submit edit entry form', async () => {
        const submitSpy = jest.fn();

        const entry: Partial<Entry> = {
            id: '1',
            activity: Activity.RUNNING,
            distance: 15,
            duration: 9200,
            date: '2021-01-07T09:10:02.207Z',
            effort: 2,
            note: 'Was really enjoying. Got into flow state.'
        };

        const {debug, getByText} = render(
            <FormWithRef entry={entry} onSubmit={submitSpy} />
        );

        await waitFor(() => {
            fireEvent.press(getByText('Save'));
        });
        expect(submitSpy).toHaveBeenCalledWith(entry);
    });
});
