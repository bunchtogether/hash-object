//      

const farmhash = require('farmhash');

const TRUE = 94590;
const FALSE = 94591;
const NULL = 94592;
const UNDEFINED = 94593;
const UNKNOWN = 94594;

function coerce(container           , obj     ) {
  if (typeof obj === 'number') {
    container.push(obj);
    return;
  }
  if (typeof obj === 'boolean') {
    container.push(obj ? TRUE : FALSE);
    return;
  }
  if (typeof obj === 'undefined') {
    container.push(UNDEFINED);
    return;
  }
  if (obj === null) {
    container.push(NULL);
    return;
  }
  if (typeof obj === 'string') {
    container.push(farmhash.hash32(obj));
    return;
  }
  switch (obj.constructor && obj.constructor.name) {
    case 'Date':
      container.push(obj.getTime());
      return;
    case 'String':
      container.push(farmhash.hash32(obj.valueOf()));
      return;
    case 'Number':
      container.push(obj.valueOf());
      return;
    case 'Boolean':
      container.push(obj.valueOf() ? TRUE : FALSE);
      return;
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
    case 'Buffer':
      for (let i = 0; i < obj.length; i++) {
        container.push(obj[i]);
      }
      return;
    case 'Array':
      for (let i = 0; i < obj.length; i++) {
        coerce(container, obj[i]);
      }
      return;
    case 'Object':
      const objectKeys = Object.keys(obj); // eslint-disable-line no-case-declarations
      objectKeys.sort();
      for (let i = 0; i < objectKeys.length; i++) {
        container.push(farmhash.hash32(objectKeys[i]));
        coerce(container, obj[objectKeys[i]]);
      }
      return;
    case 'Map':
      const mapKeys = [...obj.keys()]; // eslint-disable-line no-case-declarations
      mapKeys.sort();
      for (let i = 0; i < mapKeys.length; i++) {
        container.push(hashObject(mapKeys[i]));
        coerce(container, obj.get(mapKeys[i]));
      }
      return;
    case 'Set':
      const setValues = [...obj].map(hashObject); // eslint-disable-line no-case-declarations
      setValues.sort();
      for (let i = 0; i < setValues.length; i++) {
        container.push(setValues[i]);
      }
      return;
    default:
      container.push(UNKNOWN);
  }
}

const hashObject = module.exports = function (obj     ) {
  if (typeof obj === 'number') {
    return obj;
  }
  if (typeof obj === 'boolean') {
    return obj ? TRUE : FALSE;
  }
  if (typeof obj === 'undefined') {
    return UNDEFINED;
  }
  if (obj === null) {
    return NULL;
  }
  if (typeof obj === 'string') {
    return farmhash.hash32(obj);
  }
  const container = [];
  coerce(container, obj);
  return farmhash.hash32(Buffer.from(container));
};
