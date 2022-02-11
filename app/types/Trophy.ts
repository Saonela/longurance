import {Activity} from '../enums/Activity';

export interface Trophy {
    id: string;
    createdAt: string;
    type: TrophyType;
    entryIds: string[];
    completedAt: string | null;
    completed: boolean;
    markedAsRead: boolean;
    predefined: boolean;
    title: string;
    activity: Activity;
    distance: number;
    duration: number;
}

export enum TrophyType {
    TOTAL = 'TOTAL',
    INDIVIDUAL = 'INDIVIDUAL'
}

export enum TrophySubtype {
    DISTANCE = 'DISTANCE',
    DURATION = 'DURATION',
    PACE = 'PACE'
}
