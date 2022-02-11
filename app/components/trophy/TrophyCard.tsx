import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {FontAwesome5, SimpleLineIcons} from '@expo/vector-icons';
import appStyles from '../../styles';
import theme from '../../theme';
import {Trophy} from '../../types/Trophy';
import {getActivityTypeText} from '../../lib/entry';
import {PrimaryHeader, PrimaryText, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import Separator from '../ui/Separator';
import {getTrophySubtype} from '../../lib/trophy';
import {Activity} from '../../enums/Activity';
import {TrophyType} from '../../enums/TrophyType';
import {TrophySubtype} from '../../enums/TrophySubtype';

interface TrophyCardProps {
    trophy: Trophy;
    onPress: () => void;
}

const activityIconNames = {
    [Activity.RUNNING]: 'running',
    [Activity.SWIMMING]: 'swimmer',
    [Activity.CYCLING]: 'bicycle'
};

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
                <FontAwesome5
                    name={activityIconNames[trophy.activity]}
                    size={150}
                    style={[styles.activityImage, styles[trophy.activity]]}
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
    activityImage: {
        position: 'absolute',
        right: -20,
        bottom: -40,
        zIndex: -1,
        color: theme.COLORS.BACKGROUND_TERTIARY
    },
    [Activity.RUNNING]: {
        transform: [{rotateY: '180deg'}]
    },
    [Activity.SWIMMING]: {},
    [Activity.CYCLING]: {
        bottom: -44,
        transform: [{rotateY: '180deg'}]
    }
});

export default TrophyCard;
