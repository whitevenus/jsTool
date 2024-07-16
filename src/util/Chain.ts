import KV from "./KV"
import {Type} from "../constants/Type"
import ArrayUtil from "../module/Array"
import TypeUtils from "../util/Type";




/**
 * Chain工具类: 将原始数据类型(array、object、string等)解析为 k-v对 组成的链
 */
export default class Chain {
    private _rawType: string
    private _stream: KV<number | string, any>[]

    /**
     * 构造器，依据 obj 类型构造相应的 Chain
     * @param obj 任意类型对象
     */
    constructor(obj: any) {
        if (TypeUtils.isArray(obj)) {
            this._rawType = Type.ARRAY
            this._stream = obj.map(ArrayUtil.item2KV)
        } else if (TypeUtils.isObject(obj)) {
            this._rawType = Type.OBJECT
            this._stream = Object.keys(obj).map(key => new KV(key, obj[key]))
        } else {
            this._rawType = TypeUtils.trueType(obj)
            this._stream = []
        }
    }

    /**
     * 收集Chain中的每一个 kv对 到对应集合并返回
     * @param toType
     * @param stream
     */
    to({ toType = this._rawType, stream = this._stream } = {}): any {
        if (toType == Type.ARRAY) {
            return stream.map((kv) => kv.value)
        } else if (toType == Type.OBJECT) {
            return stream.reduce<Record<string, any>>((acc, kv) => {
                acc[kv.key] = kv.value
                return acc
            }, {})
        }
    }

    /**
     * 对 Chain 中的每一个 kv对 做指定的 forEach 操作
     * @param eachHandler 处理函数
     */
    each(eachHandler: (kv: KV<number | string, any>) => void) {
        return this._stream.forEach(eachHandler)
    }

    /**
     * 对 Chain 中每一个 kv对 做指定的 map 操作并返回 Chain
     * @param mapHandler 处理函数
     */
    map(mapHandler: (kv: KV<number | string, any>) => any): Chain {
        this._stream =  this._stream.map(mapHandler)
        return this
    }

    /**
     * 对 Chain 中每一个 kv对 做指定的 reduce 操作
     * @param reduceHandler 处理函数
     * @param initValue 初始值
     */
    reduce(reduceHandler: (acc: any, cur: KV<string | number, any>) => any, initValue: any) {
        return this._stream.reduce(reduceHandler, initValue)
    }

    get stream(): KV<number | string, any>[] {
        return this._stream;
    }

    set stream(value: KV<number | string, any>[]) {
        this._stream = value;
    }
}
