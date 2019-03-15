const expect = require('expect');
const uuid = require('uuid');
const NodeObjectHash = require('node-object-hash');
const hashObject = require('hash-object');
const hashIt = require('hash-it').default;
const bunchtogetherHashObject = require('../dist');
const { generate, cloneDeep } = require('./lib/values');

const nodeObjectHash = NodeObjectHash({ sort: false, coerce: false });

const dataA = [];
const dataB = [];

for (let i = 0; i < 10000; i++) {
  dataA.push(generate());
}
dataA.forEach((x) => dataB.push(cloneDeep(x)));

testBaseline();
testHashObject();
testNodeObjectHash();
testHashIt();
testBunchtogetherHashObject();
testJsonStringify();


function testBaseline() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  const hashA = uuid.v4();
  const hashB = hashA.slice();
  console.time('baseline');
  for (let i = 0; i < dataA.length; i++) {
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('baseline');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`baseline: heap differential: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb`); 
}

function testHashObject() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  console.time('hash-object');
  for (let i = 0; i < dataA.length; i++) {
    const hashA = hashObject(dataA[i]);
    const hashB = hashObject(dataB[i]);
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('hash-object');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`hash-object: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb heap differential`);  
}

function testNodeObjectHash() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  console.time('node-object-hash');
  for (let i = 0; i < dataA.length; i++) {
    const hashA = nodeObjectHash.hash(dataA[i]);
    const hashB = nodeObjectHash.hash(dataB[i]);
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('node-object-hash');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`node-object-hash: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb heap differential`);
}

function testHashIt() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  console.time('hash-it');
  for (let i = 0; i < dataA.length; i++) {
    const hashA = hashIt(dataA[i]);
    const hashB = hashIt(dataB[i]);
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('hash-it');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`hash-it: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb heap differential`);
}

function testBunchtogetherHashObject() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  console.time('@bunchtogether/hash-object');
  for (let i = 0; i < dataA.length; i++) {
    const hashA = bunchtogetherHashObject(dataA[i]);
    const hashB = bunchtogetherHashObject(dataB[i]);
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('@bunchtogether/hash-object');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`@bunchtogether/hash-object: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb heap differential`);
}

function testJsonStringify() {
  global.gc();
  const startHeap = process.memoryUsage().heapUsed;
  let maxHeap = startHeap;
  console.time('JSON.stringify');
  for (let i = 0; i < dataA.length; i++) {
    const hashA = JSON.stringify(dataA[i]);
    const hashB = JSON.stringify(dataB[i]);
    expect(hashA).toEqual(hashB);
    if (i % 100 === 0) {
      const heap = process.memoryUsage().heapUsed;
      maxHeap = maxHeap > heap ? maxHeap : heap;
    }
  }
  console.timeEnd('JSON.stringify');
  const endHeap = process.memoryUsage().heapUsed;
  maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
  console.log(`JSON.stringify: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb heap differential`);
}

