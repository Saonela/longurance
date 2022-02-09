import {Entry} from '../types/Entry';
import {Trophy} from '../types/Trophy';
import {useEntriesStore} from '../state/entries';
import {useTrophiesStore} from '../state/trophies';
import {sortByDate} from './utility';
import {isEntryValid} from './entry-validator';
import {isTrophyValid} from './trophy-validator';

interface ImportData {
    entries: Entry[];
    trophies: Trophy[];
}

interface ExportData {
    entries: Entry[];
    trophies: Trophy[];
}

function mergeById<T extends {id: string}>(currentList: T[], toMergeList: T[]) {
    const idMap = currentList.reduce((map, item) => {
        map.set(item.id, true);
        return map;
    }, new Map());

    const resultList = [...currentList];
    toMergeList.forEach((item) => {
        if (!idMap.has(item.id)) {
            resultList.push(item);
        }
    });
    return resultList;
}

export function getExportData(): ExportData {
    return {
        entries: useEntriesStore.getState().entries,
        trophies: useTrophiesStore
            .getState()
            .trophies.filter((trophy) => !trophy.predefined)
    };
}

export function setImportedData(importData: ImportData) {
    if (
        !importData ||
        !importData.entries ||
        !importData.trophies ||
        importData.entries.some((entry) => !isEntryValid(entry)) ||
        importData.trophies.some((trophy) => !isTrophyValid(trophy))
    ) {
        throw new Error('Data is invalid.');
    }

    useEntriesStore.setState((state) => {
        const stateEntries = mergeById<Entry>(
            state.entries,
            importData.entries
        );
        sortByDate<Entry>(stateEntries, 'date');
        return {entries: stateEntries};
    });

    useTrophiesStore.setState((state) => {
        const stateTrophies = mergeById<Trophy>(
            state.trophies,
            importData.trophies
        );
        sortByDate<Trophy>(stateTrophies, 'createdAt');
        return {trophies: stateTrophies};
    });
}
