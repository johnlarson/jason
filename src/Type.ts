export default interface TypeDict {
    name: string;
    test: (value: any) => boolean;
    replace: (value: any) => any;
    revive: (value: any) => any;
}