import { typeFromName } from './serializeTypes';

export default class {
    public revive(packed: any): any {
        return typeFromName[packed.name].revive(packed.data);
    }
}