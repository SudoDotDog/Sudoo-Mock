/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 */

import { AnyFunction } from "./declare";
import { getDescriptor, DescriptorInfo } from "./descriptor";

export class Mock<T extends any = any> {

    private static _pendingRestore: Set<Mock> = new Set<Mock>();

    public static countPendingRestore(): number {

        return this._pendingRestore.size;
    }

    public static restoreAll(): void {

        for (const each of this._pendingRestore) {
            each.restore();
        }
        return;
    }

    public static create<T>(outer: T, functionName: keyof T): Mock<T> {

        return new Mock(outer, functionName);
    }

    private readonly _outer: T;
    private readonly _functionName: keyof T;

    private _temp: any;
    private _mocking: boolean;

    private _mockingGetter: boolean;
    private _mockingSetter: boolean;

    private constructor(outer: T, functionName: keyof T) {

        this._outer = outer;
        this._functionName = functionName;

        this._mocking = false;

        this._mockingGetter = false;
        this._mockingSetter = false;

        this.mock = this.mock.bind(this);
        this.restore = this.restore.bind(this);
    }

    public get mocking(): boolean {

        return this._mocking;
    }

    public mock(func: AnyFunction): boolean {

        if (this._mocking) {
            return false;
        }

        const descriptor: DescriptorInfo = getDescriptor(this._outer, this._functionName);

        if (descriptor.isGetter) {
            this._mockGetter(func, descriptor);
        } else if (descriptor.isSetter) {
            return false;
        } else {
            this._mockFunction(func);
        }

        this._mocking = true;

        if (!Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.add(this);
        }
        return true;
    }

    public mockGetter(func: AnyFunction): boolean {

        if (this._mocking) {
            return false;
        }

        const descriptor: DescriptorInfo = getDescriptor(this._outer, this._functionName);

        if (!descriptor.isGetter) {
            throw new Error('[Sudoo-Mock] Target is not a getter');
        }

        this._mockGetter(func, descriptor);
        this._mocking = true;
        this._mockingSetter = true;

        if (!Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.add(this);
        }
        return true;
    }

    public mockSetter(func: AnyFunction): boolean {

        if (this._mocking) {
            return false;
        }

        const descriptor: DescriptorInfo = getDescriptor(this._outer, this._functionName);

        if (!descriptor.isSetter) {
            throw new Error('[Sudoo-Mock] Target is not a setter');
        }

        this._mockGetter(func, descriptor);
        this._mocking = true;
        if (!Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.add(this);
        }
        return true;
    }

    public restore(): boolean {

        if (!this._mocking) {
            return false;
        }

        const descriptor: DescriptorInfo = getDescriptor(this._outer, this._functionName);

        if (descriptor.isGetter) {
            this._restoreGetter(descriptor);
        } else if (descriptor.isSetter) {
            return false;
        } else {
            this._restoreFunction();
        }

        this._mocking = false;

        if (Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.delete(this);
        }
        return true;
    }

    private _mockFunction(func: AnyFunction): void {

        this._temp = this._outer[this._functionName];
        this._outer[this._functionName] = func as any;
        return;
    }

    private _restoreFunction(): void {

        this._outer[this._functionName] = this._temp;
        return;
    }

    private _mockGetter(func: AnyFunction, descriptor: DescriptorInfo): void {

        this._temp = descriptor.getterFunction;
        Object.defineProperty(this._outer, this._functionName, {
            get: func,
            configurable: descriptor.configurable,
        });
        return;
    }
    private _restoreGetter(descriptor: DescriptorInfo): void {

        Object.defineProperty(this._outer, this._functionName, {
            get: this._temp,
            configurable: descriptor.configurable,
        });
        return;
    }
}
