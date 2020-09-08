/**
 * @author WMXPY
 * @namespace Mock
 * @description Sandbox
 */

import { Call } from "./call";

export class Sandbox {

    public static create(returnWith?: any): Sandbox {

        return new Sandbox(returnWith);
    }

    public static stub(returnWith?: any): any {

        return () => returnWith;
    }

    private _called: Call[];
    private _returnWith: any;

    public constructor(returnWith?: any) {

        this._called = [];
        this._returnWith = returnWith;
    }

    public get calls(): Call[] {

        return this._called;
    }

    public get length(): number {

        return this._called.length;
    }

    public get first(): Call {

        return this.call(0) as Call;
    }

    public get second(): Call {

        return this.call(1) as Call;
    }

    public get third(): Call {

        return this.call(2) as Call;
    }

    public call(order: number): Call | undefined {

        return this._called[order];
    }

    public func(returnWith?: any): any {

        const callback: any = (...args: any[]) => {

            const call = Call.create(args);
            this._called.push(call);

            if (returnWith) {
                return returnWith;
            }
            return this._returnWith;
        };
        return callback.bind(this);
    }

    public reset(): this {

        this._called = [];
        return this;
    }
}
