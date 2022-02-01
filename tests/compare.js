import expect from 'expect';
import { v4 as uuidv4 } from 'uuid';
import NodeObjectHash from 'node-object-hash';
import hashObject from 'hash-object';
import hashIt from 'hash-it';
import * as bunchtogetherHashObject from '../cjs';
import cloneDeep from 'lodash/cloneDeep.js';

import {
  generate,
  generateSimpleValues
} from './lib/benchmark-values.js';

const nodeObjectHash = NodeObjectHash({ sort: false, coerce: false });

const valueGenerators = [
  [generate, "Complex Values"],
  [generateSimpleValues, "Simple Values"]
];

for(const [makeValue, name] of valueGenerators) {
  console.log(name);
  const dataA = [];
  const dataB = [];

  for (let i = 0; i < 10000; i++) {
    dataA.push(makeValue());
  }
  dataA.forEach((x) => dataB.push(cloneDeep(x)));
  
  const [baselineTime, baselineHeap] = testBaseline();
  const [_hashObjectTime, hashObjectHeap] = testHashObject();
  const [_nodeObjectHashTime, nodeObjectHashHeap] = testNodeObjectHash();
  const [_hashItTime, hashItHeap] = testHashIt();
  const [_bunchtogetherHashObjectTime, bunchtogetherHashObjectHeap] = testBunchtogetherHashObject();
  
  const hashObjectTime = _hashObjectTime - baselineTime;
  const nodeObjectHashTime = _nodeObjectHashTime - baselineTime;
  const hashItTime = _hashItTime - baselineTime;
  const bunchtogetherHashObjectTime = _bunchtogetherHashObjectTime - baselineTime;
  
  const minTime = Math.min(hashObjectTime, nodeObjectHashTime, hashItTime, bunchtogetherHashObjectTime);
  const minHeap = Math.min(hashObjectHeap, nodeObjectHashHeap, hashItHeap, bunchtogetherHashObjectHeap);

  console.log(`\n\thash-object`); 
  const hashObjectRelativeTime = hashObjectTime / minTime - 1;
  const hashObjectRelativeHeap = hashObjectHeap / minHeap - 1;
  console.log(`\t\tTime: ${hashObjectTime}ms (+${Math.round(10000 * hashObjectRelativeTime) / 100}%)`); 
  console.log(`\t\tHeap: ${Math.round((hashObjectHeap) / (1024 * 1024))}Mb (+${Math.round(10000 * hashObjectRelativeHeap) / 100}%)`); 
  console.log(`\n\tnode-object-hash`);
  const nodeObjectHashRelativeTime = nodeObjectHashTime / minTime - 1;
  const nodeObjectHashRelativeHeap = nodeObjectHashHeap / minHeap - 1; 
  console.log(`\t\tTime: ${nodeObjectHashTime}ms (+${Math.round(10000 * nodeObjectHashRelativeTime) / 100}%)`); 
  console.log(`\t\tHeap: ${Math.round((nodeObjectHashHeap) / (1024 * 1024))}Mb (+${Math.round(10000 * nodeObjectHashRelativeHeap) / 100}%)`); 
  console.log(`\n\thash-it`); 
  const hashItRelativeTime = hashItTime / minTime - 1;
  const hashItRelativeHeap = hashItHeap / minHeap - 1; 
  console.log(`\t\tTime: ${hashItTime}ms (+${Math.round(10000 * hashItRelativeTime) / 100}%)`); 
  console.log(`\t\tHeap: ${Math.round((hashItHeap) / (1024 * 1024))}Mb (+${Math.round(10000 * hashItRelativeHeap) / 100}%)`); 
  console.log(`\n\t@bunchtogether/object-hash`); 
  const bunchtogetherHashObjectRelativeTime = bunchtogetherHashObjectTime / minTime - 1;
  const bunchtogetherHashObjectRelativeHeap = bunchtogetherHashObjectHeap / minHeap - 1; 
  console.log(`\t\tTime: ${bunchtogetherHashObjectTime}ms (+${Math.round(10000 * bunchtogetherHashObjectRelativeTime) / 100}%)`); 
  console.log(`\t\tHeap: ${Math.round((bunchtogetherHashObjectHeap) / (1024 * 1024))}Mb (+${Math.round(10000 * bunchtogetherHashObjectRelativeHeap) / 100}%)`);
  console.log();

  function testBaseline() {
    global.gc();
    const startHeap = process.memoryUsage().heapUsed;
    let maxHeap = startHeap;
    const hashA = uuidv4();
    const hashB = hashA.slice();
    const start = Date.now();
    for (let i = 0; i < dataA.length; i++) {
      expect(hashA).toEqual(hashB);
      if (i % 100 === 0) {
        const heap = process.memoryUsage().heapUsed;
        maxHeap = maxHeap > heap ? maxHeap : heap;
      }
    }
    const endHeap = process.memoryUsage().heapUsed;
    maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
    //console.log(`baseline: heap differential: ${Math.round((maxHeap - startHeap) / (1024 * 1024))}Mb`); 
    return [Date.now() - start, maxHeap - startHeap];
  }

  function testHashObject() {
    hashObject(makeValue());
    global.gc();
    const startHeap = process.memoryUsage().heapUsed;
    let maxHeap = startHeap;
    const start = Date.now();
    for (let i = 0; i < dataA.length; i++) {
      const hashA = hashObject(dataA[i]);
      const hashB = hashObject(dataB[i]);
      expect(hashA).toEqual(hashB);
      if (i % 100 === 0) {
        const heap = process.memoryUsage().heapUsed;
        maxHeap = maxHeap > heap ? maxHeap : heap;
      }
    }
    const endHeap = process.memoryUsage().heapUsed;
    maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
    return [Date.now() - start, maxHeap - startHeap]; 
  }

  function testNodeObjectHash() {
    nodeObjectHash.hash(makeValue());
    global.gc();
    const startHeap = process.memoryUsage().heapUsed;
    let maxHeap = startHeap;
    const start = Date.now();
    for (let i = 0; i < dataA.length; i++) {
      const hashA = nodeObjectHash.hash(dataA[i]);
      const hashB = nodeObjectHash.hash(dataB[i]);
      expect(hashA).toEqual(hashB);
      if (i % 100 === 0) {
        const heap = process.memoryUsage().heapUsed;
        maxHeap = maxHeap > heap ? maxHeap : heap;
      }
    }
    const endHeap = process.memoryUsage().heapUsed;
    maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
    return [Date.now() - start, maxHeap - startHeap];
  }

  function testHashIt() {
    hashIt(makeValue());
    global.gc();
    const startHeap = process.memoryUsage().heapUsed;
    let maxHeap = startHeap;
    const start = Date.now();
    for (let i = 0; i < dataA.length; i++) {
      const hashA = hashIt(dataA[i]);
      const hashB = hashIt(dataB[i]);
      expect(hashA).toEqual(hashB);
      if (i % 100 === 0) {
        const heap = process.memoryUsage().heapUsed;
        maxHeap = maxHeap > heap ? maxHeap : heap;
      }
    }
    const endHeap = process.memoryUsage().heapUsed;
    maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
    return [Date.now() - start, maxHeap - startHeap];
  }

  function testBunchtogetherHashObject() {
    hashIt(bunchtogetherHashObject.hash64());
    global.gc();
    const startHeap = process.memoryUsage().heapUsed;
    let maxHeap = startHeap;
    const start = Date.now();
    for (let i = 0; i < dataA.length; i++) {
      const hashA = bunchtogetherHashObject.hash64(dataA[i]);
      const hashB = bunchtogetherHashObject.hash64(dataB[i]);
      expect(hashA).toEqual(hashB);
      if (i % 100 === 0) {
        const heap = process.memoryUsage().heapUsed;
        maxHeap = maxHeap > heap ? maxHeap : heap;
      }
    }
    const endHeap = process.memoryUsage().heapUsed;
    maxHeap = maxHeap > endHeap ? maxHeap : endHeap;
    return [Date.now() - start, maxHeap - startHeap];
  }

}


