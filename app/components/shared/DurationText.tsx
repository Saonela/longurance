import React from 'react';
import appStyles from '../../styles';
import {Text} from 'react-native';
import {getDurationTimeText} from '../../services/UtilityService';

interface DurationTextProps {
    duration: number;
    placeholder?: string | null;
    style?: any;
}

function DurationText({duration, placeholder = null, style = {}, ...props}: DurationTextProps) {
    if (!duration && !placeholder) {
        return null;
    }

    let text = placeholder;

    if (duration) {
        text = getDurationTimeText(duration);
    }

    return (
        <Text style={[appStyles.primaryText, style]} {...props}>{text}</Text>
    );
}

export default DurationText;
