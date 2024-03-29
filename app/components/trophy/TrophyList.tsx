import React from 'react';
import {FlatList} from 'react-native';
import EmptyListMessage from '../list/EmptyListMessage';
import TrophyCard from './TrophyCard';
import {getFilteredTrophies, useTrophiesStore} from '../../state/trophies';
import {useTrophiesSettingsStore} from '../../state/trophies-settings';
import utils from '../../styles-utilities';
import {useActivityFilterStore} from '../../state/activity-filter';

interface TrophyListProps {
    onPress: (id: string) => void;
}

function TrophyList({onPress}: TrophyListProps) {
    const {filter} = useActivityFilterStore();
    const {settings} = useTrophiesSettingsStore();
    const trophies = useTrophiesStore(getFilteredTrophies(filter, settings));

    if (trophies.length === 0) {
        return <EmptyListMessage>No trophies found</EmptyListMessage>;
    }

    const keyExtractor = (trophy) => trophy.id;
    const renderItem = ({item}) => (
        <TrophyCard trophy={item} onPress={onPress} />
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
            contentContainerStyle={utils.paddingBottomM}
        />
    );
}

export default TrophyList;
