import {StyleSheet} from 'react-native';
import theme from './theme';

const utils = StyleSheet.create({
    flex1: {flex: 1},
    flex2: {flex: 2},
    flex3: {flex: 3},
    flex4: {flex: 4},
    flex5: {flex: 5},
    row: {flexDirection: 'row'},
    col: {flexDirection: 'column'},
    wrap: {flexWrap: 'wrap'},

    alignStart: {alignItems: 'flex-start'},
    alignEnd: {alignItems: 'flex-end'},
    alignCenter: {alignItems: 'center'},

    justifyStart: {justifyContent: 'flex-start'},
    justifyEnd: {justifyContent: 'flex-end'},
    justifyCenter: {justifyContent: 'center'},
    justifyAround: {justifyContent: 'space-around'},
    justifyBetween: {justifyContent: 'space-between'},

    paddingTopXL: {paddingTop: theme.SPACING.XL},
    paddingTopL: {paddingTop: theme.SPACING.L},
    paddingTopM: {paddingTop: theme.SPACING.M},
    paddingTopS: {paddingTop: theme.SPACING.S},
    paddingTopSM: {paddingTop: theme.SPACING.SM},
    paddingTopXS: {paddingTop: theme.SPACING.XS},

    paddingRightL: {paddingRight: theme.SPACING.L},
    paddingRightM: {paddingRight: theme.SPACING.M},
    paddingRightS: {paddingRight: theme.SPACING.S},
    paddingRightSM: {paddingRight: theme.SPACING.SM},
    paddingRightXL: {paddingRight: theme.SPACING.XL},
    paddingRightXS: {paddingRight: theme.SPACING.XS},

    paddingBottomXL: {paddingBottom: theme.SPACING.XL},
    paddingBottomL: {paddingBottom: theme.SPACING.L},
    paddingBottomM: {paddingBottom: theme.SPACING.M},
    paddingBottomS: {paddingBottom: theme.SPACING.S},
    paddingBottomSM: {paddingBottom: theme.SPACING.SM},
    paddingBottomXS: {paddingBottom: theme.SPACING.XS},

    paddingLeftXL: {paddingLeft: theme.SPACING.XL},
    paddingLeftL: {paddingLeft: theme.SPACING.L},
    paddingLeftM: {paddingLeft: theme.SPACING.M},
    paddingLeftS: {paddingLeft: theme.SPACING.S},
    paddingLeftSM: {paddingLeft: theme.SPACING.SM},
    paddingLeftXS: {paddingLeft: theme.SPACING.XS},

    marginTopXL: {marginTop: theme.SPACING.XL},
    marginTopL: {marginTop: theme.SPACING.L},
    marginTopM: {marginTop: theme.SPACING.M},
    marginTopS: {marginTop: theme.SPACING.S},
    marginTopSM: {marginTop: theme.SPACING.SM},
    marginTopXS: {marginTop: theme.SPACING.XS},

    marginRightXL: {marginRight: theme.SPACING.XL,},
    marginRightL: {marginRight: theme.SPACING.L},
    marginRightM: {marginRight: theme.SPACING.M},
    marginRightS: {marginRight: theme.SPACING.S,},
    marginRightSM: {marginRight: theme.SPACING.SM,},
    marginRightXS: {marginRight: theme.SPACING.XS},

    marginBottomXL: {marginBottom: theme.SPACING.XL},
    marginBottomL: {marginBottom: theme.SPACING.L},
    marginBottomM: {marginBottom: theme.SPACING.M},
    marginBottomS: {marginBottom: theme.SPACING.S},
    marginBottomSM: {marginBottom: theme.SPACING.SM},
    marginBottomXS: {marginBottom: theme.SPACING.XS},

    marginLeftXL: {marginLeft: theme.SPACING.XL},
    marginLeftL: {marginLeft: theme.SPACING.L},
    marginLeftM: {marginLeft: theme.SPACING.M},
    marginLeftS: {marginLeft: theme.SPACING.S},
    marginLeftSM: {marginLeft: theme.SPACING.SM},
    marginLeftXS: {marginLeft: theme.SPACING.XS}
});

export default utils;
