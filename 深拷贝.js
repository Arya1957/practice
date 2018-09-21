// JSON.parse(JSON.stringify(obj))
function     Copy(obj){
  var newObj = JSON.parse(JSON.stringify(obj));
  return newObj;
}
var obj1 = {name:'张三',
  age:18,
  contact:{
      phone: 12345678901,
      email: '123@163.com'
  }
}
var obj2 = Copy(obj1);
console.log(obj2);

obj2['contact'].email = '456@163.com';
console.log(obj1) // {name: "张三", age: 18, contact: {phone: 12345678901, email: "123@163.com"} }
console.log(obj2) //  {name: "张三", age: 18, contact: {phone: 12345678901, email: "456@163.com"}}  



// 递归
function deepCopy(oldObj){
  var newObj = {};
  for(var key in oldObj){
      if(typeof oldObj[key] ==='number'||typeof oldObj[key] ==='boolean'||
          typeof oldObj[key] ==='string'|| oldObj[key] ===null||
          oldObj[key] ===undefined){
          newObj[key] = oldObj[key]
      }
      else{
          newObj[key] = deepCopy(oldObj[key])
      }
  }
  return newObj;
}

var obj1 = {name:'张三',
          age:18,
          contact:{
          phone: 12345678901,
          email: '123@163.com'
          }
}
var obj2 = deepCopy(obj1)
obj2['contact'].email = '456@163.com'
console.log(obj1) // {name: "张三", age: 18, contact: {phone: 12345678901, email: "123@163.com"} }
console.log(obj2) // {name: "张三", age: 18, contact: {phone: 12345678901, email: "456@163.com"}} 