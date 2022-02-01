import { v4 as uuidv4 } from 'uuid';

export const generatePrimitive = () => {
  switch (Math.floor(Math.random() * 8)) {
    case 0:
      return null;
    case 1:
      return uuidv4();
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

export const generateNativeObject = () => {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      return new Date(Math.round(Date.now() * Math.random()));
    case 1:
      return new String(uuidv4()); // eslint-disable-line no-new-wrappers
    case 2:
      return new Number(Math.random() * Number.MAX_SAFE_INTEGER - Number.MAX_SAFE_INTEGER / 2); // eslint-disable-line no-new-wrappers
    case 3:
      return new Boolean(Math.random() > 0.5); // eslint-disable-line no-new-wrappers
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

export const generateObject = (depth = 0) => {
  const propertyCount = Math.ceil(Math.random() * 10);
  const o = {};
  for (let i = 0; i < propertyCount; i += 1) {
    o[uuidv4()] = generate(depth + 1);
  }
  return o;
};

export const generateArray = (depth = 0) => {
  const o = [];
  const length = Math.ceil(Math.random() * 20);
  for (let i = 0; i < length; i += 1) {
    o.push(generate(depth + 1));
  }
  return o;
};

export const generateTypedArray = () => {
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

export const generate = (depth = 0) => {
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

export const generateSimpleValues = () => {
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
        o[uuidv4()] = generatePrimitive();
      }
      return o;
    default:
      break;
  }
  throw new Error('Incorrect number of cases');
};

