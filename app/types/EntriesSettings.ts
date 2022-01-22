import {EntriesSortBy} from '../enums/EntriesSortBy';
import {SortDirection} from '../enums/SortDirection';

export interface EntriesSettings {
    sortBy: EntriesSortBy;
    sortDirection: SortDirection;
}
