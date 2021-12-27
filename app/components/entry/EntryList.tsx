import React from 'react';
import {FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import EntryCard from './EntryCard';
import theme from '../../theme';
import {useEntriesStore} from '../../state/entries';
import NoDataMessage from '../list/NoDataMessage';

interface EntryListProps {
    onPress: (id: string) => void;
}

const keyExtractor = (item) => item.id;

function EntryList({onPress}: EntryListProps) {
    const {entries} = useEntriesStore();

    if (entries.length === 0) {
        return <NoDataMessage>No activity found</NoDataMessage>;
    }

    const renderItem = ({item, index}) => (
        <Animatable.View
            animation="fadeInRightBig"
            duration={300}
            delay={index ? (index * 300) / 5 : 0}
            useNativeDriver
        >
            <EntryCard entry={item} onPress={() => onPress(item.id)} />
        </Animatable.View>
    );

    return (
        <FlatList
            data={entries}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            initialNumToRender={6}
            contentContainerStyle={{paddingBottom: theme.SPACING.M}}
        />
    );
}

export default EntryList;
