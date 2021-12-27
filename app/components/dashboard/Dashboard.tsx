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
import {Activity} from '../../types/Activity';
import utils from '../../styles-utilities';
import SelectionButtons from '../shared/SelectionButtons';
import EntryEffortBar from '../entry/EntryEffortBar';
import useFiltersStore from '../../state/filters';
import {TimeInterval} from '../../types/TimeInterval';
import {useActivityFilterStore} from '../../state/activityFilter';
import {getEntries, useEntriesStore} from '../../state/entries';

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
    },
    {
        label: 'All',
        value: null
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
    const {dashboardTimeInterval, setDashboardTimeInterval} = useFiltersStore();
    const {filter} = useActivityFilterStore();
    const entries = useEntriesStore((state) =>
        getEntries(state, filter, dashboardTimeInterval)
    );
    return (
        <View style={styles.panel}>
            <SelectionButtons
                selected={dashboardTimeInterval}
                items={timeIntervalValues}
                style={[utils.marginBottomXL]}
                onChange={setDashboardTimeInterval}
            />
            <View style={[utils.marginBottomXL]}>
                <PrimaryText style={styles.dateText}>
                    {getCurrentTimeIntervalText(dashboardTimeInterval)}
                </PrimaryText>
                <PrimaryHeader>
                    {getActivityFilterText(filter).toUpperCase()}
                </PrimaryHeader>
            </View>
            <View
                style={[utils.row, utils.justifyBetween, utils.marginBottomL]}
            >
                <View>
                    <SecondaryHeader style={styles.labelledText}>
                        120km
                    </SecondaryHeader>
                    <SecondaryText>Distance</SecondaryText>
                </View>
                <View>
                    <SecondaryHeader style={styles.labelledText}>
                        17h 15min
                    </SecondaryHeader>
                    <SecondaryText>Duration</SecondaryText>
                </View>
            </View>
            <View style={[utils.row]}>
                <View style={styles.secondaryDetails}>
                    <PrimaryText style={styles.secondaryDetailsText}>
                        15
                    </PrimaryText>
                    <SecondaryText>Workouts</SecondaryText>
                </View>
                <View style={styles.secondaryDetails}>
                    <PrimaryText style={styles.secondaryDetailsText}>
                        5&apos;48&quot;
                    </PrimaryText>
                    <SecondaryText>Avg. Pace</SecondaryText>
                </View>
            </View>
            <View style={styles.separator} />
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
                    <PrimaryText style={styles.secondaryDetailsText}>
                        3/5
                    </PrimaryText>
                </View>
                <EntryEffortBar effort={4} />
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
        fontFamily: 'LatoBlack',
        fontSize: 24,
        paddingBottom: theme.SPACING.XS
    },
    backgroundSlice: {
        position: 'absolute',
        bottom: 0,
        borderRightWidth: Dimensions.get('window').width,
        borderBottomWidth: 70,
        borderBottomColor: theme.COLORS.BACKGROUND_SECONDARY,
        borderColor: 'transparent'
    },
    separator: {
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY,
        marginTop: theme.SPACING.L,
        marginBottom: theme.SPACING.L,
        height: 2
    }
});

export default Dashboard;
