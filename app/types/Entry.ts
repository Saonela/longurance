import {Activity} from './Activity';

export interface Entry {
    id: string;
    createdAt: string;
    activity: Activity;
    distance: number | null;
    duration: number | null;
    date: string;
    effort: number;
    note: string;
    title: string;
}
