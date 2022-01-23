import React from 'react';
import {FlatList} from 'react-native';
import EntryCard from './EntryCard';
import theme from '../../theme';
import {getSortedEntries, useEntriesStore} from '../../state/entries';
import NoDataMessage from '../list/NoDataMessage';
import {useActivityFilterStore} from '../../state/activityFilter';
import {useEntriesSettingsStore} from '../../state/entries-settings';

interface EntryListProps {
    onPress: (id: string) => void;
}

function EntryList({onPress}: EntryListProps) {
    const {filter} = useActivityFilterStore();
    const {settings} = useEntriesSettingsStore();
    const entries = useEntriesStore(getSortedEntries(settings));

    if (entries.length === 0) {
        return <NoDataMessage>No activity found</NoDataMessage>;
    }

    const keyExtractor = (entry) => entry.id;
    const renderItem = ({item}) => (
        <EntryCard entry={item} onPress={() => onPress(item.id)} />
    );

    return (
        <FlatList
            data={entries}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
                length: 200,
                offset: 200 * index,
                index
            })}
            initialNumToRender={6}
            removeClippedSubviews
            contentContainerStyle={{paddingBottom: theme.SPACING.M}}
        />
    );
}

export default EntryList;
