import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import appStyles from '../../styles';
import {Trophy} from '../../types/Trophy';
import theme from '../../theme';
import utils from '../../styles-utilities';
import {PrimaryHeader, PrimaryText, SecondaryText} from '../ui/Text';
import {
    getActivityTypeText,
    getDistanceText,
    getDurationText
} from '../../lib/entry';
import Separator from '../ui/Separator';

interface TrophyDetailsProps {
    trophy: Trophy;
}

function TrophyDetails({trophy}: TrophyDetailsProps) {
    return (
        <View style={appStyles.panel}>
            <View style={[utils.row, utils.justifyBetween]}>
                <View>
                    <SecondaryText style={utils.marginBottomXS}>
                        {trophy.completed
                            ? 'Trophy achieved!'
                            : 'Trophy is not yet achieved.'}
                    </SecondaryText>
                    <PrimaryHeader>{trophy.title}</PrimaryHeader>
                </View>
                <PrimaryHeader color="theme" style={utils.alignSelfEnd}>
                    {getActivityTypeText(trophy.activity)}
                </PrimaryHeader>
            </View>
            <Separator />
            <View style={utils.row}>
                <SimpleLineIcons
                    name="trophy"
                    size={72}
                    color={
                        trophy.completed
                            ? theme.COLORS.THEME_FONT
                            : theme.COLORS.BACKGROUND_TERTIARY
                    }
                    style={utils.marginLeftXS}
                />
                <View style={utils.marginLeftXL}>
                    <SecondaryText style={utils.marginBottomM}>
                        Requirements:
                    </SecondaryText>
                    <View style={utils.row}>
                        {trophy.distance !== 0 && (
                            <View style={utils.marginRightXL}>
                                <PrimaryText style={styles.detailsText}>
                                    {getDistanceText(trophy.distance)}
                                </PrimaryText>
                                <SecondaryText>Distance</SecondaryText>
                            </View>
                        )}
                        {trophy.duration !== 0 && (
                            <View>
                                <PrimaryText style={styles.detailsText}>
                                    {getDurationText(trophy.duration)}
                                </PrimaryText>
                                <SecondaryText>Duration</SecondaryText>
                            </View>
                        )}
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    detailsText: {
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS
    }
});

export default TrophyDetails;
