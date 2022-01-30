import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import Panel from '../ui/Panel';
import {
    PrimaryHeader,
    PrimaryText,
    SecondaryHeader,
    SecondaryText
} from '../ui/Text';
import {
    getDistanceText,
    getDurationText,
    getIntensityText,
    getPaceText
} from '../../lib/entry';
import Separator from '../ui/Separator';
import theme from '../../theme';
import utils from '../../styles-utilities';
import {EffortIcons} from '../../types/Effort';

interface TimelineCardProps {}

function TimelineCard({title, duration, distance, effort, workouts, onPress}) {
    return (
        <TouchableNativeFeedback
            accessibilityLabel="Timeline card"
            onPress={() => {
                console.log('timeline card');
                onPress();
            }}
        >
            <View>
                <Panel>
                    {/* <View style={[utils.row, utils.justifyBetween, utils.alignCenter]}> */}
                    <View style={[]}>
                        <SecondaryHeader color="primary">
                            {title}{' '}
                        </SecondaryHeader>
                        {/* <View style={[utils.row, utils.alignCenter]}> */}

                        {/* <SecondaryText color="secondary"> */}
                        {/* <SecondaryHeader>{workouts}</SecondaryHeader> Workouts */}
                        <SecondaryText
                            style={utils.marginTopS}
                            color="secondary"
                        >
                            {workouts} Workouts
                        </SecondaryText>
                        {/* </SecondaryText> */}
                        {/* </View> */}
                        {/* <View style={styles.detailsContainer}> */}
                        {/*     <PrimaryText style={styles.detailsText}> */}
                        {/*         {workouts} */}
                        {/*     </PrimaryText> */}
                        {/*     <SecondaryText>Workouts</SecondaryText> */}
                        {/* </View> */}
                    </View>
                    <Separator marginBottom={theme.SPACING.L} />
                    {/* <PrimaryText>{workouts}</PrimaryText> */}
                    {/* <PrimaryText>{getDurationText(duration)}</PrimaryText> */}
                    {/* <PrimaryText>{getDistanceText(distance)}</PrimaryText> */}
                    {/* <PrimaryText>{getIntensityText(effort)}</PrimaryText> */}
                    <View style={[utils.row]}>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getDistanceText(distance)}
                            </PrimaryText>
                            <SecondaryText>Distance</SecondaryText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getDurationText(duration)}
                            </PrimaryText>
                            <SecondaryText>Duration</SecondaryText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <PrimaryText style={styles.detailsText}>
                                {getPaceText(duration, distance)}
                            </PrimaryText>
                            <SecondaryText>Avg. Pace</SecondaryText>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.effortIndicator,
                            {backgroundColor: EffortIcons[effort].color}
                        ]}
                    />
                    {/* <View style={[utils.row]}> */}
                    {/* <View style={styles.detailsContainer}> */}
                    {/*     <PrimaryText style={styles.detailsText}> */}
                    {/*         {getPaceText(duration, distance)} */}
                    {/*     </PrimaryText> */}
                    {/*     <SecondaryText>Avg. Pace</SecondaryText> */}
                    {/* </View> */}
                    {/* <View style={styles.detailsContainer}> */}
                    {/*     <PrimaryText style={styles.detailsText}> */}
                    {/*         {getIntensityText(effort)} */}
                    {/*     </PrimaryText> */}
                    {/*     <SecondaryText>Avg. Intensity</SecondaryText> */}
                    {/* </View> */}
                    {/* </View> */}
                </Panel>
            </View>
        </TouchableNativeFeedback>
    );
}

const styles = StyleSheet.create({
    detailsContainer: {
        marginRight: theme.SPACING.XL
    },
    detailsText: {
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS
    },
    effortIndicator: {
        position: 'absolute',
        right: 0,
        width: 1,
        height: 200
    }
});

export default TimelineCard;
