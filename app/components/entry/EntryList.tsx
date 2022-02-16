import React from 'react';
import {FlatList} from 'react-native';
import EntryCard from './EntryCard';
import {getSortedEntries, useEntriesStore} from '../../state/entries';
import EmptyListMessage from '../list/EmptyListMessage';
import {useActivityFilterStore} from '../../state/activity-filter';
import {useEntriesSettingsStore} from '../../state/entries-settings';
import utils from '../../styles-utilities';

interface EntryListProps {
    onPress: (id: string) => void;
}

function EntryList({onPress}: EntryListProps) {
    const {filter} = useActivityFilterStore();
    const {settings} = useEntriesSettingsStore();
    const entries = useEntriesStore(getSortedEntries(filter, settings));

    if (entries.length === 0) {
        return <EmptyListMessage>No activity found</EmptyListMessage>;
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
            contentContainerStyle={utils.paddingBottomM}
        />
    );
}

export default EntryList;
