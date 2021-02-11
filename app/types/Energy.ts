import theme from '../theme';

export const EnergyOptions = [-2, -1, 0, 1, 2];

export const EnergyIcons = {
    [-2]: {name: 'sad-cry', color: theme.COLORS.ENERGY_NEGATIVE},
    [-1]: {name: 'frown', color: theme.COLORS.ENERGY_NEGATIVE},
    [0]: {name: 'meh', color: theme.COLORS.ENERGY_NEUTRAL},
    [1]: {name: 'smile', color: theme.COLORS.ENERGY_POSITIVE},
    [2]: {name: 'laugh', color: theme.COLORS.ENERGY_POSITIVE}
};
