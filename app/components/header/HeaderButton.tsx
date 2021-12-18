import React from 'react';
import IconButton from '../shared/IconButton';
import theme from '../../theme';
import {Feather} from '@expo/vector-icons';

function HeaderButton({iconName, style = {}, onPress}) {
    return (
        <IconButton
            size={36}
            style={{...style, ...{marginRight: theme.SPACING.S}}}
            noBackground={true}
            icon={
                <Feather
                    name={iconName}
                    size={theme.ICON_SIZE.SM}
                    color={theme.COLORS.FONT_PRIMARY}
                />
            }
            onPress={onPress}
        />
    );
}

export default HeaderButton;
