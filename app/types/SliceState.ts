import {ASYNC_STATE_STATUS} from '../redux/asyncStateStatus';
import {Entry} from './Entry';
import {Trophy} from './Trophy';

export interface SliceState {
    status: ASYNC_STATE_STATUS;
    error: any;
    data: any;
}

export interface EntriesSliceState extends SliceState {
    data: Entry[];
}

export interface TrophiesSliceState extends SliceState {
    data: Trophy[];
}
