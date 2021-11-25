import React from 'react';
import appStyles from '../../styles';
import {View} from 'react-native';

const Panel = ({children}) => <View style={appStyles.panel}>{children}</View>;

export default Panel;
