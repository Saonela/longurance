import React from 'react';
import {Text} from 'react-native';
import appStyles from '../../styles';

function DistanceText({distance, style = {}, ...props}) {
    return (
        <Text style={[appStyles.primaryText, style]} {...props}>{distance} KM</Text>
    );
}

export default DistanceText;
