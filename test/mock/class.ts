/**
 * @author WMXPY
 * @namespace Mock
 * @description Class
 * @package Mock
 */

export class ExampleClass {

    public target: number = 0;

    public get one(): number {

        return 1;
    }

    public set one(_target: number) {

        this.target = 1;
    }

    public getOne(): number {

        return 1;
    }
}
