import KV from "./KV"
import TypeUtils from "./Type"
import {Type} from "../constants/Type"
import {item2KV} from "../module/Array"

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
            this._stream = obj.map(item2KV)
        } else if (TypeUtils.isObject(obj)) {
            this._rawType = Type.OBJECT
            this._stream = Object.keys(obj).map(key => new KV(key, obj[key]))
        } else {
            this._rawType = TypeUtils.trueType(obj)
            this._stream = []
        }
    }

    /**
     * 对Chain中的每一个 kv对 做自定义操作后返回原始Chain
     * @param eachHandler 自定义函数
     */
    each(eachHandler: (kv: KV<number | string, any>) => void): Chain {
        this._stream.forEach(eachHandler)
        return this
    }

    /**
     * 收集Chain中的每一个 kv对 到对应集合并返回
     */
    collect(): any {
        if (this._rawType == Type.ARRAY) {
            return this._stream.map((kv) => kv.value)
        } else if (this._rawType == Type.OBJECT) {
            return this._stream.reduce<Record<string, any>>((acc, kv) => {
                acc[kv.key] = kv.value
                return acc
            }, {})
        }
    }


}
