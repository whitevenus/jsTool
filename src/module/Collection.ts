import KV from "../util/KV";
import Chain from "../util/Chain";

/**
 * 调用 func 遍历 collection
 * @param collection 传入集合, 目前支持 array 和 object
 * @param func 遍历函数
 */
const forEach = (collection: [] | object, func: (kv: KV<number | string, any>) => void) => new Chain(collection).each(func).collect()


export {
    forEach
}
