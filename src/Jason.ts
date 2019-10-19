import TypeDict from "./TypeDict";


export default class Jason {

    public constructor({ types }: { types: Record<string, TypeDict> }) {

    }

    public stringify(value: any): string {
        return JSON.stringify(this.replace(value));;
    }

    private replace(original: any): any {
        
    }

    public parse(text: string): any {
        return this.revive(JSON.parse(text));
    }

    private revive(original: any): any {
        
    }

}