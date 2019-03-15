const uuid = require('uuid');
const { cloneDeepWith } = require('lodash');

const generatePrimitive = () => {
  switch (Math.floor(Math.random() * 8)) {
    case 0:
      return null;
    case 1:
      return uuid.v4();
    case 2:
      return Math.random() * Number.MAX_SAFE_INTEGER;
    case 3:
      return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
    case 4:
      return Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2;
    case 5:
      return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2);
    case 6:
      return Math.random() > 0.5;
    case 7:
      return undefined;
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

const generateNativeObject = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return new Date();
    case 1:
      return new String(uuid.v4()); // eslint-disable-line no-new-wrappers
    case 2:
      return new Number(Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2); // eslint-disable-line no-new-wrappers
    case 3:
      return new Boolean(Math.random() > 0.5); // eslint-disable-line no-new-wrappers
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

const generateObject = (depth = 0) => {
  const propertyCount = Math.ceil(Math.random() * 4);
  const o = {};
  for (let i = 0; i < propertyCount; i += 1) {
    o[uuid.v4()] = generate(depth + 1);
  }
  return o;
};

const generateArray = (depth = 0) => {
  const o = [];
  const length = Math.ceil(Math.random() * 20);
  for (let i = 0; i < length; i += 1) {
    o.push(generate(depth + 1));
  }
  return o;
};

const generateMap = (depth = 0) => {
  const propertyCount = Math.ceil(Math.random() * 4);
  const o = new Map();
  for (let i = 0; i < propertyCount; i += 1) {
    o.set(generatePrimitive(), generate(depth + 1));
  }
  return o;
};

const generateSet = (depth = 0) => {
  const o = new Set();
  const length = Math.ceil(Math.random() * 20);
  for (let i = 0; i < length; i += 1) {
    o.add(generate(depth + 1));
  }
  return o;
};

const generateTypedArray = () => {
  const length = Math.ceil(Math.random() * 128);
  switch (Math.floor(Math.random() * 11)) {
    case 0:
      return Buffer.from(Array.from(Array(length), () => Math.floor(Math.random() * 65535)));
    case 1:
      return new Int8Array(Array.from(Array(length), () => Math.floor(Math.random() * 128)));
    case 2:
      return new Uint8Array(Array.from(Array(length), () => Math.floor(Math.random() * 256)));
    case 3:
      return new Uint8ClampedArray(Array.from(Array(length), () => Math.floor(Math.random() * 128)));
    case 4:
      return new Int16Array(Array.from(Array(length), () => Math.floor(Math.random() * 32767)));
    case 5:
      return new Int16Array(Array.from(Array(length), () => Math.floor(Math.random() * 32767)));
    case 6:
      return new Uint16Array(Array.from(Array(length), () => Math.floor(Math.random() * 65535)));
    case 7:
      return new Int32Array(Array.from(Array(length), () => Math.floor(Math.random() * 2147483647)));
    case 8:
      return new Uint32Array(Array.from(Array(length), () => Math.floor(Math.random() * 2147483647)));
    case 9:
      return new Float32Array(Array.from(Array(length), () => Math.random() * 2147483647));
    case 10:
      return new Float64Array(Array.from(Array(length), () => Math.random() * 2147483647));
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

class ExampleClass {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  someMethod() {
    return true;
  }
}

const generateClassInstance = (depth = 0) => new ExampleClass(generate(depth + 1), generate(depth + 1), generate(depth + 1));

const cloneDeep = module.exports.cloneDeep = (o) => cloneDeepWith(o, (value) => { // eslint-disable-line consistent-return
  if (value instanceof ExampleClass) {
    return new ExampleClass(cloneDeep(value.x), cloneDeep(value.y), cloneDeep(value.z));
  }
});


const generate = module.exports.generate = (depth = 0) => {
  if (depth > 3) {
    return generatePrimitive();
  }
  switch (Math.floor(Math.random() * 8)) {
    case 0:
      return generateClassInstance(depth);
    case 1:
      return generatePrimitive();
    case 2:
      return generateNativeObject();
    case 3:
      return generateObject(depth);
    case 4:
      return generateArray(depth);
    case 5:
      return generateMap(depth);
    case 6:
      return generateSet(depth);
    case 7:
      return generateTypedArray();
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

