export interface Type {
    name: string;
    test: (value: any) => boolean;
    replace: (value: any, visit: (value: any) => string | ValuePacked) => any;
    revive: (value: any) => any;
    populate?: (value: object, packed: any, table: Record<string, any>) => void;
    isValue?: boolean;
};

export interface ValuePacked {
    type: string;
    data: object;
};

export interface Packed {
    root: ValuePacked | string;
    table: Record<string, ValuePacked>;
};

export interface PackedObjectData {
    string: Record<string, PackedDescriptor>;
    symbol: Record<symbol, PackedDescriptor>;
};

export interface PackedDescriptor {

}