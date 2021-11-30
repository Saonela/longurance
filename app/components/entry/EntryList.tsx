import React from 'react';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import NoDataMessage from '../no-data-message/NoDataMessage';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getEntries, getEntriesStatus} from '../../redux/slices/entriesSlice';
import * as Animatable from 'react-native-animatable';
import EntryCard from './EntryCard';
import ListLoader from '../list-loader/ListLoader';
import theme from '../../theme';

interface EntryListProps {
    onPress: (id: string) => void
}

const keyExtractor = item => item.id;

function EntryList({onPress}: EntryListProps) {
    const entries = useSelector(getEntries)
    const entriesStatus = useSelector(getEntriesStatus);

    if (entriesStatus === ASYNC_STATE_STATUS.LOADING) {
        return <ListLoader/>;
    }

    if (entriesStatus === ASYNC_STATE_STATUS.SUCCEEDED && !entries.length) {
        return <NoDataMessage>No activity found</NoDataMessage>;
    }

    const renderItem = ({item, index}) => (
        <Animatable.View animation="fadeInRightBig"
                         duration={300}
                         delay={index ? (index * 300) / 5 : 0}
                         useNativeDriver>
            <EntryCard entry={item} onPress={() => onPress(item.id)}/>
        </Animatable.View>
    );
    return (
        <FlatList data={entries}
                  keyExtractor={keyExtractor}
                  renderItem={renderItem}
                  initialNumToRender={6}
                  contentContainerStyle={{paddingBottom: theme.SPACING.M}}/>
    );
}

export default EntryList;
