import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import appStyles from '../../styles';
import theme from '../../theme';
import {Trophy, TrophySubtype, TrophyType} from '../../types/Trophy';
import ActivityIcon from '../activity-icon/ActivityIcon';
import {getActivityTypeText} from '../../lib/entry';
import {PrimaryHeader, PrimaryText, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import {getTrophySubtype} from '../../lib/trophy';

interface TrophyCardProps {
    trophy: Trophy;
    onPress: () => void;
}

const trophyTypeLabels = {
    [TrophyType.TOTAL]: 'Total',
    [TrophyType.INDIVIDUAL]: 'Individual'
};

const trophySubtypeLabels = {
    [TrophySubtype.DISTANCE]: 'Distance',
    [TrophySubtype.DURATION]: 'Duration',
    [TrophySubtype.PACE]: 'Pace'
};

function TrophyCard({trophy, onPress}: TrophyCardProps) {
    const color = trophy.completed
        ? theme.COLORS.THEME_FONT
        : theme.COLORS.BACKGROUND_TERTIARY;
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={styles.card}>
                <View style={[utils.row, utils.justifyBetween]}>
                    <SimpleLineIcons name="trophy" size={50} color={color} />
                    <View style={[utils.alignEnd, utils.alignSelfEnd]}>
                        <SecondaryText>
                            {trophyTypeLabels[trophy.type]}{' '}
                            {trophySubtypeLabels[getTrophySubtype(trophy)]}
                        </SecondaryText>
                        <PrimaryHeader color="theme">
                            {getActivityTypeText(trophy.activity)}
                        </PrimaryHeader>
                    </View>
                </View>
                <Separator
                    marginTop={theme.SPACING.S}
                    marginBottom={theme.SPACING.SM}
                />
                <PrimaryText style={[styles.title]}>{trophy.title}</PrimaryText>
                <ActivityIcon
                    activity={trophy.activity}
                    size={150}
                    style={styles.activityIcon}
                />
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        ...appStyles.panel,
        overflow: 'hidden'
    },
    title: {
        fontFamily: 'LatoBlack'
    },
    activityIcon: {
        position: 'absolute',
        right: -20,
        bottom: -40,
        zIndex: -1,
        color: theme.COLORS.BACKGROUND_TERTIARY
    }
});

export default TrophyCard;
