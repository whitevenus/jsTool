import L from "@f6/lube";


const obj = {a:1,b:{c:'ok', d: [{f: true}]}}
const arr = ["test", 2, 4, 5]
console.log(L.each(arr, (kv) => console.log(kv)))
console.log(L.each(obj, (kv) => console.log(kv)))
