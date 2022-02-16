import React from 'react';
import moment from 'moment';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
    PrimaryHeader,
    PrimaryText,
    SecondaryHeader,
    SecondaryText
} from '../ui/Text';
import theme from '../../theme';
import {Activity} from '../../enums/Activity';
import utils from '../../styles-utilities';
import ButtonGroup from '../ui/ButtonGroup';
import EntryEffortBar from '../entry/EntryEffortBar';
import useFiltersStore from '../../state/filters';
import {TimeInterval} from '../../enums/TimeInterval';
import {useActivityFilterStore} from '../../state/activity-filter';
import {getEntries, useEntriesStore} from '../../state/entries';
import {
    getAverageIntensity,
    getTotalDistance,
    getTotalDuration
} from '../../lib/statistics';
import {
    getDistanceText,
    getDurationText,
    getIntensityText,
    getPaceText
} from '../../lib/entry';
import Separator from '../ui/Separator';

const timeIntervalValues = [
    {
        label: 'Week',
        value: TimeInterval.WEEK
    },
    {
        label: 'Month',
        value: TimeInterval.MONTH
    },
    {
        label: 'Year',
        value: TimeInterval.YEAR
    }
];

const getCurrentTimeIntervalText = (timeInterval: TimeInterval) => {
    if (timeInterval === TimeInterval.WEEK) return 'This week';
    if (timeInterval === TimeInterval.MONTH)
        return moment().format('MMMM, YYYY');
    if (timeInterval === TimeInterval.YEAR) return moment().format('YYYY');
    return 'All time';
};

const getActivityFilterText = (filter: Activity | null) => {
    if (filter === Activity.RUNNING) return 'Running';
    if (filter === Activity.CYCLING) return 'Cycling';
    if (filter === Activity.SWIMMING) return 'Swimming';
    return 'All Activity';
};

function Dashboard() {
    const {filter} = useActivityFilterStore();
    const {dashboardTimeInterval, setDashboardTimeInterval} = useFiltersStore();
    const entries = useEntriesStore(getEntries(filter, dashboardTimeInterval));

    const distance = getTotalDistance(entries);
    const duration = getTotalDuration(entries);
    const intensity = getAverageIntensity(entries);

    return (
        <View style={styles.panel}>
            <ButtonGroup<TimeInterval>
                selected={dashboardTimeInterval}
                items={timeIntervalValues}
                style={utils.marginBottomXL}
                onChange={setDashboardTimeInterval}
            />
            <View style={[utils.marginBottomXL]}>
                <PrimaryText style={styles.dateText}>
                    {getCurrentTimeIntervalText(dashboardTimeInterval)}
                </PrimaryText>
                <PrimaryHeader color="theme">
                    {getActivityFilterText(filter).toUpperCase()}
                </PrimaryHeader>
            </View>
            <View
                style={[utils.row, utils.justifyBetween, utils.marginBottomL]}
            >
                <View>
                    <PrimaryHeader style={styles.labelledText}>
                        {getDistanceText(distance)}
                    </PrimaryHeader>
                    <SecondaryText>Distance</SecondaryText>
                </View>
                <View>
                    <PrimaryHeader style={styles.labelledText}>
                        {getDurationText(duration)}
                    </PrimaryHeader>
                    <SecondaryText>Duration</SecondaryText>
                </View>
            </View>
            <View style={[utils.row]}>
                <View style={styles.secondaryDetails}>
                    <SecondaryHeader style={styles.secondaryDetailsText}>
                        {entries.length}
                    </SecondaryHeader>
                    <SecondaryText>
                        {entries.length === 1 ? 'Workout' : 'Workouts'}
                    </SecondaryText>
                </View>
                <View style={styles.secondaryDetails}>
                    <SecondaryHeader style={styles.secondaryDetailsText}>
                        {getPaceText(duration, distance)}
                    </SecondaryHeader>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
            </View>
            <Separator
                marginTop={theme.SPACING.L}
                marginBottom={theme.SPACING.L}
            />
            <View>
                <View
                    style={[
                        utils.row,
                        utils.alignEnd,
                        utils.justifyBetween,
                        utils.marginBottomS
                    ]}
                >
                    <SecondaryText>Avg. Intensity</SecondaryText>
                    <SecondaryHeader style={styles.secondaryDetailsText}>
                        {getIntensityText(intensity)}
                    </SecondaryHeader>
                </View>
                <EntryEffortBar effort={intensity} />
            </View>
            <View style={styles.backgroundSlice} />
        </View>
    );
}

const styles = StyleSheet.create({
    panel: {
        paddingRight: theme.SPACING.XL,
        paddingBottom: 104,
        paddingLeft: theme.SPACING.XL,
        marginBottom: theme.SPACING.M,
        backgroundColor: theme.COLORS.BACKGROUND_PRIMARY
    },
    dateText: {
        marginBottom: theme.SPACING.XS,
        fontSize: theme.FONT_SIZE.SECONDARY
    },
    labelledText: {
        marginBottom: theme.SPACING.XS
    },
    secondaryDetails: {
        marginRight: theme.SPACING.XL
    },
    secondaryDetailsText: {
        paddingBottom: theme.SPACING.XS
    },
    backgroundSlice: {
        position: 'absolute',
        bottom: 0,
        borderRightWidth: Dimensions.get('window').width,
        borderBottomWidth: 70,
        borderBottomColor: theme.COLORS.BACKGROUND_SECONDARY,
        borderColor: 'transparent'
    }
});

export default Dashboard;
