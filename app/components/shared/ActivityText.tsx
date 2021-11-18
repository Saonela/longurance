import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ActivityIcon from '../activity-icon/ActivityIcon';
import {Activity} from '../../types/Activity';
import appStyles from '../../styles';
import theme from '../../theme';
import {getActivityTypeText} from '../../services/EntryService';

interface ActivityTextProps {
    activity: Activity;
    style?: any;
}

function ActivityText({activity, style = {}}: ActivityTextProps) {
    return (
        <View style={[styles.container, style]}>
            <ActivityIcon activity={activity} style={styles.activityIcon}/>
            <Text style={appStyles.primaryText}>{getActivityTypeText(activity)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    activityIcon: {
        marginRight: theme.SPACING.S,
        color: theme.COLORS.FONT_PRIMARY
    }
});

export default ActivityText;
