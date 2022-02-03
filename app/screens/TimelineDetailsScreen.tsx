import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import TimelineDetails from '../components/timeline/TimelineDetails';
import {TimelineEntry} from '../types/TimelineEntry';

function TimelineDetailsScreen({route}) {
    const timelineEntry: TimelineEntry = route.params;
    return (
        <View style={appStyles.screenContainer}>
            <ScrollView>
                <TimelineDetails timelineEntry={timelineEntry} />
            </ScrollView>
        </View>
    );
}

export default TimelineDetailsScreen;
