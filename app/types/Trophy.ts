import {Activity} from './Activity';

export interface Trophy {
    id: string;
    entryId?: string;
    createdAt: string;
    completedAt: string | null;
    completed: boolean;
    markedAsRead?: boolean;
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
