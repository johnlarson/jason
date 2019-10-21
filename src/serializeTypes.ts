import Type from './Type';
import { id } from './id';

const types: Type[] = [
    {
        name: 'jsonable',
        test: x => ['boolean', 'number', 'string'].includes(typeof x) || x === null,
        replace: x => x,
        revive: x => x
    },
    {
        name: 'Object',
        test: x => x instanceof Object,
        replace: (o) => {
            return {
                descriptors: Object.keys(
                    Object.getOwnPropertyDescriptors(o)
                ).map(k => [
                    k,
                    k in ['value', 'get', 'set'] ? id(o[k]) : o[k]
                ]).reduce((a, b) => ({
                    ...a,
                    [b[0]]: b[1]
                }), {})
            }
        },
        revive: (packed) => {

        }
    },
    {
        name: 'symbol',
        test: x => typeof x === 'symbol',
        replace: _ => undefined,
        revive: _ => Symbol()
    }
];

export default types;

export const typeFromName: Record<string, Type> = {};

for(const type of types) {
    typeFromName[type.name] = type;
}