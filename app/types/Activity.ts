export enum Activity {
    SWIMMING = 'SWIMMING',
    CYCLING = 'CYCLING',
    RUNNING = 'RUNNING'
}

export const ActivityOptions: {label: string, value: string}[] = [
    {label: 'Running', value: Activity.RUNNING},
    {label: 'Swimming', value: Activity.SWIMMING},
    {label: 'Cycling', value: Activity.CYCLING}
];
