/**
 * KV 工具类：将原始集合中的数据项映射为 kv对
 */
export default class KV<K, V> {
    private _key: K
    private _value: V

    constructor(key: K, value: V) {
        this._key = key;
        this._value = value;
    }


    get key(): K {
        return this._key;
    }

    set key(value: K) {
        this._key = value;
    }

    get value(): V {
        return this._value;
    }

    set value(value: V) {
        this._value = value;
    }


}
