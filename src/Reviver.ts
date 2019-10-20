import Type from './Type';
import { typeFromName } from './serializeTypes';

export default class {
    public revive(packed: any): any {
        typeFromName[packed.name].revive(packed);
    }
}