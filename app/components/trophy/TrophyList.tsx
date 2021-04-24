import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert, FlatList} from 'react-native';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import * as Animatable from 'react-native-animatable';
import {deleteTrophy, getTrophies, getTrophiesStatus} from '../../redux/slices/trophiesSlice';
import ListEmptyMessage from '../list-empty-message/ListEmptyMessage';
import ListLoader from '../list-loader/ListLoader';
import TrophyCard from './TrophyCard';

interface TrophyListProps {
    onEdit: any
}

function TrophyList({onEdit}: TrophyListProps) {
    const trophies = useSelector(getTrophies)
    const trophiesStatus = useSelector(getTrophiesStatus);
    const dispatch = useDispatch();

    const confirmDelete = (id: string) => {
        Alert.alert(
            'Delete trophy',
            'Trophy will be removed from history',
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
                        dispatch(deleteTrophy(id));
                    }
                }
            ],
            {cancelable: false}
        );
    }

    const getEmptyMessage = () => {
        if (!trophies.length && trophiesStatus === ASYNC_STATE_STATUS.SUCCEEDED) {
            return <ListEmptyMessage message="No trophies found!"/>;
        }
    }

    const getLoader = () => {
        if (trophiesStatus === ASYNC_STATE_STATUS.LOADING) {
            return <ListLoader/>;
        }
    }

    const keyExtractor = item => item.id;
    const renderItem = ({item, index}) => (
        <Animatable.View animation="fadeIn"
                         duration={300}
                         delay={index ? (index * 300) / 5 : 0}
                         useNativeDriver>
            <TrophyCard trophy={item} onEdit={onEdit} onDelete={confirmDelete}/>
        </Animatable.View>
    );

    return (
        <>
            {getEmptyMessage()}
            <FlatList data={trophies}
                      keyExtractor={keyExtractor}
                      initialNumToRender={6}
                      renderItem={renderItem}/>
            {getLoader()}
        </>
    );
}

export default TrophyList;
