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

    after(() => {
        Mock.restoreAll();
    });

    it('should be able to construct', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');

        expect(mock).to.be.instanceOf(Mock);
    });

    it('should be able to mock function', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);

        const returnValue: number = ExampleFunctions.functionThatReturnOne();

        expect(Mock.countPendingRestore()).to.be.equal(1);
        expect(returnValue).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore function', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);
        mock.restore();

        const returnValue: number = ExampleFunctions.functionThatReturnOne();

        expect(Mock.countPendingRestore()).to.be.equal(0);
        expect(returnValue).to.be.equal(1);
    });

    it('should be able to restore all functions', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);

        expect(Mock.countPendingRestore()).to.be.equal(1);

        Mock.restoreAll();
        expect(Mock.countPendingRestore()).to.be.equal(0);
    });
});
