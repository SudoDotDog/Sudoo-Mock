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

    private constructor(outer: T, functionName: keyof T) {

        this._outer = outer;
        this._functionName = functionName;

        this._mocking = false;

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
            return false;
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

    public restore(): boolean {

        if (!this._mocking) {
            return false;
        }

        this._outer[this._functionName] = this._temp;
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
}
