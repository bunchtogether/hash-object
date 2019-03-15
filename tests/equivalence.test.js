// @flow

const expect = require('expect');
const hashObject = require('../src');
const { generate, cloneDeep } = require('./lib/values');

describe('Check for object equivalence', () => {
  test('Set and delete values', () => {
    for (let i = 0; i < 100; i += 1) {
      const x = generate();
      const y = cloneDeep(x);
      expect(hashObject(x)).toEqual(hashObject(y));
    }
  });
});

