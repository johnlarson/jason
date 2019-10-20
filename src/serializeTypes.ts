import Type from './Type';

const types: Type[] = [
    {
        name: 'jsonable',
        test: x => typeof x in ['boolean', 'number', 'string'] || x === null,
        replace: x => x,
        revive: x => x
    },
    {
        name: 'Object',
        test: x => x instanceof Object,
        replace: x => x,
        revive: x => x
    },
    {
        name: 'symbol',
        test: x => typeof x === 'symbol',
        replace: _ => undefined,
        revive: _ => Symbol()
    },
    {
        name: 'bigint',
        test: x => typeof x === 'bigint',
        replace: x => x.toString(),
        revive: x => BigInt(x)
    }
];

export default types;

export const typeFromName: Record<string, Type> = {};

for(const type of types) {
    typeFromName[type.name] = type;
}