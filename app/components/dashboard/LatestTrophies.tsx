import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {SecondaryHeader} from '../ui/Text';
import utils from '../../styles-utilities';
import {OutlinedButton} from '../ui/Button';
import TrophyCard from '../trophy/TrophyCard';
import theme from '../../theme';
import {getTrophies, useTrophiesStore} from '../../state/trophies';

interface LatestTrophiesProps {
    itemsCount: number;
    style?: ViewStyle | ViewStyle[];
    onPress: (id: string) => void;
    onAddNew: () => void;
    onSeeMore: () => void;
}

function LatestTrophies({
    itemsCount,
    style,
    onPress,
    onAddNew,
    onSeeMore
}: LatestTrophiesProps) {
    const trophies = useTrophiesStore((state) =>
        getTrophies(state)
            .filter((trophy) => trophy.completed)
            .slice(0, itemsCount)
    );
    return (
        <View style={style}>
            <SecondaryHeader
                style={[
                    utils.marginRightXL,
                    utils.marginBottomL,
                    utils.marginLeftL
                ]}
            >
                Latest trophies
            </SecondaryHeader>
            {trophies.map((trophy) => (
                <TrophyCard
                    key={trophy.id}
                    trophy={trophy}
                    onPress={() => onPress(trophy.id)}
                />
            ))}
            <View style={styles.buttonsRow}>
                <OutlinedButton
                    style={[utils.flex1, utils.marginRightM]}
                    onPress={onAddNew}
                >
                    Create New
                </OutlinedButton>
                <OutlinedButton style={utils.flex1} onPress={onSeeMore}>
                    See More
                </OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        marginVertical: theme.SPACING.L,
        marginHorizontal: theme.SPACING.M
    }
});

export default LatestTrophies;
