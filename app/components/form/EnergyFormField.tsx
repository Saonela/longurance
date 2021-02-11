import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet} from 'react-native';
import EntryEnergyIndicator from '../entry-energy-indicator/EntryEnergyIndicator';
import theme from '../../theme';
import FormLabel from './FormLabel';
import {EnergyIcons, EnergyOptions} from '../../types/Energy';

interface EnergyFormFieldProps {
    value: any,
    style: any,
    onChange: any
}

function EnergyFormField({value, style = null, onChange}: EnergyFormFieldProps) {
    return (
        <View style={style}>
            <FormLabel label="Energy"/>
            <View style={styles.list}>
                {EnergyOptions.map(option =>
                    <View key={option} style={{}}>
                        <TouchableNativeFeedback onPress={() => onChange(option)}>
                            <View style={styles.option}>
                                <View>
                                    <EntryEnergyIndicator key={option}
                                                          value={option}
                                                          activeValue={value}
                                                          inactiveColor={theme.COLORS.FONT_SECONDARY}
                                                          size={theme.ICON_SIZE.M}/>
                                </View>
                                {value === option ? <View style={{...styles.indicator, backgroundColor: EnergyIcons[option].color}}/> : null}
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    list: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.SPACING.M,
        marginRight: theme.SPACING.S,
        marginLeft: theme.SPACING.S
    },
    option: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 50,
        height: 50,
    },
    indicator: {
        width: 28,
        height: 2,
        marginTop: theme.SPACING.XS
    }
});

export default EnergyFormField;
