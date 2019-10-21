import types, { typeFromName } from './serializeTypes';
import Packed from './types';

export default class {

    public stringify(value: any): string {
        return JSON.stringify(this.replace(value));;
    }

    public parse(text: string): any {
        return this.revive(JSON.parse(text));
    }

    private replace(raw: any): Packed {
        for(const type of types) {
            if(type.test(raw)) {
                return {
                    type: type.name,
                    data: type.replace(raw)
                };
            }
        }
        throw new Error('Type not found.')
    }

    private revive(packed: Packed): any {
        return typeFromName[packed.type].revive(packed.data);
    }

}