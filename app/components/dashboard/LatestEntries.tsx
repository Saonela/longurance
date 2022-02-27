import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {PrimaryText, SecondaryHeader} from '../ui/Text';
import utils from '../../styles-utilities';
import {getEntriesByActivity, useEntriesStore} from '../../state/entries';
import EntryCard from '../entry/EntryCard';
import theme from '../../theme';
import {OutlinedButton} from '../ui/Button';
import appStyles from '../../styles';
import {useActivityFilterStore} from '../../state/activity-filter';

interface LatestEntriesProps {
    itemsCount: number;
    style?: ViewStyle | ViewStyle[];
    onPress: (id: string) => void;
    onAddNew: () => void;
    onSeeMore: () => void;
}

function LatestEntries({
    itemsCount,
    style,
    onPress,
    onAddNew,
    onSeeMore
}: LatestEntriesProps) {
    const {filter} = useActivityFilterStore();
    const entries = useEntriesStore(getEntriesByActivity(filter)).slice(
        0,
        itemsCount
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
                Latest entries
            </SecondaryHeader>

            {entries.length === 0 && (
                <View style={[appStyles.centeredView, {height: 174}]}>
                    <PrimaryText color="secondary">
                        There is no activity yet!
                    </PrimaryText>
                </View>
            )}
            {entries.map((entry) => (
                <EntryCard key={entry.id} entry={entry} onPress={onPress} />
            ))}

            <View style={styles.buttonsRow}>
                <OutlinedButton
                    style={[utils.flex1, utils.marginRightM]}
                    onPress={onAddNew}
                >
                    Add New
                </OutlinedButton>
                {entries.length > 0 && (
                    <OutlinedButton style={utils.flex1} onPress={onSeeMore}>
                        See More
                    </OutlinedButton>
                )}
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

export default LatestEntries;
