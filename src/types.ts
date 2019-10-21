export interface Type {
    name: string;
    test: (value: any) => boolean;
    replace: (value: any) => any;
    revive: (value: any) => any;
};

export default interface Packed {
    type: string;
    data: object;
};