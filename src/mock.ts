/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 */

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

    private constructor(outer: T, functionName: keyof T) {

        this._outer = outer;
        this._functionName = functionName;

        this.mock = this.mock.bind(this);
        this.restore = this.restore.bind(this);
    }

    public mock(func: (...args: any) => any): void {

        this._temp = this._outer[this._functionName];
        this._outer[this._functionName] = func as any;

        if (!Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.add(this);
        }

        return;
    }

    public restore(): void {

        this._outer[this._functionName] = this._temp;

        if (Mock._pendingRestore.has(this)) {
            Mock._pendingRestore.delete(this);
        }

        return;
    }
}
