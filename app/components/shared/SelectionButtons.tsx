import React from 'react';
import {Animated, StyleProp, StyleSheet, View} from 'react-native';
import Button from './Button';
import theme from '../../theme';

interface SelectionButtonItem {
    label: string;
    value: any;
}

interface SelectionButtonsProps {
    selected: any;
    items: SelectionButtonItem[];
    onChange: (value: any) => any;
    style?:  StyleProp<any>
}

function SelectionButtons({selected, items, onChange, style = {}}: SelectionButtonsProps) {
    const buttons = items.map(({label, value}: SelectionButtonItem) => {
        const isSelected = selected === value;
        const selectedStyle = isSelected ? styles.activeButton : {};
        return (
            <Button key={value}
                    label={label}
                    style={{...styles.button, ...selectedStyle}}
                    onPress={() => !isSelected && onChange(value)}/>
        )
    });

    return (
        <Animated.View style={[styles.wrapper, style]}>
            <View style={styles.container}>
                {buttons}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    container: {
        flexDirection: 'row',
        borderWidth: theme.BORDER.WIDTH,
        borderRadius: theme.BORDER.RADIUS + 2,
        borderColor: theme.COLORS.BACKGROUND_SECONDARY
    },
    activeButton: {
        color: theme.COLORS.FONT_PRIMARY,
        backgroundColor: theme.COLORS.BACKGROUND_SECONDARY,
    },
    button: {
        color: theme.COLORS.FONT_SECONDARY,
        backgroundColor: 'transparent',
        elevation: 0
    }
});

export default SelectionButtons;
