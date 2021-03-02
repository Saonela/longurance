import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {ActivityOptions} from '../../types/Activity';
import ActivityIcon from '../activity-icon/ActivityIcon';
import theme from '../../theme';
import {useDispatch, useSelector} from 'react-redux';
import {setEntriesFilter, getEntriesFilter} from '../../redux/slices/entriesFilterSlice';

const activityOptions = ActivityOptions.map((option) => {
    return {
        ...option,
        icon: () => <ActivityIcon activity={option.value} style={styles.icon}/>
    }
})

const options: any = [
    {
        label: 'All',
        value: 'all',
        icon: () => <Text style={styles.icon}/>
    },
    ...activityOptions
];

interface ActivityFilterProps {
    style: any
}

// TODO: there seems to be no fully and easy customizable dropdown option. Need to create custom solution
function ActivityFilter({style}: ActivityFilterProps) {
    const filter = useSelector(getEntriesFilter);
    const dispatch = useDispatch();

    return (
        <View style={style}>
            <DropDownPicker
                items={options}
                defaultValue={filter ? filter : 'all'}
                placeholder={''}
                style={styles.picker}
                dropDownStyle={styles.dropdown}
                dropDownMaxHeight={500}
                containerStyle={styles.container}
                itemStyle={styles.item}
                labelStyle={styles.itemLabel}
                activeItemStyle={styles.activeItem}
                arrowColor={theme.COLORS.FONT_PRIMARY}
                onChangeItem={({value}) => {
                    dispatch(setEntriesFilter(value === 'all' ? null : value))
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    picker: {
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
        borderWidth: 0,
    },
    dropdown: {
        borderWidth: 0,
        borderTopWidth: 2,
        borderTopColor: theme.COLORS.BACKGROUND_PRIMARY,
        borderRadius: theme.BORDER.RADIUS,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY
    },
    arrow: {
        color: theme.COLORS.FONT_PRIMARY
    },
    container: {
        width: 140,
        height: 40,
    },
    item: {
        justifyContent: 'flex-start',
        height: 40
    },
    itemLabel: {
        color: theme.COLORS.FONT_PRIMARY,
    },
    activeItem: {},
    icon: {
        width: 24,
        marginRight: theme.SPACING.XS,
        color: theme.COLORS.FONT_PRIMARY,
        textAlign: 'center',
    }
});

export default ActivityFilter;
