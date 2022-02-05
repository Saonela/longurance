import React from 'react';
import Constants from 'expo-constants';
import {View} from 'react-native';
import Panel from '../ui/Panel';
import utils from '../../styles-utilities';
import {PrimaryText, SecondaryHeader} from '../ui/Text';
import Separator from '../ui/Separator';

function About() {
    return (
        <Panel>
            <SecondaryHeader style={[utils.marginBottomL]}>
                About
            </SecondaryHeader>
            <View style={[utils.row, utils.justifyBetween]}>
                <PrimaryText color="secondary">Current version:</PrimaryText>
                <PrimaryText>{Constants?.manifest?.version}</PrimaryText>
            </View>
            <Separator />
            <View style={[utils.justifyBetween]}>
                <PrimaryText color="secondary" style={utils.marginBottomXS}>
                    For feedback & suggestions contact:
                </PrimaryText>
                <PrimaryText>longurance@gmail.com</PrimaryText>
            </View>
        </Panel>
    );
}

export default About;
