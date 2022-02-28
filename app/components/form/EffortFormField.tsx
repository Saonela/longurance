import React from 'react';
import {View, TouchableNativeFeedback, StyleSheet, Text} from 'react-native';
import * as Animatable from 'react-native-animatable';
import EntryEffortIcon from '../entry/EntryEffortIcon';
import theme from '../../theme';
import FormLabel from './FormLabel';
import {EffortScale} from '../../types/Effort';
import appStyles from '../../styles';

const zoomIn = {
    from: {
        translateY: 0,
        scale: 1
    },
    to: {
        translateY: -3,
        scale: 1.1
    }
};

const zoomOut = {
    from: {
        translateY: -3,
        scale: 1.1
    },
    to: {
        translateY: 0,
        scale: 1
    }
};

interface EnergyFormFieldProps {
    value: number;
    onChange: (value: number) => void;
}

function EffortFormField({value, onChange}: EnergyFormFieldProps) {
    return (
        <View>
            <FormLabel>Effort</FormLabel>
            <View style={styles.list}>
                {EffortScale.map((option) => (
                    <View key={option} style={styles.option}>
                        <TouchableNativeFeedback
                            onPress={() => onChange(option)}
                        >
                            <Animatable.View
                                style={styles.option}
                                animation={value === option ? zoomIn : zoomOut}
                                duration={150}
                            >
                                <EntryEffortIcon
                                    key={option}
                                    value={option}
                                    disabled={value !== option}
                                    size={theme.ICON_SIZE.M}
                                />
                            </Animatable.View>
                        </TouchableNativeFeedback>
                    </View>
                ))}
            </View>
            <View style={styles.effortLabels}>
                <Text style={styles.effortLabel}>Light</Text>
                <Text style={{...styles.effortLabel, marginLeft: 28}}>
                    Moderate
                </Text>
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
        marginLeft: -theme.SPACING.S,
        marginRight: -theme.SPACING.S
    },
    option: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 64,
        height: 64,
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
    }
});

export default EffortFormField;
