// const Jason = require('./Jason');
import Jason from './Jason';

const jason: Jason = new Jason();
const copy: (start: any) => any = x => jason.parse(jason.stringify(x));

test('handles undefined', () => {
    expect(copy(undefined)).toBe(undefined);
});

test('handles null', () => {
    expect(copy(null)).toBe(null);
});

test('handles booleans', () => {
    expect(copy(true)).toBe(true);
});

test('handles numbers', () => {
    expect(copy(23)).toBe(23);
});

test('handles strings', () => {
    expect(copy('hello')).toBe('hello');
});

test('handles symbols', () => {
    expect(typeof copy(Symbol())).toBe('symbol');
});