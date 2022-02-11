import {Trophy} from '../types/Trophy';
import {TrophyType} from '../enums/TrophyType';
import {TrophySubtype} from '../enums/TrophySubtype';

export const getTrophySubtype = (trophy: Trophy) => {
    if (trophy?.distance && trophy?.duration) return TrophySubtype.PACE;
    if (trophy?.distance) return TrophySubtype.DISTANCE;
    return TrophySubtype.DURATION;
};

export const filterByTrophyType = (
    trophies: Trophy[],
    type: TrophyType,
    subType: TrophySubtype
) =>
    trophies
        .filter((trophy) => trophy.type === type)
        .filter((trophy) => getTrophySubtype(trophy) === subType);
