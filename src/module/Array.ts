import KV from "../util/KV";
import Chain from "../util/Chain";
import ObjectUtils from "../module/Object";
import {Type} from "../constants/Type";


/**
 * 将数组元素及其索引变为 kv对
 * @param item 数组中元素
 * @param index 数组元素索引
 */
const item2KV = (item: any, index: number): KV<number, any> => new KV(index, item)

/**
 * 获取两个数组的交集
 * @param arr1 数组1
 * @param arr2 数组2
 * @example
 * const arr1 = [1, 2, 3]
 * const arr2 = [2, 4]
 * console.log(F.getIntersection(arr1, arr2)) // [2]
 */
const getIntersection = (arr1: any[], arr2: any[]): any[] => arr1.filter((item) => arr2.includes(item))

/**
 * 依据指定属性将数组转换为以指定属性值为键的对象
 * @param arr 传入数组
 * @param attrKey 指定属性
 * @example
 * const arr = [{id: 1001}, {id: 1002}]
 * console.log(F.array2ObjectWithAttr(arr, 'id')) // {1001: {id: 1001}, 1002: {id: 1002}}
 * console.log(arr) // [{id: 1001}, {id: 1002}] 不改变原数组
 */
const array2ObjectWithAttr = (arr: any[], attrKey: string): Object => {
    return new Chain(arr).map(kv => new KV(ObjectUtils.get(kv.value, attrKey), kv.value)).to({toType: Type.OBJECT });
}

/**
 * 对象数组，返回该数组对象中某个属性的值中最大的值
 * @param arr 对象数组
 * @param attrKey 指定属性值
 * @example
 * const arr = [{value: 102}, {value: 101}, {value: 100}]
 * console.log(F.findMaxValueWithAttr(arr, 'value')) // 102
 */
const findMaxValueWithAttr = (arr: any[], attrKey: string) => minOrMaxCreator(true)(new Chain(arr).map(kv => {
    kv.value = ObjectUtils.get(kv.value, attrKey)
    return kv
}).to())


/**
 * 依据传入标志创建求数组最大或最小值的函数并返回
 * @param isMax 传入标志
 */
const minOrMaxCreator = (isMax = false) => (arr: []) => {
    if (arr.length === 0) return undefined;
    return isMax ? Math.max(...arr) : Math.min(...arr);
}

/**
 * 依据指定对象键值对对象数组排序
 * @param arr 传入数组
 * @param attrKey 对象键值
 * @param isAsc 是否升序, 默认为 true
 * @example
 * const arr = [{value: 102}, {value: 101}, {value: 100}]
 * console.log(F.sortWithAttr(arr, 'value')) // default sort by asc
 * // [{value: 100}, {value: 101}, {value: 102}]
 * console.log(F.sortWithAttr(arr, 'value', false)) // if need sort by desc, set third parameter as false
 * // [{value: 102}, {value: 101}, {value: 100}]
 */
const sortWithAttr = (arr: any[], attrKey: string, isAsc = true) => arr.sort((a, b) => {
    return isAsc ? ObjectUtils.get(a, attrKey) - ObjectUtils.get(b, attrKey) : ObjectUtils.get(b, attrKey) - ObjectUtils.get(a, attrKey)
});


export default {
    item2KV,
    getIntersection,
    array2ObjectWithAttr,
    findMaxValueWithAttr,
    sortWithAttr
}
