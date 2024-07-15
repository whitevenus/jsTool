import {Type} from "../constants/Type";

/**
 * 获取输入值的真实类型
 *
 * @param value 输入值
 * @returns {string} 对应类型的字符串
 */
const trueType = (value: any): string => {
  if (value === null) {
    return "null";
  }
  if (Array.isArray(value)) {
    return "array";
  }
  return typeof value;
};

// const trueTypeFunc = (type: string): Function => (value: any): boolean => type === trueType(value)

export default {
  trueType,
  isArray: (value: any): boolean => Array.isArray(value),
  isObject: (value: any): boolean => trueType(value) === Type.OBJECT,

}
