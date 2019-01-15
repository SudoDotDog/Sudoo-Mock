/**
 * @author WMXPY
 * @namespace Mock_Sandbox
 * @description Call
 */

export class Call {

    private _args: any[];

    public constructor(args: any[]) {

        this._args = args;
    }

    public arg(order: number) {

        return this._args[order];
    }
}
