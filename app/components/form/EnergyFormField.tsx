import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';
import EntryEffortIcon from '../entry/EntryEffortIcon';
import theme from '../../theme';
import FormLabel from './FormLabel';
import {EffortScale} from '../../types/Effort';
import appStyles from '../../styles';
import * as Animatable from 'react-native-animatable';

const zoomIn = {
    from: {
        translateY: 0,
        scale: 1,
    },
    to: {
        translateY: -3,
        scale: 1.1
    },
};

const zoomOut = {
    from: {
        translateY: -3,
        scale: 1.1
    },
    to: {
        translateY: 0,
        scale: 1
    },
};


interface EnergyFormFieldProps {
    value: number,
    style?: any,
    onChange: any
}

function EnergyFormField({value, style = null, onChange}: EnergyFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel>Effort</FormLabel>
            <View style={styles.list}>
                {EffortScale.map(option =>
                    <View key={option} style={styles.option}>
                        <TouchableNativeFeedback onPress={() => onChange(option)}>
                                <Animatable.View animation={value === option ? zoomIn : zoomOut} duration={150}>
                                    <EntryEffortIcon key={option}
                                                     value={option}
                                                     disabled={value !== option}
                                                     size={theme.ICON_SIZE.M}/>
                                </Animatable.View>
                        </TouchableNativeFeedback>
                    </View>
                )}
            </View>
            <View style={styles.effortLabels}>
                <Text style={styles.effortLabel}>Light</Text>
                <Text style={{...styles.effortLabel, marginLeft: 22}}>Moderate</Text>
                <Text style={styles.effortLabel}>Vigorous</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.SPACING.S,
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 54,
        height: 54,
        borderRadius: 100
    },
    effortLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: theme.SPACING.S,
        marginTop: theme.SPACING.XS
    },
    effortLabel: {
        ...appStyles.secondaryText
    },
});

export default EnergyFormField;
