import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
    getUnreadTrophies,
    markTrophyAsRead
} from '../../redux/slices/trophiesSlice';
import {View, Text, StyleSheet} from 'react-native';
import {Trophy} from '../../types/Trophy';
import theme from '../../theme';
import appStyles from '../../styles';
import {SimpleLineIcons} from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons';
import Button from '../shared/Button';
import DistanceText from '../shared/DistanceText';
import DurationText from '../shared/DurationText';
import ActivityText from '../shared/ActivityText';
import * as Animatable from 'react-native-animatable';

interface CongratulationsCardProps {
    trophy: Trophy;
    onClose: any;
}

function CongratulationsCard({
    trophy,
    onClose,
    ...props
}: CongratulationsCardProps) {
    const animationRef = useRef<any>(null);

    useEffect(() => {
        if (animationRef) {
            animationRef.current.startAnimation();
        }
    }, [trophy]);

    return (
        <Animatable.View
            ref={animationRef}
            style={[appStyles.panel, styles.card]}
            animation="bounceIn"
            {...props}
        >
            <Text style={[appStyles.primaryText, styles.headerText]}>
                Trophy achieved!
            </Text>
            <View style={styles.imageBox}>
                <SimpleLineIcons
                    name="trophy"
                    size={100}
                    color={theme.COLORS.THEME_FONT}
                    style={styles.trophyIcon}
                />
                <Feather
                    name="check"
                    size={100}
                    color={theme.COLORS.THEME_FONT}
                    style={styles.checkIcon}
                />
            </View>
            <Text style={appStyles.primaryText}>{trophy.title}</Text>
            <View style={styles.details}>
                <View style={styles.detailsRow}>
                    <Text style={styles.detailsLabel}>Activity:</Text>
                    <ActivityText activity={trophy.activity} />
                </View>
                {trophy.distance ? (
                    <View style={styles.detailsRow}>
                        <Text style={styles.detailsLabel}>Distance:</Text>
                        <DistanceText distance={trophy.distance} />
                    </View>
                ) : null}
                {trophy.duration ? (
                    <View style={[styles.detailsRow, {marginBottom: 0}]}>
                        <Text style={styles.detailsLabel}>Duration:</Text>
                        <DurationText duration={trophy.duration} />
                    </View>
                ) : null}
            </View>
            <Button label={'Close'} onPress={onClose} />
        </Animatable.View>
    );
}

function TrophyCongratulations(props) {
    const trophies = useSelector(getUnreadTrophies);
    const dispatch = useDispatch();

    const setAsRead = (trophy: Trophy) => {
        dispatch(markTrophyAsRead(trophy));
    };

    if (!trophies.length) {
        return null;
    }

    return (
        <>
            <View style={{...styles.backgroundShade}} />
            <View style={{...styles.container}}>
                <CongratulationsCard
                    trophy={trophies[0]}
                    onClose={() => setAsRead(trophies[0])}
                />
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
        opacity: 0.7
    },
    container: {
        position: 'absolute',
        elevation: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    card: {
        position: 'absolute',
        elevation: 5,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        paddingTop: theme.SPACING.XL,
        paddingBottom: theme.SPACING.L
    },
    headerText: {
        marginBottom: theme.SPACING.L,
        fontSize: theme.FONT_SIZE.HEADER,
        fontWeight: 'bold'
    },
    imageBox: {
        position: 'relative'
    },
    trophyIcon: {
        paddingBottom: theme.SPACING.XS,
        marginBottom: theme.SPACING.M,
        borderBottomWidth: 2,
        borderBottomColor: theme.COLORS.THEME_FONT
    },
    checkIcon: {
        position: 'absolute',
        top: -40,
        right: -10
    },
    details: {
        display: 'flex',
        width: 175,
        marginTop: theme.SPACING.SM,
        marginBottom: theme.SPACING.L
    },
    detailsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: theme.SPACING.XS
    },
    detailsLabel: {
        ...appStyles.primaryText
    }
});

export default TrophyCongratulations;
