import React from 'react';
import {Feather} from '@expo/vector-icons';
import IconButton from '../ui/IconButton';
import theme from '../../theme';

function HeaderButton({iconName, style = {}, onPress}) {
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
