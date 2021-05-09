import React from 'react';
import {StyleSheet, View} from "react-native";
import appStyles from "../styles";

function StatisticsScreen({navigation}) {
    return (
        <View style={styles.wrapper}>
            <View style={appStyles.container}/>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    }
});

export default StatisticsScreen;
