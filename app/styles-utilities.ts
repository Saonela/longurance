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

    alignSelfStart: {alignSelf: 'flex-start'},
    alignSelfEnd: {alignSelf: 'flex-end'},
    alignSelfCenter: {alignSelf: 'center'},

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
    paddingTopNone: {paddingTop: 0},

    paddingRightL: {paddingRight: theme.SPACING.L},
    paddingRightM: {paddingRight: theme.SPACING.M},
    paddingRightS: {paddingRight: theme.SPACING.S},
    paddingRightSM: {paddingRight: theme.SPACING.SM},
    paddingRightXL: {paddingRight: theme.SPACING.XL},
    paddingRightXS: {paddingRight: theme.SPACING.XS},
    paddingRightNone: {paddingRight: 0},

    paddingBottomXL: {paddingBottom: theme.SPACING.XL},
    paddingBottomL: {paddingBottom: theme.SPACING.L},
    paddingBottomM: {paddingBottom: theme.SPACING.M},
    paddingBottomS: {paddingBottom: theme.SPACING.S},
    paddingBottomSM: {paddingBottom: theme.SPACING.SM},
    paddingBottomXS: {paddingBottom: theme.SPACING.XS},
    paddingBottomNone: {paddingBottom: 0},

    paddingLeftXL: {paddingLeft: theme.SPACING.XL},
    paddingLeftL: {paddingLeft: theme.SPACING.L},
    paddingLeftM: {paddingLeft: theme.SPACING.M},
    paddingLeftS: {paddingLeft: theme.SPACING.S},
    paddingLeftSM: {paddingLeft: theme.SPACING.SM},
    paddingLeftXS: {paddingLeft: theme.SPACING.XS},
    paddingLeftNone: {paddingLeft: 0},

    paddingVerticalXL: {
        paddingTop: theme.SPACING.XL,
        paddingBottom: theme.SPACING.XL
    },
    paddingVerticalL: {
        paddingTop: theme.SPACING.L,
        paddingBottom: theme.SPACING.L
    },
    paddingVerticalM: {
        paddingTop: theme.SPACING.M,
        paddingBottom: theme.SPACING.M
    },
    paddingVerticalS: {
        paddingTop: theme.SPACING.S,
        paddingBottom: theme.SPACING.S
    },
    paddingVerticalSM: {
        paddingTop: theme.SPACING.SM,
        paddingBottom: theme.SPACING.SM
    },
    paddingVerticalXS: {
        paddingTop: theme.SPACING.XS,
        paddingBottom: theme.SPACING.XS
    },

    paddingHorizontalXL: {
        paddingRight: theme.SPACING.XL,
        paddingLeft: theme.SPACING.XL
    },
    paddingHorizontalL: {
        paddingRight: theme.SPACING.L,
        paddingLeft: theme.SPACING.L
    },
    paddingHorizontalM: {
        paddingRight: theme.SPACING.M,
        paddingLeft: theme.SPACING.M
    },
    paddingHorizontalS: {
        paddingRight: theme.SPACING.S,
        paddingLeft: theme.SPACING.S
    },
    paddingHorizontalSM: {
        paddingRight: theme.SPACING.SM,
        paddingLeft: theme.SPACING.SM
    },
    paddingHorizontalXS: {
        paddingRight: theme.SPACING.XS,
        paddingLeft: theme.SPACING.XS
    },

    marginTopXL: {marginTop: theme.SPACING.XL},
    marginTopL: {marginTop: theme.SPACING.L},
    marginTopM: {marginTop: theme.SPACING.M},
    marginTopS: {marginTop: theme.SPACING.S},
    marginTopSM: {marginTop: theme.SPACING.SM},
    marginTopXS: {marginTop: theme.SPACING.XS},
    marginTopNone: {marginTop: 0},

    marginRightXL: {marginRight: theme.SPACING.XL},
    marginRightL: {marginRight: theme.SPACING.L},
    marginRightM: {marginRight: theme.SPACING.M},
    marginRightS: {marginRight: theme.SPACING.S},
    marginRightSM: {marginRight: theme.SPACING.SM},
    marginRightXS: {marginRight: theme.SPACING.XS},
    marginRightNone: {marginRight: 0},

    marginBottomXL: {marginBottom: theme.SPACING.XL},
    marginBottomL: {marginBottom: theme.SPACING.L},
    marginBottomM: {marginBottom: theme.SPACING.M},
    marginBottomS: {marginBottom: theme.SPACING.S},
    marginBottomSM: {marginBottom: theme.SPACING.SM},
    marginBottomXS: {marginBottom: theme.SPACING.XS},
    marginBottomNone: {marginBottom: 0},

    marginLeftXL: {marginLeft: theme.SPACING.XL},
    marginLeftL: {marginLeft: theme.SPACING.L},
    marginLeftM: {marginLeft: theme.SPACING.M},
    marginLeftS: {marginLeft: theme.SPACING.S},
    marginLeftSM: {marginLeft: theme.SPACING.SM},
    marginLeftXS: {marginLeft: theme.SPACING.XS},
    marginLeftNone: {marginLeft: 0},

    marginVerticalXL: {
        marginTop: theme.SPACING.XL,
        marginBottom: theme.SPACING.XL
    },
    marginVerticalL: {
        marginTop: theme.SPACING.L,
        marginBottom: theme.SPACING.L
    },
    marginVerticalM: {
        marginTop: theme.SPACING.M,
        marginBottom: theme.SPACING.M
    },
    marginVerticalS: {
        marginTop: theme.SPACING.S,
        marginBottom: theme.SPACING.S
    },
    marginVerticalSM: {
        marginTop: theme.SPACING.SM,
        marginBottom: theme.SPACING.SM
    },
    marginVerticalXS: {
        marginTop: theme.SPACING.XS,
        marginBottom: theme.SPACING.XS
    },

    marginHorizontalXL: {
        marginRight: theme.SPACING.XL,
        marginLeft: theme.SPACING.XL
    },
    marginHorizontalL: {
        marginRight: theme.SPACING.L,
        marginLeft: theme.SPACING.L
    },
    marginHorizontalM: {
        marginRight: theme.SPACING.M,
        marginLeft: theme.SPACING.M
    },
    marginHorizontalS: {
        marginRight: theme.SPACING.S,
        marginLeft: theme.SPACING.S
    },
    marginHorizontalSM: {
        marginRight: theme.SPACING.SM,
        marginLeft: theme.SPACING.SM
    },
    marginHorizontalXS: {
        marginRight: theme.SPACING.XS,
        marginLeft: theme.SPACING.XS
    }
});

export default utils;
