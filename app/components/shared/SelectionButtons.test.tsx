import {act, fireEvent, render} from '@testing-library/react-native';
import React from 'react';
import SelectionButtons from './SelectionButtons';

describe('SelectionButtons', () => {

    const items = [
        {
            label: 'Duration',
            value: 1
        },
        {
            label: 'Distance',
            value: 2
        },
        {
            label: 'Achievements',
            value: 3
        }
    ];

    it('should toggle buttons', async () => {
        const onChangeSpy =  jest.fn();
        const component = (
            <SelectionButtons selected={1} items={items} onChange={onChangeSpy}/>
        );

        const { getByText } = render(component);

        await act(async () => {
            fireEvent.press(getByText('Duration'));
        });
        expect(onChangeSpy).not.toHaveBeenCalled();

        await act(async () => {
            fireEvent.press(getByText('Distance'));
        });
        expect(onChangeSpy).toHaveBeenCalledWith(2);

        getByText('Achievements');
    });
});
