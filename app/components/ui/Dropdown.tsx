import React from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';
import appStyles from '../../styles';

interface DropdownOption<T> {
    label: string;
    value: T;
}

interface DropdownProps<T> {
    value: T;
    options: DropdownOption<T>[];
    onChange: (value: T) => void;
}

function Dropdown<T>({value, options, onChange}: DropdownProps<T>) {
    return (
        <View style={appStyles.inputField}>
            <Select
                mode="dialog"
                selectedValue={value}
                style={styles.dropdown}
                onValueChange={onChange}
                testID="dropdown"
            >
                {options.map((option) => (
                    <Select.Item
                        key={option.label}
                        label={option.label}
                        value={option.value}
                    />
                ))}
            </Select>
        </View>
    );
}

const styles = StyleSheet.create({
    dropdown: {
        fontFamily: theme.FONT_FAMILY.PRIMARY,
        color: theme.COLORS.FONT_PRIMARY,

        // The only way to change font size for picker
        transform: [{scaleX: 1.1}, {scaleY: 1.1}],
        marginLeft: 6
    }
});

export default Dropdown;
