// - ES6 写法
```
Array.from(new Set(arr))
```

// ES5 

// -  遍历数组
```
function fn(arr) {
  let temp = [];
  for(var i=0; i< arr.length; i++){
    if(temp.indexOf(arr[i]) === -1) {
  // 判断arr[i]是否在临时数组中，不在则将arr[i]的值复制到temp里
      temp.push(arr[i])
    } 
  }
  return temp
}

var arr = [1,2,4,5,5,5,1];
var arr1 = fn(arr)
```
// - 排序
```
function fn(arr) {
  let temp = [];
  arr.sort(); // 排序
  temp.push(arr[0]);
  for(var i=0; i< arr.length; i++){
    if(arr[i] != temp[temp.length-1] ){
      temp.push(arr[i])
    } 
  }
  return temp
}

var arr = [1,2,4,5,5,5,1];
var arr1 = fn(arr)
```