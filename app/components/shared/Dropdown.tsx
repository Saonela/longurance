import React from 'react';
import {Picker as Select} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';
import theme from '../../theme';
import { FontAwesome } from '@expo/vector-icons';
import appStyles from '../../styles';

interface DropdownOption {
    name: string,
    value: any
}

interface DropdownProps {
    value: string | number,
    options: DropdownOption[],
    onChange: any
}

function Dropdown({value, options, onChange}: DropdownProps) {
    return (
        <View style={appStyles.inputField}>
            <Select
                mode="dialog"
                selectedValue={value}
                style={styles.dropdown}
                onValueChange={onChange}
                testID={'dropdown'}>
                {options.map((option: DropdownOption) =>
                    <Select.Item key={option.value} label={option.name} value={option.value} />
                )}
            </Select>
            <FontAwesome style={styles.caret} name="caret-down" size={24} color={theme.COLORS.FONT_PRIMARY} />
        </View>
    );
}


const styles = StyleSheet.create({
    dropdown: {
        ...appStyles.primaryText,
        backgroundColor: 'transparent',
        // Only way to change font size for picker...
        transform: [
            { scaleX: 0.90 },
            { scaleY: 0.90 },
        ],
        marginLeft: -20
    },
    caret: {
        position: 'absolute',
        right: theme.SPACING.M,
        top: 12
    }
});

export default Dropdown;
