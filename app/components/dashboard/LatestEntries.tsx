import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {SecondaryHeader} from '../ui/Text';
import utils from '../../styles-utilities';
import {getEntries, useEntriesStore} from '../../state/entries';
import EntryCard from '../entry/EntryCard';
import Button from '../shared/Button';
import theme from '../../theme';

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
    const entries = useEntriesStore((state) =>
        getEntries(state).slice(0, itemsCount)
    );
    return (
        <View style={style}>
            <SecondaryHeader
                style={[
                    utils.marginRightXL,
                    utils.marginBottomL,
                    utils.marginLeftL,
                    {fontSize: 24}
                ]}
            >
                Latest entries
            </SecondaryHeader>
            {entries.map((entry) => (
                <EntryCard
                    key={entry.id}
                    entry={entry}
                    onPress={() => onPress(entry.id)}
                />
            ))}
            <View style={styles.buttonsRow}>
                <Button
                    style={[styles.button, utils.marginRightM]}
                    label="Add new"
                    onPress={onAddNew}
                />
                <Button
                    style={styles.button}
                    label="See more"
                    onPress={onSeeMore}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonsRow: {
        flexDirection: 'row',
        marginVertical: theme.SPACING.L,
        marginHorizontal: theme.SPACING.M
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingTop: theme.SPACING.SM,
        paddingBottom: theme.SPACING.SM,
        borderColor: theme.COLORS.BACKGROUND_TERTIARY,
        borderWidth: theme.BORDER.WIDTH,
        backgroundColor: 'transparent',
        elevation: 0
    }
});

export default LatestEntries;
