import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import appStyles from '../styles';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import {useActivityFilterStore} from '../state/activity-filter';
import TimelineCard from '../components/timeline/TimelineCard';
import SelectionButtons from '../components/shared/SelectionButtons';
import utils from '../styles-utilities';
import {TimeInterval} from '../types/TimeInterval';
import {TimelineEntry} from '../types/TimelineEntry';
import {useEntriesStore} from '../state/entries';
import {getTimelineEntries} from '../state/timeline-entries';
import {
    setTimelineSettings,
    useTimelineSettingsStore
} from '../state/timeline-settings';
import {PrimaryText} from '../components/ui/Text';

const timeIntervalValues = [
    {
        label: 'Month',
        value: TimeInterval.MONTH
    },
    {
        label: 'Year',
        value: TimeInterval.YEAR
    }
];

function TimelineScreen({navigation}) {
    const {filter} = useActivityFilterStore();
    const {timeInterval} = useTimelineSettingsStore();
    const timelineEntries = useEntriesStore(
        getTimelineEntries(filter, timeInterval)
    );

    const navigateToDetails = (
        currentEntry: TimelineEntry,
        previousEntry: TimelineEntry | undefined
    ) => {
        navigation.navigate('timeline-details', {
            currentEntry,
            previousEntry,
            timeInterval
        });
    };

    const setTimeInterval = (
        interval: TimeInterval.MONTH | TimeInterval.YEAR
    ) => setTimelineSettings({timeInterval: interval});

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                {timelineEntries.length === 0 && (
                    <View style={styles.noDataMessage}>
                        <PrimaryText color="secondary">
                            There is no activity yet!
                        </PrimaryText>
                    </View>
                )}
                <ScrollView>
                    <SelectionButtons
                        selected={timeInterval}
                        items={timeIntervalValues}
                        style={[utils.marginHorizontalM, utils.marginVerticalM]}
                        onChange={setTimeInterval}
                    />
                    {timelineEntries.map((entry, i) => (
                        <TimelineCard
                            key={entry.title}
                            timelineEntry={entry}
                            onPress={() =>
                                navigateToDetails(entry, timelineEntries[i - 1])
                            }
                        />
                    ))}
                </ScrollView>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    noDataMessage: {
        position: 'absolute',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default TimelineScreen;
