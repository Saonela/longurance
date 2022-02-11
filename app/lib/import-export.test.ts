import {getExportData, setImportedData} from './import-export';
import {Entry} from '../types/Entry';
import {Activity} from '../enums/Activity';
import {Trophy} from '../types/Trophy';
import {useEntriesStore} from '../state/entries';
import {useTrophiesStore} from '../state/trophies';
import {TrophyType} from '../enums/TrophyType';

const entries: Entry[] = [
    {
        id: '3',
        activity: Activity.CYCLING,
        distance: 50,
        duration: 7200,
        createdAt: '2021-09-01T09:10:02.207Z',
        date: '2021-09-01T09:10:02.207Z',
        title: '',
        note: 'Went well',
        effort: 5
    },
    {
        id: '2',
        activity: Activity.SWIMMING,
        distance: 2,
        duration: 3600,
        createdAt: '2021-04-10T09:10:02.207Z',
        date: '2021-04-10T09:10:02.207Z',
        title: '',
        note: '',
        effort: 1
    },
    {
        id: '1',
        activity: Activity.RUNNING,
        distance: 10,
        duration: 3600,
        createdAt: '2021-04-07T09:10:02.207Z',
        date: '2021-04-07T09:10:02.207Z',
        title: 'Challenge run #1',
        note: '',
        effort: 3
    }
];

const trophies: Trophy[] = [
    {
        id: '11',
        createdAt: '2021-01-05',
        title: 'Big 20.',
        activity: Activity.RUNNING,
        type: TrophyType.TOTAL,
        entryIds: [],
        distance: 20,
        duration: 0,
        completedAt: null,
        completed: false,
        markedAsRead: false,
        predefined: true
    },
    {
        id: '10',
        createdAt: '2021-01-01',
        title: 'My run',
        activity: Activity.RUNNING,
        type: TrophyType.INDIVIDUAL,
        entryIds: ['1'],
        distance: 5,
        duration: 0,
        completedAt: '2021-04-07T09:10:02.207Z',
        completed: true,
        markedAsRead: true,
        predefined: false
    }
];

describe('Import/export service', () => {
    it('should get export data', () => {
        useEntriesStore.setState({entries});
        useTrophiesStore.setState({trophies});
        expect(getExportData()).toEqual({
            entries,
            trophies: trophies.filter((trophy) => !trophy.predefined)
        });
    });

    it('should import data', () => {
        useEntriesStore.setState({entries: [entries[0], entries[2]]});
        useTrophiesStore.setState({trophies: [trophies[1]]});
        const importData = {
            entries: [entries[0], entries[1]],
            trophies: [trophies[0]]
        };
        setImportedData(importData);
        expect(useEntriesStore.getState().entries).toEqual(entries);
        expect(useTrophiesStore.getState().trophies).toEqual(trophies);
    });

    it('should throw error if import data is invalid', () => {
        expect(() => setImportedData({} as never)).toThrow('Data is invalid.');
        expect(() =>
            setImportedData({entries: [], trophies: [{}]} as never)
        ).toThrow('Data is invalid.');
        expect(() =>
            setImportedData({entries: [{}], trophies: []} as never)
        ).toThrow('Data is invalid.');
    });
});
