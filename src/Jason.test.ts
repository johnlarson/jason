// const Jason = require('./Jason');
import Jason from './Jason';

const jason: Jason = new Jason();
const copy: (start: any) => any = x => jason.parse(jason.stringify(x));

test('handles booleans', () => {
    const start = true;
    const result = copy(start);
    expect(result).toBe(start);
});

test('handles numbers', () => {
    const start = 23;
    const result = copy(start);
    expect(result).toBe(start);
});

test('handles strings', () => {
    const start = 'hello';
    const result = copy(start);
    expect(result).toBe(start);
});

test('handles symbols', () => {
    const start = Symbol();
    const result = copy(start);
    expect(typeof result).toBe('symbol');
});