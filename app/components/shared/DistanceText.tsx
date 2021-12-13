import React from 'react';
import {Text} from 'react-native';
import appStyles from '../../styles';


function DistanceText({distance, placeholder = null as any, style = {}, ...props}) {
    if (!distance && !placeholder) {
        return null;
    }

    const text = distance ? `${distance}km` : placeholder;
    return (
        <Text style={[appStyles.primaryText, style]} {...props}>{text}</Text>
    );
}

export default DistanceText;
