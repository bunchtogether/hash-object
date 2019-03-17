# Hash Object

Performant object hashing. Supports native maps, sets, classes, and typed arrays.

```js
const { hash64, hash32 } = require('@bunchtogether/hash-object');

const a = hash64({a:1, b:2});
// typeof a === 'string'

const b = hash32([1,2,3]);
// typeof b === 'number'
```
## Install

`yarn add @bunchtogether/hash-object`

## Benchmarks

### Complex Values

[hash-object](https://www.npmjs.com/package/hash-object)
* Time: 6538ms (+905.85%)
* Heap: 126Mb (+4.88%)

[node-object-hash](https://www.npmjs.com/package/node-object-hash)
* Time: 2486ms (+282.46%)
* Heap: 120Mb (+0%)

[hash-it](https://www.npmjs.com/package/hash-it)
* Time: 2930ms (+350.77%)
* Heap: 127Mb (+5.58%)

[@bunchtogether/object-hash](https://www.npmjs.com/package/@bunchtogether/hash-object)
* Time: 650ms (+0%)
* Heap: 130Mb (+8.44%)

### Simple Values

[hash-object](https://www.npmjs.com/package/hash-object)
* Time: 227ms (+24.73%)
* Heap: 146Mb (+0%)

[node-object-hash](https://www.npmjs.com/package/node-object-hash)
* Time: 262ms (+43.96%)
* Heap: 151Mb (+3.55%)

[hash-it](https://www.npmjs.com/package/hash-it)
* Time: 331ms (+81.87%)
* Heap: 155Mb (+6.25%)

[@bunchtogether/object-hash](https://www.npmjs.com/package/@bunchtogether/hash-object)
* Time: 182ms (+0%)
* Heap: 152Mb (+4.29%)


## API

