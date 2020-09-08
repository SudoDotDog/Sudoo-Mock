/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 * @package Unit Test
 */

import { expect } from 'chai';
import { Mock } from "../../src";
import * as ExampleFunctions from "../mock/example";

describe('Given {Mock} Class', (): void => {

    it('should be able to construct', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');

        expect(mock).to.be.instanceOf(Mock);
    });

    it('should be able to mock function', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);

        const returnValue: number = ExampleFunctions.functionThatReturnOne();

        expect(returnValue).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore function', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);
        mock.restore();

        const returnValue: number = ExampleFunctions.functionThatReturnOne();

        expect(returnValue).to.be.equal(1);
    });
});
