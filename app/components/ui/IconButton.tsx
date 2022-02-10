import React from 'react';
import {
    StyleSheet,
    TouchableNativeFeedback,
    View,
    ViewStyle
} from 'react-native';

interface IconButtonProps {
    size: number;
    onPress: () => void;
    children: React.ReactNode;
    style: ViewStyle | ViewStyle[];
}

function IconButton({
    size = 36,
    style = {},
    children,
    onPress
}: IconButtonProps) {
    return (
        <View style={[styles.button, style]}>
            <TouchableNativeFeedback style={styles.button} onPress={onPress}>
                <View
                    style={{
                        ...styles.button,
                        width: size,
                        height: size
                    }}
                >
                    {children}
                </View>
            </TouchableNativeFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        overflow: 'hidden'
    }
});

export default IconButton;
