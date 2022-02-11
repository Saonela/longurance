import React from 'react';
import {StyleSheet, View} from 'react-native';
import {PrimaryText} from '../ui/Text';

interface EmptyListMessageProps {
    children: React.ReactNode;
}

function EmptyListMessage({children}: EmptyListMessageProps) {
    return (
        <View style={styles.container}>
            <PrimaryText>{children}</PrimaryText>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default EmptyListMessage;
