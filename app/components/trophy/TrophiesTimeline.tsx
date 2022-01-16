import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import moment from 'moment';
import {SecondaryHeader} from '../ui/Text';
import {TrophySubtype, TrophyType} from '../../types/Trophy';
import TrophyCard from './TrophyCard';
import theme from '../../theme';
import {useActivityFilterStore} from '../../state/activityFilter';
import {getTrophies, useTrophiesStore} from '../../state/trophies';
import TrophiesTimelineControls from './TrophiesTimelineControls';
import {filterByTrophyType} from '../../lib/trophy';

interface TrophiesTimelineProps {
    onPress: (id: string) => void;
}

function TrophiesTimeline({onPress}: TrophiesTimelineProps) {
    const {filter} = useActivityFilterStore();
    const [trophiesTypeFilter, setTrophiesTypeFilter] = useState({
        type: TrophyType.TOTAL,
        subtype: TrophySubtype.DISTANCE
    });
    const trophies = useTrophiesStore((state) =>
        filterByTrophyType(
            getTrophies(state, filter),
            trophiesTypeFilter.type,
            trophiesTypeFilter.subtype
        )
    );

    return (
        <View>
            <TrophiesTimelineControls
                trophiesTimelineFilter={trophiesTypeFilter}
                onChange={setTrophiesTypeFilter}
            />
            <View style={styles.timeline}>
                {trophies.map((trophy) => (
                    <View
                        key={trophy.id}
                        style={[
                            styles.timelineItem,
                            trophy.completed && styles.timelineItemActive
                        ]}
                    >
                        <View
                            style={[
                                styles.timelineMark,
                                trophy.completed && styles.timelineMarkActive
                            ]}
                        />
                        {trophy.completedAt !== null && (
                            <SecondaryHeader
                                color="primary"
                                style={styles.date}
                            >
                                {moment(trophy.completedAt).format(
                                    'yyyy, MMM DD'
                                )}
                            </SecondaryHeader>
                        )}
                        <TrophyCard
                            trophy={trophy}
                            onPress={() => onPress(trophy.id)}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timeline: {
        marginLeft: theme.SPACING.L + theme.SPACING.S
    },
    timelineItem: {
        paddingTop: theme.SPACING.L,
        paddingBottom: theme.SPACING.XL,
        paddingLeft: theme.SPACING.M,
        borderLeftWidth: 4,
        borderLeftColor: theme.COLORS.BACKGROUND_TERTIARY
    },
    timelineItemActive: {
        borderLeftColor: theme.COLORS.THEME_FONT
    },
    timelineMark: {
        position: 'absolute',
        left: -16,
        width: 28,
        height: 28,
        borderRadius: 25,
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY
    },
    timelineMarkActive: {
        backgroundColor: theme.COLORS.THEME_FONT
    },
    date: {
        marginTop: -theme.SPACING.ML,
        marginLeft: theme.SPACING.M,
        marginBottom: theme.SPACING.S,
        fontSize: 20
    }
});

export default TrophiesTimeline;
