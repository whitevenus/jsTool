// const item = "example*";
// const permissionItem = "example123";
// console.log(item.replace('*', '.*'))
// const regex = new RegExp(`^${item.replace('*', '.*')}$`);
// console.log(regex)
// console.log(regex.test(permissionItem)); // 输出: true


// const item = "example*";
// const permissionItem = "example123";
// console.log(permissionItem.match(item)); // 输出: null


function sum(...args) {
  return args.reduce((acc, val) => acc + val, 0);
}

// 尝试传递大量参数
const largeArray = new Array(100000).fill(1);
try {
  const result = sum(...largeArray);
  console.log(result);
} catch (error) {
  console.error(error); // 可能会抛出 RangeError: Maximum call stack size exceeded
}
