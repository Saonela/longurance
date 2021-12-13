import {getPaceText} from './entry';

describe('Entry service', () => {
    it('should get pace text', () => {
        expect(getPaceText(0, 0)).toEqual('0\'00"');
        expect(getPaceText(1800, 5)).toEqual('6\'00"');
        expect(getPaceText(1800, 7)).toEqual('4\'17"');
    });
});
