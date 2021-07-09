import React from 'react';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import ListEmptyMessage from '../list-empty-message/ListEmptyMessage';
import {FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {getEntries, getEntriesStatus} from '../../redux/slices/entriesSlice';
import * as Animatable from 'react-native-animatable';
import EntryCard from './EntryCard';
import ListLoader from '../list-loader/ListLoader';
import theme from '../../theme';

interface EntryListProps {
    onPress: any
}

function EntryList({onPress}: EntryListProps) {
    const entries = useSelector(getEntries)
    const entriesStatus = useSelector(getEntriesStatus);

    const getEmptyMessage = () => {
        return !entries.length &&
            entriesStatus === ASYNC_STATE_STATUS.SUCCEEDED &&
            <ListEmptyMessage message="No entries recorded yet!"/>;
    }

    const getLoader = () => {
        if (entriesStatus === ASYNC_STATE_STATUS.LOADING) {
            return <ListLoader/>;
        }
    }

    const keyExtractor = item => item.id;

    const renderItem = ({item, index}) => (
        <Animatable.View animation="fadeIn"
                         duration={300}
                         delay={index ? (index * 300) / 5 : 0}
                         useNativeDriver>
            <EntryCard entry={item} onPress={() => onPress(item.id)}/>
            {index === entries.length - 1 && <View style={{height: theme.SPACING.M}}/>}
        </Animatable.View>
    );

    return (
        <>
            {getEmptyMessage()}
            <FlatList data={entries}
                      keyExtractor={keyExtractor}
                      initialNumToRender={6}
                      renderItem={renderItem}/>
            {getLoader()}
        </>
    );
}

export default EntryList;
