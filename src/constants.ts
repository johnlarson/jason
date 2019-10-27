const names: string[] = [
    'undefined',
    'NaN',
    'Infinity',
    '-Infinity',
    '-0',
    'true',
    'false',
    'null'
];

const nameToValue: Map<string, any> = new Map();
const valueToName: Map<any, string> = new Map();

for(const name of names) {
    const value = eval(name);
    nameToValue.set(name, value);
    valueToName.set(value, name);
}

export default {

    getValue(name: string): any {
        return nameToValue.get(name);
    },

    getName(value: any): string | undefined {
        return valueToName.get(value);
    },

    all(): IterableIterator<[string, any]> {
        return nameToValue.entries();
    }

};