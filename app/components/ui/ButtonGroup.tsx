import React from 'react';
import {Animated, StyleSheet, View, ViewStyle} from 'react-native';
import theme from '../../theme';
import {Button} from './Button';

interface ButtonGroupProps<T> {
    selected: T;
    items: {label: string; value: T}[];
    onChange: (value: T) => void;
    style?: ViewStyle | ViewStyle[];
}

function ButtonGroup<T>({
    selected,
    items,
    onChange,
    style = {}
}: ButtonGroupProps<T>) {
    return (
        <Animated.View style={style}>
            <View style={styles.container}>
                {items.map(({label, value}) => {
                    const isSelected = selected === value;
                    return (
                        <Button
                            key={label}
                            style={[
                                styles.button,
                                isSelected ? styles.activeButton : {}
                            ]}
                            onPress={() => !isSelected && onChange(value)}
                        >
                            {label}
                        </Button>
                    );
                })}
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderWidth: theme.BORDER.WIDTH,
        borderRadius: theme.BORDER.RADIUS + 2,
        borderColor: theme.COLORS.BACKGROUND_TERTIARY
    },
    button: {
        flex: 1,
        paddingVertical: theme.SPACING.S,
        paddingHorizontal: theme.SPACING.L,
        backgroundColor: 'transparent'
    },
    activeButton: {
        backgroundColor: theme.COLORS.BACKGROUND_TERTIARY
    }
});

export default ButtonGroup;
