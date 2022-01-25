import React from 'react';
import {FlatList} from 'react-native';
import NoDataMessage from '../list/NoDataMessage';
import TrophyCard from './TrophyCard';
import {useTrophiesStore} from '../../state/trophies';
import theme from '../../theme';

interface TrophyListProps {
    onPress: (id: string) => void;
}

function TrophyList({onPress}: TrophyListProps) {
    const trophies = useTrophiesStore((state) => state.trophies);

    if (trophies.length === 0) {
        return <NoDataMessage>No trophies found</NoDataMessage>;
    }

    const keyExtractor = (trophy) => trophy.id;
    const renderItem = ({item}) => (
        <TrophyCard trophy={item} onPress={() => onPress(item.id)} />
    );

    return (
        <FlatList
            data={trophies}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            getItemLayout={(data, index) => ({
                length: 142,
                offset: 142 * index,
                index
            })}
            initialNumToRender={6}
            removeClippedSubviews
            contentContainerStyle={{paddingBottom: theme.SPACING.M}}
        />
    );
}

export default TrophyList;
