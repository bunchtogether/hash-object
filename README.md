# Hash Object

```js
const { hash64, hash32 } = require('@bunchtogether/hash-object');

const a = hash64({a:1, b:2});
// typeof a === 'string'

const b = hash32([1,2,3]);
// typeof b === 'number'
```

## Install

`yarn add @bunchtogether/hash-object`

## API

