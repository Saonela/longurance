import React from 'react';
import {View} from 'react-native';
import {SimpleLineIcons} from '@expo/vector-icons';
import appStyles from '../../styles';
import theme from '../../theme';
import {Trophy} from '../../types/Trophy';
import {SecondaryHeader, SecondaryText} from '../ui/Text';
import utils from '../../styles-utilities';
import {getTrophySubtype} from '../../lib/trophy';
import {TrophyType} from '../../enums/TrophyType';
import {TrophySubtype} from '../../enums/TrophySubtype';

interface TrophyLiteCardProps {
    trophy: Trophy;
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

function TrophyCardLite({trophy}: TrophyLiteCardProps) {
    const color = trophy.completed
        ? theme.COLORS.THEME_FONT
        : theme.COLORS.BACKGROUND_TERTIARY;
    return (
        <View style={appStyles.panel}>
            <View style={[utils.row, utils.justifyBetween]}>
                <SimpleLineIcons name="trophy" size={50} color={color} />
                <View style={[utils.alignEnd, utils.alignSelfEnd]}>
                    <SecondaryHeader style={[utils.marginBottomS]}>
                        {trophy.title}
                    </SecondaryHeader>
                    <SecondaryText>
                        {trophyTypeLabels[trophy.type]}{' '}
                        {trophySubtypeLabels[getTrophySubtype(trophy)]}
                    </SecondaryText>
                </View>
            </View>
        </View>
    );
}

export default TrophyCardLite;
