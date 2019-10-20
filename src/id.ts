class RequiredMap<K, V> extends Map<K, V> {
    get(key: K): V | undefined {
        if(!this.has(key)) throw new Error('Key not found!');
        return super.get(key);
    }
}

const fromId: Map<string, any> = new RequiredMap();
const toId: Map<any, string> = new Map();

export const byId: (id: string) => any = id => fromId.get(id);
export const id: (thing: any) => string | undefined = thing => toId.get(thing);