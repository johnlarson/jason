import types from './serializeTypes';

export default class {
    public replace(raw: any): any {
        for(const type of types) {
            if(type.test(raw)) {
                return {
                    name: type.name,
                    data: type.replace(raw)
                };
            }
        }
    }
}