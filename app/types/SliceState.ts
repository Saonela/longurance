import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import {Entry} from './Entry';

export interface SliceState {
    status: ASYNC_STATE_STATUS;
    error: any;
    data: any;
}

export interface EntriesSliceState extends SliceState {
    data: Entry[];
}
