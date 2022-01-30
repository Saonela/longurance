import React, {useLayoutEffect, useState} from 'react';
import {
    ScrollView,
    StyleSheet,
    TouchableNativeFeedback,
    View
} from 'react-native';
import appStyles from '../styles';
import theme from '../theme';
import HeaderButton from '../components/header/HeaderButton';
import HeaderActivityFilter from '../components/header/HeaderActivityFilter';
import TrophiesOverview from '../components/trophy/TrophiesOverview';
import TrophiesTimeline from '../components/trophy/TrophiesTimeline';
import {PrimaryHeader} from '../components/ui/Text';
import {useActivityFilterStore} from '../state/activityFilter';
import {getTrophies, useTrophiesStore} from '../state/trophies';
import TrophyCard from '../components/trophy/TrophyCard';
import TimelineCard from '../components/timeline/TimelineCard';
import SelectionButtons from '../components/shared/SelectionButtons';
import utils from '../styles-utilities';
import {TimeInterval} from '../types/TimeInterval';

const timeIntervalValues = [
    // {
    //     label: 'Week',
    //     value: TimeInterval.WEEK
    // },
    {
        label: 'Month',
        value: TimeInterval.MONTH
    },
    {
        label: 'Year',
        value: TimeInterval.YEAR
    }
    // {
    //     label: 'All',
    //     value: null
    // }
];

const data = [
    {
        title: 'January, 2022',
        distance: 100,
        duration: 36000,
        effort: 5,
        workouts: 12
    },
    {
        title: 'December, 2021',
        distance: 73,
        duration: 30000,
        effort: 3,
        workouts: 10
    },
    {
        title: 'November, 2021',
        distance: 52,
        duration: 15000,
        effort: 4,
        workouts: 7
    },
    {
        title: 'October, 2021',
        distance: 15,
        duration: 5000,
        effort: 1,
        workouts: 2
    },
    {
        title: 'September, 2021',
        distance: 25,
        duration: 3500,
        effort: 2,
        workouts: 3
    }
];

function TimelineScreen({navigation}) {
    // const {filter} = useActivityFilterStore();
    // const trophies = useTrophiesStore((state) => getTrophies(state, filter));

    const navigateToDetails = (item) => {
        navigation.navigate('timeline-details', item);
    };

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         headerStyle: {
    //             height: theme.HEADER_HEIGHT,
    //             backgroundColor: theme.COLORS.BACKGROUND_PRIMARY,
    //             elevation: 0
    //         },
    //         // headerLeft: null,
    //         // headerRight: () => (
    //         //     <HeaderButton
    //         //         iconName="plus"
    //         //         onPress={() => navigation.navigate('trophy-form', {})}
    //         //     />
    //         // )
    //     });
    // }, [navigation]);

    const [timeInterval, setTimeInterval] = useState(timeIntervalValues[0]);

    return (
        <>
            <HeaderActivityFilter />
            <View style={appStyles.screenContainer}>
                <ScrollView>
                    <SelectionButtons
                        selected={timeInterval}
                        items={timeIntervalValues}
                        style={[utils.marginHorizontalM, utils.marginVerticalM]}
                        onChange={setTimeInterval}
                    />
                    {data.map((item) => (
                        <TimelineCard
                            key={item.title}
                            title={item.title}
                            duration={item.duration}
                            distance={item.distance}
                            effort={item.effort}
                            workouts={item.workouts}
                            onPress={() => {
                                console.log('on press');
                                navigateToDetails(item);
                            }}
                        />
                    ))}
                    {/* <TrophiesOverview /> */}
                    {/* <TrophiesTimeline onPress={navigateToTrophyDetails} /> */}
                    {/* <ScrollView> */}
                    {/*     {trophies.map((trophy) => ( */}
                    {/*         <TrophyCard */}
                    {/*             key={trophy.id} */}
                    {/*             trophy={trophy} */}
                    {/*             onPress={() => {}} */}
                    {/*         /> */}
                    {/*     ))} */}
                    {/* </ScrollView> */}
                    {/* <PrimaryHeader>SWIMMING</PrimaryHeader> */}
                </ScrollView>
            </View>
        </>
    );
}

export default TimelineScreen;
