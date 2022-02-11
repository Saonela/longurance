import {Activity} from '../enums/Activity';
import {TrophyType} from '../enums/TrophyType';

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
