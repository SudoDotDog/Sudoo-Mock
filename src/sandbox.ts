/**
 * @author WMXPY
 * @namespace Mock_Sandbox
 * @description Sandbox
 */

import { Call } from "./call";

export class Sandbox {

    private _called: Call[];

    public constructor() {

        this._called = [];
    }

    public calls(): Call[] {

        return this._called;
    }

    public func(): any {

        const callback: any = (...args: any[]) => {

            const call = new Call(args);
            this._called.push(call);
        };
        return callback.bind(this);
    }
}
