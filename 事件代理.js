//  简单情况的事件代理写法
let parent = document.querySelector('.parent')
parent.addEventListener('click',handler)
function handler(e) {
/*   if(e.target.tagName.toLowerCase() === 'li') {
      console.log(e.target.innerText)
  }
  */
  if(e.target.matches('li')) {
     console.log(e.target.innerText)
  }
}
// 完整代码在这里 http://jsbin.com/nuyenun/1/edit?html,js,output

//  稍复杂的情况 ---- 递归

let result  = document.getElementById('result')

result.addEventListener('click',handler)
function handler(e) {
  let target = e.target;
  while(target !== result){
    if(target.tagName.toLowerCase() === 'li'){
       console.log(target.innerText);
    } 
    target = target.parentNode;    
  }
}
// 完整代码在这里： http://jsbin.com/hukojip/edit


