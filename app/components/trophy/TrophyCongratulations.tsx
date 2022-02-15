import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {SimpleLineIcons, Feather} from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import {Trophy} from '../../types/Trophy';
import theme from '../../theme';
import appStyles from '../../styles';
import {updateTrophy, useTrophiesStore} from '../../state/trophies';
import {Button} from '../ui/Button';
import {PrimaryHeader, PrimaryText, SecondaryText} from '../ui/Text';
import Separator from '../ui/Separator';
import utils from '../../styles-utilities';
import {
    getActivityTypeText,
    getDistanceText,
    getDurationText
} from '../../lib/entry';
import {TrophyType} from '../../enums/TrophyType';

const fadeIn = {
    from: {
        opacity: 0
    },
    to: {
        opacity: 0.75
    }
};

const fadeOut = {
    from: {
        opacity: 0.75
    },
    to: {
        opacity: 0
    }
};

function TrophyCongratulations() {
    const fadeAnimationRef = useRef<any>();
    const bounceAnimationRef = useRef<any>();

    const [visible, setVisible] = useState(false);
    const trophy = useTrophiesStore((state) =>
        state.trophies.find(
            ({completed, markedAsRead}) => completed && !markedAsRead
        )
    );

    useEffect(() => {
        setVisible(trophy !== undefined);
    }, [trophy]);

    const markAsRead = async (readTrophy: Trophy) => {
        if (fadeAnimationRef.current && bounceAnimationRef.current) {
            await Promise.all([
                fadeAnimationRef.current.animate(fadeOut),
                bounceAnimationRef.current.bounceOut()
            ]);
        }
        await setVisible(false);
        updateTrophy({...readTrophy, markedAsRead: true});
    };

    if (!visible) {
        return null;
    }

    return (
        <>
            <Animatable.View
                ref={fadeAnimationRef}
                style={styles.backgroundShade}
                animation={fadeIn}
                duration={500}
                delay={250}
            />
            <View style={{...styles.container}}>
                <Animatable.View
                    ref={bounceAnimationRef}
                    style={styles.card}
                    animation="bounceIn"
                    duration={600}
                    delay={250}
                >
                    {trophy && (
                        <>
                            <View
                                style={[
                                    utils.justifyCenter,
                                    utils.alignCenter,
                                    utils.marginBottomL
                                ]}
                            >
                                <PrimaryHeader style={utils.marginBottomXL}>
                                    Trophy achieved!
                                </PrimaryHeader>
                                <View>
                                    <SimpleLineIcons
                                        name="trophy"
                                        size={100}
                                        color={theme.COLORS.THEME}
                                    />
                                    <Feather
                                        name="check"
                                        size={100}
                                        color={theme.COLORS.THEME}
                                        style={styles.checkIcon}
                                    />
                                </View>
                            </View>
                            <View style={[utils.row, utils.justifyBetween]}>
                                <PrimaryHeader>{trophy.title}</PrimaryHeader>
                                <PrimaryHeader color="theme">
                                    {getActivityTypeText(trophy.activity)}
                                </PrimaryHeader>
                            </View>
                            <Separator />
                            <SecondaryText style={utils.marginBottomM}>
                                {trophy.type === TrophyType.INDIVIDUAL
                                    ? 'Individual '
                                    : 'Total '}
                                Requirements:
                            </SecondaryText>
                            <View style={[utils.row, utils.marginBottomXL]}>
                                {trophy.distance !== 0 && (
                                    <View style={utils.marginRightXL}>
                                        <PrimaryText style={styles.detailsText}>
                                            {getDistanceText(trophy.distance)}
                                        </PrimaryText>
                                        <SecondaryText>Distance</SecondaryText>
                                    </View>
                                )}
                                {trophy.duration !== 0 && (
                                    <View>
                                        <PrimaryText style={styles.detailsText}>
                                            {getDurationText(trophy.duration)}
                                        </PrimaryText>
                                        <SecondaryText>Duration</SecondaryText>
                                    </View>
                                )}
                            </View>
                            <Button onPress={() => markAsRead(trophy)}>
                                Close
                            </Button>
                        </>
                    )}
                </Animatable.View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundShade: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        elevation: 100,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        opacity: 0.85
    },
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        elevation: 100
    },
    card: {
        ...appStyles.panel,
        width: '84%',
        elevation: 5
    },
    checkIcon: {
        position: 'absolute',
        top: -38,
        right: -12
    },
    detailsText: {
        fontFamily: 'LatoBlack',
        paddingBottom: theme.SPACING.XS
    }
});

export default TrophyCongratulations;
