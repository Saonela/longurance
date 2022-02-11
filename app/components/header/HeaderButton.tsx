import React from 'react';
import {Feather} from '@expo/vector-icons';
import {ViewStyle} from 'react-native';
import IconButton from '../ui/IconButton';
import theme from '../../theme';

interface HeaderButtonProps {
    iconName; // string
    style?: ViewStyle | ViewStyle[];
    onPress: () => void;
}

function HeaderButton({iconName, style = {}, onPress}: HeaderButtonProps) {
    return (
        <IconButton
            size={36}
            style={{...style, ...{marginRight: theme.SPACING.S}}}
            onPress={onPress}
        >
            <Feather
                name={iconName}
                size={theme.ICON_SIZE.SM}
                color={theme.COLORS.FONT_PRIMARY}
            />
        </IconButton>
    );
}

export default HeaderButton;
