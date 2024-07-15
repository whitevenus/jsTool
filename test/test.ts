// import T from '../src/util/Type';
import {forEach} from "../src/module/Collection"


// 示例用法
// console.log(T.trueType("Hello")); // 输出: "String"
// console.log(T.trueType(123)); // 输出: "Number"
// console.log(T.trueType(true)); // 输出: "Boolean"
// console.log(T.trueType({})); // 输出: "Object"
// console.log(T.trueType([])); // 输出: "Array"
// console.log(T.trueType(null)); // 输出: "Null"
// console.log(T.trueType(undefined)); // 输出: "Undefined"

// Example usage
// const isString = T.trueTypeFunc('string');
// const isNumber = T.trueTypeFunc('number');
// const isArray = T.trueTypeFunc('array');
// const isNull = T.trueTypeFunc('null');
//
// console.log(isString('hello')); // true
// console.log(isString(123)); // false
// console.log(isNumber(123)); // true
// console.log(isNumber('hello')); // false
// console.log(isArray([1, 2, 3])); // true
// console.log(isArray({})); // false
// console.log(isNull(null)); // true
// console.log(isNull(undefined)); // false
// console.log(T.isArray([])); // true


const arr = ["test", 2, 4, 5]
console.log(forEach(arr, (kv) => console.log(kv)))

const obj = {a: 1, b: {c: 'ok', d: [{f: true}]}}

console.log(forEach(obj, (kv) => console.log(kv)))
