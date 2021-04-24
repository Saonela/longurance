import {Activity} from '../types/Activity';

class EntryService {
    static getActivityTypeText(type: Activity) {
        if (type === Activity.CYCLING) return 'CYCLE';
        if (type === Activity.SWIMMING) return 'SWIM';
        if (type === Activity.RUNNING) return 'RUN';
    }
}

export default EntryService;
