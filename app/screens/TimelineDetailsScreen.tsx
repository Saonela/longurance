import React from 'react';
import {ScrollView, View} from 'react-native';
import appStyles from '../styles';
import TimelineDetails from '../components/timeline/TimelineDetails';

function TimelineDetailsScreen({route}) {
    const {currentEntry, previousEntry, timeInterval} = route.params;
    return (
        <View style={appStyles.screenContainer}>
            <ScrollView>
                <TimelineDetails
                    currentEntry={currentEntry}
                    previousEntry={previousEntry}
                    timeInterval={timeInterval}
                />
            </ScrollView>
        </View>
    );
}

export default TimelineDetailsScreen;
