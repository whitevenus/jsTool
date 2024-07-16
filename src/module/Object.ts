

/**
 * 获取对象的属性，支持表达式获取：key.key.[index].key
 * @example
 * const obj = {a: {b: {c:[{d:1}]}}}
 * F.attr(obj, 'a.b.c.[0].d') // get d value
 * // 1
 * @param obj 传入对象
 * @param path 属性路径
 */
const get = (obj: any, path?: string): any => {
    if (!path) return obj
    if (!obj) return undefined
    let keys = path.split('.')
    return keys.reduce((acc, cur) => {
        if (/^\[(\d+)]$/g.test(cur)) {
            const index = parseInt(cur.match(/^\[(\d+)]$/)![1], 10)
            return acc[index]
        } else {
            if (acc && cur in acc) {
                return acc[cur];
            } else {
                return undefined;
            }
        }
    }, obj)
}

export default {
    get
}
