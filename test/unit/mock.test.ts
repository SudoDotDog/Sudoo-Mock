/**
 * @author WMXPY
 * @namespace Mock
 * @description Mock
 * @package Unit Test
 */

import { expect } from 'chai';
import { Mock } from "../../src";
import * as ExampleFunctions from "../mock/example";
import { ExampleClass } from '../mock/class';

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

        expect(mock.mocking).to.be.equal(true);
        expect(Mock.countPendingRestore()).to.be.equal(1);
        expect(returnValue).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore function', (): void => {

        const mock: Mock = Mock.create(ExampleFunctions, 'functionThatReturnOne');
        mock.mock(() => 2);
        mock.restore();

        const returnValue: number = ExampleFunctions.functionThatReturnOne();

        expect(mock.mocking).to.be.equal(false);
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

    it('should be able to mock class', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'getOne');
        mock.mock(() => 2);

        const returnValue: number = clazz.getOne();

        expect(Mock.countPendingRestore()).to.be.equal(1);
        expect(returnValue).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore class', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'getOne');
        mock.mock(() => 2);
        mock.restore();

        const returnValue: number = clazz.getOne();

        expect(Mock.countPendingRestore()).to.be.equal(0);
        expect(returnValue).to.be.equal(1);
    });

    it('should be able to mock class getter by default', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mock(() => 2);

        expect(Mock.countPendingRestore()).to.be.equal(1);
        expect(clazz.one).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore class getter by default', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mock(() => 2);
        mock.restore();

        expect(Mock.countPendingRestore()).to.be.equal(0);
        expect(clazz.one).to.be.equal(1);
    });

    it('should be able to mock class getter', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mockGetter(() => 2);

        expect(Mock.countPendingRestore()).to.be.equal(1);
        expect(clazz.one).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore class getter', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mockGetter(() => 2);
        mock.restore();

        expect(Mock.countPendingRestore()).to.be.equal(0);
        expect(clazz.one).to.be.equal(1);
    });

    it('should be able to mock class setter', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mockSetter(function (this: any) {
            this.target = 2;
        });

        expect(Mock.countPendingRestore()).to.be.equal(1);

        expect(clazz.target).to.be.equal(0);
        clazz.one = 100;
        expect(clazz.target).to.be.equal(2);
        mock.restore();
    });

    it('should be able to restore class setter', (): void => {

        const clazz: ExampleClass = new ExampleClass();

        const mock: Mock = Mock.create(clazz, 'one');
        mock.mockSetter(function (this: any) {
            this.target = 2;
        });
        mock.restore();

        expect(Mock.countPendingRestore()).to.be.equal(0);
        expect(clazz.target).to.be.equal(0);
        clazz.one = 100;
        expect(clazz.target).to.be.equal(1);
    });
});
