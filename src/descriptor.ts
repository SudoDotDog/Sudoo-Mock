/**
 * @author WMXPY
 * @namespace Mock
 * @description Descriptor
 */

export type DescriptorInfo = {

    readonly configurable: boolean;
    readonly enumerable: boolean;
    readonly writable: boolean;
    readonly isGetter: boolean;
    readonly isSetter: boolean;
};

export const getRawDescriptor = <T extends any = any>(target: T, name: keyof T): PropertyDescriptor | undefined => {

    const descriptor: PropertyDescriptor | undefined = Object.getOwnPropertyDescriptor(target, name);

    if (!descriptor) {

        return Object.getOwnPropertyDescriptor(Object.getPrototypeOf(target), name);
    }
    return descriptor;
};

export const getDescriptor = <T extends any = any>(target: T, name: keyof T): DescriptorInfo => {

    const descriptor: PropertyDescriptor | undefined = getRawDescriptor(target, name);

    if (!descriptor) {

        return {
            configurable: false,
            enumerable: false,
            writable: false,
            isGetter: false,
            isSetter: false,
        };
    }

    return {
        configurable: Boolean(descriptor.configurable),
        enumerable: Boolean(descriptor.enumerable),
        writable: Boolean(descriptor.writable),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        isGetter: Boolean(descriptor.get),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        isSetter: Boolean(descriptor.set),
    };
};
