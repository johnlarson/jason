import { Type, PackedObjectData } from './types';
import { id, fromId } from './id';
import constants from './constants';

const types: Type[] = [
    {
        name: 'constant',
        test: x => constants.getName(x) !== undefined,
        replace: x => constants.getName(x),
        revive: x => constants.getValue(x)
    },
    {
        name: 'number',
        test: x => typeof x === 'number',
        replace: x => x,
        revive: x => x,
        isValue: true
    },
    {
        name: 'string',
        test: x => typeof x === 'string',
        replace: x => x,
        revive: x => x,
        isValue: true
    },
    {
        name: 'Object',
        test: x => x instanceof Object,
        replace: (o, visit) => {
            //assert visit instanceof Function;
            const result: any = {
                string: {},
                symbol: {}
            };
            const descriptors: PropertyDescriptorMap = Object.getOwnPropertyDescriptors(o);
            const stringKeys: string[] = Object.getOwnPropertyNames(o);
            const symbolKeys: symbol[] = Object.getOwnPropertySymbols(o);
            const keys: (string | symbol)[] = [...symbolKeys, ...stringKeys];
            for(const k1 of keys) {
                const descriptor = descriptors[k1 as string]; // typescript does not allow symbol indexing.
                const packedDescriptor: any = {};
                for(const k2 of Object.keys(descriptor)) {
                    const value = descriptor[k2 as keyof PropertyDescriptor];
                    let valueType;
                    for(const type of types) {
                        if(type.test(value)) {
                            valueType = type;
                            break;
                        }
                    }
                    if(!valueType) throw new Error('Type not found.');
                    packedDescriptor[k2] = visit(value);
                }
                if(typeof k1 === 'symbol') {
                    result.symbol[id(k1)] = packedDescriptor;
                } else {
                    result.string[k1] = packedDescriptor;
                }
            }
            result.prototype = id(Object.getPrototypeOf(o))
            return result;
        },
        revive: _ => ({}),
        populate: (o, packed, table) => {
            addDescriptors(o, packed.string, table, false);
            addDescriptors(o, packed.symbol, table, true);
        }
    },
    {
        name: 'symbol',
        test: x => typeof x === 'symbol',
        replace: _ => undefined,
        revive: _ => Symbol()
    }
];

function addDescriptors(
    object: any, descriptors: any, table: Record<string, any>, symbolKeys: boolean
) {
    for(const k1 of Object.keys(descriptors)) {
        const descriptor: any = {};
        const packedDescriptor = descriptors[k1];
        for(const k2 of Object.keys(packedDescriptor)) {
            const value = packedDescriptor[k2];
            if(typeof value === 'string') {
                try {
                    descriptor[k2] = fromId(value);
                } catch(e) {
                    descriptor[k2] = table[value];
                }
            } else {
                descriptor[k2] = typeFromName[value.type].revive(value.data);
            }
        }
        const destKey: string | symbol = symbolKeys ? table[k1] : k1;
        Object.defineProperty(object, destKey, descriptor);
    }
}

export default types;

export const typeFromName: Record<string, Type> = {};

for(const type of types) {
    typeFromName[type.name] = type;
}