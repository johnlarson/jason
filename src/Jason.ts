import types, { typeFromName } from './serializeTypes';


export default class {

    public stringify(value: any): string {
        return JSON.stringify(this.replace(value));;
    }

    public parse(text: string): any {
        return this.revive(JSON.parse(text));
    }

    private replace(raw: any): any {
        for(const type of types) {
            if(type.test(raw)) {
                return {
                    name: type.name,
                    data: type.replace(raw)
                };
            }
        }
    }

    private revive(packed: any): any {
        return typeFromName[packed.name].revive(packed.data);
    }

}