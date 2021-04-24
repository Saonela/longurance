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
