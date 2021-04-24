import React from 'react';
import appStyles from '../../styles';
import {Text} from 'react-native';

interface DurationTextProps {
    duration: number;
    style?: any;
}

function getDurationTimeText(duration: number) {
    if (!duration) {
        return {
            hours: '00',
            minutes: '00'
        };
    }
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;

    return {
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
    }
}

function DurationText({duration, style = {}, ...props}: DurationTextProps) {
    const {hours, minutes} = getDurationTimeText(duration);
    return (
        <Text style={[appStyles.primaryText, style]} {...props}>{hours}:{minutes}:00</Text>
    );
}

export default DurationText;
