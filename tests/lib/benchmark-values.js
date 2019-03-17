const uuid = require('uuid');

const generatePrimitive = module.exports.generatePrimitive = () => {
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

const generateNativeObject = module.exports.generateNativeObject = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return new Date(Math.round(Date.now() * Math.random()));
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

const generateObject = module.exports.generateObject = (depth = 0) => {
  const propertyCount = Math.ceil(Math.random() * 10);
  const o = {};
  for (let i = 0; i < propertyCount; i += 1) {
    o[uuid.v4()] = generate(depth + 1);
  }
  return o;
};

const generateArray = module.exports.generateArray = (depth = 0) => {
  const o = [];
  const length = Math.ceil(Math.random() * 20);
  for (let i = 0; i < length; i += 1) {
    o.push(generate(depth + 1));
  }
  return o;
};

const generateTypedArray = module.exports.generateTypedArray = () => {
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

const generate = module.exports.generate = (depth = 0) => {
  if (depth > 2) {
    return generatePrimitive();
  }
  switch (Math.floor(Math.random() * 5)) {
    case 0:
      return generateTypedArray();
    case 1:
      return generatePrimitive();
    case 2:
      return generateNativeObject();
    case 3:
      return generateObject(depth);
    case 4:
      return generateArray(depth);
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

module.exports.generateSimpleValues = () => {
  const length = Math.ceil(Math.random() * 20);
  switch (Math.floor(Math.random() * 2)) {
    case 0:
      const a = []; // eslint-disable-line no-case-declarations
      for (let i = 0; i < length; i += 1) {
        a.push(generatePrimitive());
      }
      return a;
    case 1:
      const o = {}; // eslint-disable-line no-case-declarations
      for (let i = 0; i < length; i += 1) {
        o[uuid.v4()] = generatePrimitive();
      }
      return o;
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

