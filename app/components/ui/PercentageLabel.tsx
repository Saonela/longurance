import React from 'react';
import {PrimaryText} from './Text';
import theme from '../../theme';

const getPercentageDifference = (value1, value2) =>
    Math.round(((value1 - value2) / Math.abs(value2)) * 100);

interface PercentageLabel {
    value1: number;
    value2: number;
}

function PercentageLabel({value1, value2}: PercentageLabel) {
    const percentage = getPercentageDifference(value1, value2);
    let color = theme.COLORS.POSITIVE;
    if (percentage <= -3) {
        color = theme.COLORS.NEGATIVE;
    } else if (percentage <= 3) {
        color = theme.COLORS.NEUTRAL;
    }
    return (
        <PrimaryText style={{color}}>
            ({percentage >= 0 ? '+' : ''}
            {percentage}%)
        </PrimaryText>
    );
}

export default PercentageLabel;
