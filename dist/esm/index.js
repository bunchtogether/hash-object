import { hash64 as farmhash64, hash32 as farmhash32 } from 'farmhash';
const TRUE = 'TRUE';
const FALSE = 'FALSE';
const NULL = 'NULL';
const UNDEFINED = 'UNDEFINED';

function coerce(collection, obj) {
  switch (typeof obj) {
    case 'number':
    case 'boolean':
    case 'undefined':
    case 'string':
      collection.push(obj);
      return;

    default:
      break;
  }

  if (obj === null) {
    collection.push(null);
    return;
  }

  switch (obj.constructor && obj.constructor.name) {
    case 'Date':
      collection.push(obj);
      return;

    case 'String':
      collection.push(obj.valueOf());
      return;

    case 'Number':
      collection.push(obj.valueOf());
      return;

    case 'Boolean':
      collection.push(obj.valueOf());
      return;

    case 'ArrayBuffer':
    case 'Int8Array':
    case 'Uint8Array':
    case 'Uint8ClampedArray':
    case 'Int16Array':
    case 'Uint16Array':
    case 'Int32Array':
    case 'Uint32Array':
    case 'Float32Array':
    case 'Float64Array':
      collection.push(farmhash64(Buffer.from(obj)));
      return;

    case 'Buffer':
      collection.push(farmhash64(obj));
      return;

    case 'Array':
      for (let i = 0; i < obj.length; i++) {
        coerce(collection, obj[i]);
      }

      return;

    case 'Object':
      const objectKeys = Object.keys(obj); // eslint-disable-line no-case-declarations

      objectKeys.sort();

      for (let i = 0; i < objectKeys.length; i++) {
        collection.push(objectKeys[i]);
        coerce(collection, obj[objectKeys[i]]);
      }

      return;

    case 'Map':
      const mapKeys = [...obj.keys()]; // eslint-disable-line no-case-declarations

      mapKeys.sort();

      for (let i = 0; i < mapKeys.length; i++) {
        coerce(collection, mapKeys[i]);
        coerce(collection, obj.get(mapKeys[i]));
      }

      return;

    case 'Set':
      const setValues = [...obj].map(hashObject); // eslint-disable-line no-case-declarations

      setValues.sort();

      for (let i = 0; i < setValues.length; i++) {
        collection.push(setValues[i]);
      }

      return;

    default:
      collection.push(obj.constructor && obj.constructor.name);
      const unknownKeys = Object.keys(obj); // eslint-disable-line no-case-declarations

      unknownKeys.sort();

      for (let i = 0; i < unknownKeys.length; i++) {
        collection.push(unknownKeys[i]);
        coerce(collection, obj[unknownKeys[i]]);
      }

  }
}

function hashObject(obj) {
  switch (typeof obj) {
    case 'number':
      return obj.toString();

    case 'boolean':
      return obj ? TRUE : FALSE;

    case 'undefined':
      return UNDEFINED;

    case 'string':
      return obj;

    default:
      break;
  }

  if (obj === null) {
    return NULL;
  }

  const collection = [];
  coerce(collection, obj);
  return JSON.stringify(collection);
}

export function hash32(o) {
  return farmhash32(hashObject(o));
}
export function hash64(o) {
  return farmhash64(hashObject(o));
}
//# sourceMappingURL=index.js.map