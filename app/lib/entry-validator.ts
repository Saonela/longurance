import {Entry} from '../types/Entry';

type EntryKey = keyof Entry;

const stringFields: EntryKey[] = ['id', 'createdAt', 'date', 'note', 'title'];
const numberFields: EntryKey[] = ['distance', 'duration', 'effort'];

export function isEntryValid(entry: Entry): boolean {
    return (
        stringFields.every((field) => typeof entry[field] === 'string') &&
        numberFields.every((field) => typeof entry[field] === 'number') &&
        !Number.isNaN(Date.parse(entry.date)) &&
        (entry.activity === 'SWIMMING' ||
            entry.activity === 'CYCLING' ||
            entry.activity === 'RUNNING')
    );
}
