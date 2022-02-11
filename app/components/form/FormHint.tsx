import React from 'react';
import {SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';

interface FormHintProps {
    children: React.ReactNode;
}

function FormHint({children}: FormHintProps) {
    return <SecondaryText style={utils.marginTopS}>{children}</SecondaryText>;
}

export default FormHint;
