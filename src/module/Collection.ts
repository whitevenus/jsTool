import KV from "../util/KV";
import Chain from "../util/Chain";
import {Type} from "../constants/Type";

/**
 * 调用 func 遍历 collection
 * @param collection 传入集合, 目前支持 array 和 object
 * @param func 遍历函数
 */
const forEach = (collection: [] | object, func: (kv: KV<number | string, any>) => void): void => new Chain(collection).each(func)

/**
 * 调用 func 操作 collection
 * @param collection 传入集合, 目前支持 array 和 object
 * @param func 自定义函数
 */
const map = (collection: [] | object, func: (kv: KV<number | string, any>) => void) => new Chain(collection).map(func).stream

/**
 * 使用自定义函数对 collection 做reduce操作
 * @param collection 传入集合, 目前支持 array 和 object
 * @param func 自定义函数
 * @param initValue 初始值
 */
const reduce = (collection: [] | object, func: (acc: any, cur: KV<number | string, any>) => any, initValue: any) => new Chain(collection).reduce(func, initValue)


export default {
    forEach,
    map,
    reduce
}
