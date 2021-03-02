import React from 'react';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import EntryListEmptyMessage from '../entry-list-empty-message/EntryListEmptyMessage';
import {ActivityIndicator, Alert, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {deleteEntry, getEntries, getEntriesStatus} from '../../redux/slices/entriesSlice';
import theme from '../../theme';
import * as Animatable from 'react-native-animatable';
import EntryCard from '../entry-card/EntryCard';

interface EntryListProps {
    onEdit: any
}

function EntryList({onEdit}: EntryListProps) {
    const entries = useSelector(getEntries)
    const entriesStatus = useSelector(getEntriesStatus);
    const dispatch = useDispatch();

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Delete entry',
            'Entry will be removed from history',
            [
                {
                    text: 'Cancel',
                    onPress: () => {
                    },
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        dispatch(deleteEntry(id));
                    }
                }
            ],
            {cancelable: false}
        );
    }

    const getEmptyMessage = () => {
        return !entries.length && entriesStatus === ASYNC_STATE_STATUS.SUCCEEDED && <EntryListEmptyMessage/>;
    }

    const getLoader = () => {
        if (entriesStatus === ASYNC_STATE_STATUS.LOADING) {
            return <ActivityIndicator style={styles.loader} size={46} color={theme.COLORS.FONT_PRIMARY}/>;
        }
    }

    const keyExtractor = item => item.id;

    const renderItem = ({item, index}) => (
        <Animatable.View animation="fadeIn"
                         duration={300}
                         delay={index ? (index * 300) / 5 : 0}
                         useNativeDriver>
            <EntryCard entry={item} onEdit={onEdit} onDelete={confirmDelete}/>
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

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    list: {
        paddingTop: theme.SPACING.XL,
        paddingBottom: theme.SPACING.M
    },
    loader: {
        position: 'absolute',
        top: '45%',
        left: '50%',
        transform: [
            {translateX: -23},
            {translateY: -23}
        ],
        zIndex: 1,
    }
});

export default EntryList;
