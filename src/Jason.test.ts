// const Jason = require('./Jason');
import Jason from './Jason';

const jason: Jason = new Jason();
const copy: (start: any) => any = x => jason.parse(jason.stringify(x));

test('undefined', () => {
    expect(copy(undefined)).toBe(undefined);
});

test('null', () => {
    expect(copy(null)).toBe(null);
});

test('-0', () => {
    expect(copy(-0)).toBe(-0);
});

test('Infinity', () => {
    expect(copy(Infinity)).toBe(Infinity);
});

test('-Infinity', () => {
    expect(copy(-Infinity)).toBe(-Infinity);
});

test('NaN', () => {
    expect(copy(NaN)).toBe(NaN);
})

test('boolean', () => {
    expect(copy(true)).toBe(true);
});

test('number', () => {
    expect(copy(23)).toBe(23);
});

test('string', () => {
    expect(copy('hello')).toBe('hello');
});

test('symbol', () => {
    expect(typeof copy(Symbol())).toBe('symbol');
});

test('object with string key', () => {
    const o = { a: 1 };
    expect(copy(o)).toMatchObject(o)
});

test('object with symbol key', () => {
    const o = { [Symbol()]: 2 };
    expect(copy(o)).toMatchObject(o);
});

test('object with reference', () => {
    const o = { a: Symbol() };
    expect(copy(o)).toMatchObject(o);
});

test('object with constant', () => {
    const o = { a: true };
    expect(copy(o)).toMatchObject(o);
})