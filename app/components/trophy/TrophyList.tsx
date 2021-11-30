import React from 'react';
import {useSelector} from 'react-redux';
import {FlatList} from 'react-native';
import {ASYNC_STATE_STATUS} from '../../redux/asyncStateStatus';
import * as Animatable from 'react-native-animatable';
import {getTrophies, getTrophiesStatus} from '../../redux/slices/trophiesSlice';
import NoDataMessage from '../list/NoDataMessage';
import ListLoader from '../list/ListLoader';
import TrophyCard from './TrophyCard';

interface TrophyListProps {
    onPress: any
}

function TrophyList({onPress}: TrophyListProps) {
    const trophies = useSelector(getTrophies)
    const trophiesStatus = useSelector(getTrophiesStatus);

    if (!trophies.length && trophiesStatus === ASYNC_STATE_STATUS.SUCCEEDED) {
        return <NoDataMessage>No trophies found</NoDataMessage>;
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
            <TrophyCard trophy={item} onPress={() => onPress(item.id)}/>
        </Animatable.View>
    );

    return (
        <>
            <FlatList data={trophies}
                      keyExtractor={keyExtractor}
                      initialNumToRender={6}
                      renderItem={renderItem}/>
            {getLoader()}
        </>
    );
}

export default TrophyList;
