# Sudoo-Mock

[![Build Status](https://travis-ci.com/SudoDotDog/Sudoo-Mock.svg?branch=master)](https://travis-ci.com/SudoDotDog/Sudoo-Mock)
[![codecov](https://codecov.io/gh/SudoDotDog/Sudoo-Mock/branch/master/graph/badge.svg)](https://codecov.io/gh/SudoDotDog/Sudoo-Mock)
[![npm version](https://badge.fury.io/js/%40sudoo%2Fmock.svg)](https://www.npmjs.com/package/@sudoo/mock)
[![downloads](https://img.shields.io/npm/dm/@sudoo/mock.svg)](https://www.npmjs.com/package/@sudoo/mock)

:bar_chart: Mock test

## Install

```sh
yarn add @sudoo/mock --dev
# Or
npm install @sudoo/mock --save-dev
```

## Usage

```ts
import { Mock } from "@sudoo/mock";
import * as SomeFunction from "somewhere-with-util";

const mock: Mock = Mock.create(SomeFunction, 'functionThatReturnOne');
mock.mock(() => 2);

SomeFunction.functionThatReturnOne(); // 2
```

For more advanced usage, such as getter and setter mock, see source code for more details.
