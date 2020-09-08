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

        expect(mock).to.be.instanceOf(Mock);
    });
});
