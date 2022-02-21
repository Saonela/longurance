import {Trophy} from '../types/Trophy';
import {TrophyType} from '../enums/TrophyType';
import {TrophySubtype} from '../enums/TrophySubtype';
import {Activity} from '../enums/Activity';

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

const getTrophySortScore = (trophy: Trophy) => {
    const trophySubtype = getTrophySubtype(trophy);

    let score = 0;
    if (trophy.activity === Activity.RUNNING) {
        score += 100;
    }
    if (trophy.activity === Activity.SWIMMING) {
        score += 50;
    }
    if (trophy.type === TrophyType.TOTAL) {
        score += 10;
    }
    if (trophySubtype === TrophySubtype.DISTANCE) {
        score += 2;
    }
    if (trophySubtype === TrophySubtype.DURATION) {
        score += 1;
    }
    return score;
};

export const sortTrophyList = (trophies: Trophy[]) =>
    trophies.slice().sort((trophy1, trophy2) => {
        let diff1 = getTrophySortScore(trophy1);
        let diff2 = getTrophySortScore(trophy2);

        const trophySubtype1 = getTrophySubtype(trophy1);
        const trophySubtype2 = getTrophySubtype(trophy2);

        if (
            trophySubtype1 === TrophySubtype.DISTANCE &&
            trophySubtype2 === TrophySubtype.DISTANCE
        ) {
            if (trophy1.distance > trophy2.distance) diff1 += 1;
            if (trophy1.distance < trophy2.distance) diff2 += 1;
        }
        if (
            (trophySubtype1 === TrophySubtype.DURATION &&
                trophySubtype2 === TrophySubtype.DURATION) ||
            (trophySubtype1 === TrophySubtype.PACE &&
                trophySubtype2 === TrophySubtype.PACE)
        ) {
            if (trophy1.duration > trophy2.duration) diff1 += 1;
            if (trophy1.duration < trophy2.duration) diff2 += 1;
        }
        return diff2 - diff1;
    });
