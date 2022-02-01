// @flow

import expect from 'expect';
import { isEqual } from 'lodash';
import { hash64 } from '../src';

import {
  generate,
  generateSimpleValues,
  generatePrimitive,
  generateNativeObject,
  generateObject,
  generateArray,
  generateMap,
  generateSet,
  generateTypedArray,
  generateClassInstance,
  cloneDeep,
} from './lib/values';

describe('Check for object equivalence', () => {
  test('Hash complex values', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generate();
      const y = cloneDeep(x);
      let z = generate();
      while (isEqual(x, z)) {
        z = generate();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash simple values', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateSimpleValues();
      const y = cloneDeep(x);
      let z = generateSimpleValues();
      while (isEqual(x, z)) {
        z = generateSimpleValues();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash primitive values', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generatePrimitive();
      const y = cloneDeep(x);
      let z = generatePrimitive();
      while (isEqual(x, z)) {
        z = generatePrimitive();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash native object values', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateNativeObject();
      const y = cloneDeep(x);
      let z = generateNativeObject();
      while (isEqual(x, z)) {
        z = generateNativeObject();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash objects', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateObject();
      const y = cloneDeep(x);
      let z = generateObject();
      while (isEqual(x, z)) {
        z = generateObject();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash arrays', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateArray();
      const y = cloneDeep(x);
      let z = generateArray();
      while (isEqual(x, z)) {
        z = generateArray();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash maps', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateMap();
      const y = cloneDeep(x);
      let z = generateMap();
      while (isEqual(x, z)) {
        z = generateMap();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash sets', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateSet();
      const y = cloneDeep(x);
      let z = generateSet();
      while (isEqual(x, z)) {
        z = generateSet();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash typed arrays', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateTypedArray();
      const y = cloneDeep(x);
      let z = generateTypedArray();
      while (isEqual(x, z)) {
        z = generateTypedArray();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
  test('Hash class instances', () => {
    for (let i = 0; i < 1000; i += 1) {
      const x = generateClassInstance();
      const y = cloneDeep(x);
      let z = generateClassInstance();
      while (isEqual(x, z)) {
        z = generateClassInstance();
      }
      const hashX = hash64(x);
      const hashY = hash64(y);
      const hashZ = hash64(z);
      if (hashX === hashZ) {
        console.log(hashX, x, JSON.stringify(x));
        console.log(hashZ, z, JSON.stringify(z));
      }
      expect(hashX).toEqual(hashY);
      expect(hashX).not.toEqual(hashZ);
    }
  });
});

