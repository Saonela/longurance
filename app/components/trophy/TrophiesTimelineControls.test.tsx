import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import TrophiesTimelineControls from './TrophiesTimelineControls';
import {TrophySubtype, TrophyType} from '../../types/Trophy';
import {TrophiesTimelineFilter} from '../../types/TrophiesTimelineFilter';

describe('TrophiesTimelineControls', () => {
    let spy;

    const setup = (filter: TrophiesTimelineFilter) => {
        spy = jest.fn();
        return render(
            <TrophiesTimelineControls
                trophiesTimelineFilter={filter}
                onChange={spy}
            />
        );
    };

    it('should emit change', () => {
        const {getByText} = setup({
            type: TrophyType.TOTAL,
            subtype: TrophySubtype.DISTANCE
        });
        fireEvent.press(getByText('Duration'));
        expect(spy).toHaveBeenCalledWith({
            type: TrophyType.TOTAL,
            subtype: TrophySubtype.DURATION
        });
    });

    it('should set pace subtype to distance if changing type to total', () => {
        const {getByText} = setup({
            type: TrophyType.INDIVIDUAL,
            subtype: TrophySubtype.PACE
        });
        fireEvent.press(getByText('Total'));
        expect(spy).toHaveBeenCalledWith({
            type: TrophyType.TOTAL,
            subtype: TrophySubtype.DISTANCE
        });
    });
});
