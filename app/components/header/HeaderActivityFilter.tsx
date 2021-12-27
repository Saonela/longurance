import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {ActivityOptions} from '../../types/Activity';
import theme from '../../theme';
import {
    setActivityFilter,
    useActivityFilterStore
} from '../../state/activityFilter';

const options = [{label: 'All', value: null}, ...ActivityOptions];

interface ActivityFilterProps {
    style?: any;
}

function HeaderActivityFilter({style = {}}: ActivityFilterProps) {
    const {filter} = useActivityFilterStore();
    return (
        <View style={[styles.container, style]}>
            <Picker
                mode="dropdown"
                selectedValue={filter}
                onValueChange={setActivityFilter}
                dropdownIconColor={theme.COLORS.FONT_PRIMARY}
                style={styles.picker}
            >
                {options.map(({label, value}) => (
                    <Picker.Item
                        key={value}
                        label={label}
                        value={value as string}
                    />
                ))}
            </Picker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: -theme.HEADER_HEIGHT + theme.SPACING.S,
        left: theme.SPACING.S,
        zIndex: 1,
        borderColor: theme.COLORS.FONT_PRIMARY
    },
    picker: {
        width: 140,
        height: theme.HEADER_HEIGHT - 2 * theme.SPACING.S,
        color: theme.COLORS.FONT_PRIMARY
    }
});

export default HeaderActivityFilter;
