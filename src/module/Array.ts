import KV from "../util/KV";

/**
 * 将数组元素及其索引变为 kv对
 * @param item 数组中元素
 * @param index 数组元素索引
 */
const item2KV = (item: any, index: number): KV<number, any> => new KV(index, item)

export {
    item2KV,

}
