import {isPositive} from './04-main';

describe('isPositive()', () => {
    it(`should return true when n > 0`, () => {
        expect(isPositive(5)).toBe(true);
        expect(isPositive(0.1)).toBe(true);
    });

    it(`should return false when n <= 0`, () => {
        expect(isPositive(0)).toBe(false);
        expect(isPositive(-3)).toBe(false);    
    }); 
    it (`should return false when n < 0`, () => {
        expect(isPositive(-10)).toBe(false);
        expect(isPositive(-0.5)).toBe(false);
    });
});