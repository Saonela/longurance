import {render} from '@testing-library/react-native';
import React from 'react';
import Dashboard from './Dashboard';

describe('Dashboard', () => {
    it('should display period statistics', () => {
        const {getByText} = render(<Dashboard />);
        getByText('ALL ACTIVITY');
    });
});
