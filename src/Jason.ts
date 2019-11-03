import types, { typeFromName } from './serializeTypes';
import { Packed, ValuePacked } from './types';
import { id, fromId } from './id';

export default class {

    public stringify(value: any): string {
        return JSON.stringify(this.replace(value));;
    }

    public parse(text: string): any {
        return this.revive(JSON.parse(text));
    }

    public replace(raw: any): Packed {
        const table: Record<string, ValuePacked> = {};
        const visit = (raw: any): ValuePacked | string => {
            for(const type of types) {
                if(type.test(raw)) {
                    const value = {
                        type: type.name,
                        data: type.replace(raw, visit)
                    };
                    if(type.isValue) {
                        return value;
                    } else {
                        const thingId = id(raw);
                        table[thingId] = value;
                        return thingId;
                    }
                }
            }
            throw new Error('Type not found.')
        }
        return {
            root: visit(raw),
            table
        }
    }

    public revive(packed: Packed): any {
        const unpackedTable: Record<string, any> = {};
        const getChild = (packedOrId: ValuePacked | string): any => {
            return 
        };
        for(const key of Object.keys(packed.table)) {
            const packedItem = packed.table[key];
            const unpacked = typeFromName[packedItem.type].revive(packedItem.data);
            unpackedTable[key] = unpacked;
        }
        for(const key of Object.keys(packed.table)) {
            const packedItem = packed.table[key];
            const unpackedItem = fromId(key)
            const populate = typeFromName[packedItem.type].populate || (() => {});
            populate(unpackedItem, packedItem.data, packed.table);
        }
        for(const key of Object.keys(packed.table)) {
            id(unpackedTable[key], key);
        }
        if(typeof packed.root === 'string') {
            return fromId(packed.root);
        } else {
            return typeFromName[packed.root.type].revive(packed.root.data);
        }
    }

}