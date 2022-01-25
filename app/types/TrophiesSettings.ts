import {TrophiesStateFilter} from '../enums/TrophiesStateFilter';
import {TrophiesTypeFilter} from '../enums/TrophiesTypeFilter';

export interface TrophiesSettings {
    stateFilter: TrophiesStateFilter;
    typeFilter: TrophiesTypeFilter;
}
