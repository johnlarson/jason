import { ulid } from 'ulid';

const fromId: Map<string, any> = new Map();
const toId: Map<any, string> = new Map();

export function byId(id: string): any {
    if(!fromId.has(id)) throw new Error('Id not found.')
    return fromId.get(id);
}

export function id(thing: any): string {
    if(!toId.has(thing)) {
        toId.set(thing, ulid());
    }
    return toId.get(thing) as string;
}