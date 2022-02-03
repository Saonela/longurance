import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SecondaryText} from '../ui/Text';
import theme from '../../theme';
import utils from '../../styles-utilities';

interface ChartLegendProps {
    items: {
        label: string;
        color: string;
    }[];
}

function ChartLegend({items}: ChartLegendProps) {
    return (
        <View testID="chart-legend" style={[utils.row]}>
            {items.map((item) => (
                <View key={item.label} style={styles.legendItem}>
                    <View
                        style={[
                            styles.colorSquare,
                            {backgroundColor: item.color}
                        ]}
                    />
                    <SecondaryText>{item.label}</SecondaryText>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: theme.SPACING.L
    },
    colorSquare: {
        width: 24,
        height: 24,
        marginRight: theme.SPACING.M
    }
});

export default ChartLegend;
