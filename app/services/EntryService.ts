import {Activity} from '../types/Activity';

export function getActivityTypeText(type: Activity) {
    if (type === Activity.CYCLING) return 'CYCLE';
    if (type === Activity.SWIMMING) return 'SWIM';
    if (type === Activity.RUNNING) return 'RUN';
}
