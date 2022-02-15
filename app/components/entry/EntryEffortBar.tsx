import React from 'react';
import {StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import theme from '../../theme';
import {SecondaryText} from '../ui/Text';

interface EntryEffortBarProps {
    effort: number;
}

const indicatorPosition = {
    1: '0%',
    2: '25%',
    3: '47%',
    4: '70%',
    5: '93%'
};

function EntryEffortBar({effort}: EntryEffortBarProps) {
    return (
        <View>
            <LinearGradient
                style={styles.bar}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={[
                    theme.COLORS.POSITIVE,
                    theme.COLORS.NEUTRAL,
                    theme.COLORS.NEGATIVE
                ]}
            >
                <View
                    style={[
                        styles.indicator,
                        {left: indicatorPosition[effort]}
                    ]}
                />
            </LinearGradient>
            <View style={styles.labels}>
                <SecondaryText>Light</SecondaryText>
                <SecondaryText style={{marginRight: -28}}>
                    Moderate
                </SecondaryText>
                <SecondaryText>Vigorous</SecondaryText>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    bar: {
        width: '100%',
        height: 10,
        marginTop: theme.SPACING.S,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.THEME
    },
    indicator: {
        position: 'absolute',
        top: -7,
        left: -14,
        width: 24,
        height: 24,
        borderWidth: 5,
        borderRadius: 15,
        borderColor: theme.COLORS.FONT_PRIMARY,
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY,
        elevation: 4
    },
    labels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: theme.SPACING.SM
    }
});

export default EntryEffortBar;
