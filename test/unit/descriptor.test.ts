/**
 * @author WMXPY
 * @namespace Mock
 * @description Descriptor
 * @package Unit Test
 */

import { expect } from 'chai';
import { DescriptorInfo, getDescriptor } from '../../src/descriptor';
import { ExampleClass } from '../mock/class';
import * as ExampleFunctions from "../mock/example";

describe('Given [Descriptor] Helper methods', (): void => {

    it('should be able to get descriptor of function', (): void => {

        const descriptor: DescriptorInfo = getDescriptor(ExampleFunctions, 'functionThatReturnOne');

        expect(descriptor).to.be.deep.equal({
            configurable: true,
            enumerable: true,
            writable: true,
            isGetter: false,
            isSetter: false,
        });
    });

    it('should be able to get descriptor of getter', (): void => {

        const clazz: ExampleClass = new ExampleClass();
        const descriptor: DescriptorInfo = getDescriptor(clazz, 'one');

        expect(descriptor).to.be.deep.equal({
            configurable: true,
            enumerable: false,
            writable: false,
            isGetter: true,
            isSetter: false,
        });
    });
});
