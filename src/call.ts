/**
 * @author WMXPY
 * @namespace Mock
 * @description Call
 */

export class Call {

    public static create(args: any[]): Call {

        return new Call(args);
    }

    private readonly _args: any[];

    private constructor(args: any[]) {

        this._args = args;
    }

    public get length(): number {

        return this._args.length;
    }

    public get args(): any[] {

        return this._args;
    }

    public arg(order: number): any {

        return this._args[order];
    }
}
