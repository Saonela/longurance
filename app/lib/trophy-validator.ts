import {Trophy} from '../types/Trophy';

type TrophyKey = keyof Trophy;

const stringFields: TrophyKey[] = ['id', 'createdAt', 'title'];
const numberFields: TrophyKey[] = ['distance', 'duration'];

export function isTrophyValid(trophy: Trophy): boolean {
    return (
        stringFields.every((field) => typeof trophy[field] === 'string') &&
        numberFields.every((field) => typeof trophy[field] === 'number') &&
        (trophy.createdAt === '' ||
            !Number.isNaN(Date.parse(trophy.createdAt))) &&
        (trophy.completedAt === null ||
            !Number.isNaN(Date.parse(trophy.completedAt))) &&
        Array.isArray(trophy.entryIds) &&
        trophy.entryIds.every((id: unknown) => typeof id === 'string') &&
        (trophy.type === 'TOTAL' ||
            trophy.type === 'INDIVIDUAL' ||
            trophy.activity === 'RUNNING') &&
        (trophy.activity === 'SWIMMING' ||
            trophy.activity === 'CYCLING' ||
            trophy.activity === 'RUNNING')
    );
}
