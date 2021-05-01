import React from 'react';
import appStyles from '../../styles';
import {Text} from 'react-native';
import UtilityService from '../../services/UtilityService';

interface DurationTextProps {
    duration: number;
    placeholder?: string | null;
    style?: any;
}

function getDurationTimeText(duration: number) {
    if (!duration) {
        return {
            hours: '00',
            minutes: '00',
            seconds: '00'
        };
    }

    const {hours, minutes, seconds} = UtilityService.splitSecondsIntoChunks(duration);
    return {
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`
    }
}

function DurationText({duration, placeholder = null, style = {}, ...props}: DurationTextProps) {
    if (!duration && !placeholder) {
        return null;
    }

    let text = placeholder;

    if (duration) {
        const {hours, minutes, seconds} = getDurationTimeText(duration);
        text = `${hours}:${minutes}:${seconds}`
    }

    return (
        <Text style={[appStyles.primaryText, style]} {...props}>{text}</Text>
    );
}

export default DurationText;
