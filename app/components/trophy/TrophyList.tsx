import React from 'react';
import {FlatList} from 'react-native';
import EmptyListMessage from '../list/EmptyListMessage';
import TrophyCard from './TrophyCard';
import {getFilteredTrophies, useTrophiesStore} from '../../state/trophies';
import theme from '../../theme';
import {useTrophiesSettingsStore} from '../../state/trophies-settings';

interface TrophyListProps {
    onPress: (id: string) => void;
}

function TrophyList({onPress}: TrophyListProps) {
    const {settings} = useTrophiesSettingsStore();
    const trophies = useTrophiesStore(getFilteredTrophies(settings));

    if (trophies.length === 0) {
        return <EmptyListMessage>No trophies found</EmptyListMessage>;
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
