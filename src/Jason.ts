import Replacer from './Replacer';
import Reviver from './Reviver';


export default class {
    replacer: Replacer;
    reviver: Reviver;

    public constructor() {
        this.replacer = new Replacer();
        this.reviver = new Reviver();
    }

    public stringify(value: any): string {
        return JSON.stringify(this.replacer.replace(value));;
    }

    public parse(text: string): any {
        return this.reviver.revive(JSON.parse(text));
    }

}