import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';

export interface SliceState {
    status: ASYNC_STATE_STATUS;
    error: any;
    data: any[];
}

