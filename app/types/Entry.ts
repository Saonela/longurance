import {Activity} from './Activity';

export interface Entry {
    id: string;
    createdAt: string;
    activity: Activity;
    distance: number;
    duration: number;
    date: string;
    effort: number;
    note: string;
    title: string;
}
