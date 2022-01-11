import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import theme from '../../theme';
import {PrimaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';

function TrophiesOverview() {
    return (
        <View style={styles.panel}>
            <PrimaryHeader style={[utils.marginBottomL]} color="theme">
                TROPHIES
            </PrimaryHeader>
            <View style={[utils.row]}>
                <View>
                    <PrimaryHeader style={[utils.marginBottomXS]}>
                        5
                    </PrimaryHeader>
                    <SecondaryText>Achieved</SecondaryText>
                </View>
            </View>
            <View style={styles.backgroundSlice} />
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        paddingTop: theme.SPACING.L,
        paddingRight: theme.SPACING.XL,
        paddingBottom: 104,
        paddingLeft: theme.SPACING.XL,
        marginBottom: theme.SPACING.M,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
    },
    backgroundSlice: {
        position: 'absolute',
        bottom: 0,
        borderRightWidth: Dimensions.get('window').width,
        borderBottomWidth: 70,
        borderBottomColor: theme.COLORS.BACKGROUND_SECONDARY,
        borderColor: 'transparent'
    }
});

export default TrophiesOverview;
