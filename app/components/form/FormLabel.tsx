import React from 'react';
import {SecondaryText} from '../ui/Text';

interface FormLabelProps {
    children: React.ReactNode;
}

function FormLabel({children}: FormLabelProps) {
    return <SecondaryText>{children}</SecondaryText>;
}

export default FormLabel;
