/* 
博客地址： https://www.jianshu.com/p/cc3f795f3b53
网上看到一个很形象的比喻，以坐电梯为例：
函数节流 ：保证在第一个人进来后开始计时，电梯10秒后准时运行一次，不等待，如果没有人，则不运行。

函数防抖：如果有人进电梯（触发事件），那电梯将在10秒钟后出发（执行事件监听器），这时如果又有人进电梯了（在10秒内再次触发该事件），我们又得等10秒再出发（重新计时）。

*/

// 节流， demo地址： http://output.jsbin.com/pasoqez/2

function throttle(func, wait) {
  let prev, timerId; // prev 记录上一次函数执行的时间，timerId 记录计时器的id 
  wait || (wait = 500); // 默认间隔为 250ms
    // 返回的函数，每过 wait 毫秒就执行一次 func 函数

  return function() {
    let curr = +new Date();
    let diff = curr - prev;
    if (!prev || diff >= wait) { // 如果是第一次执行函数，
     //  或者时间间隔大于我们所设置的间隔，直接执行函数，并记下当前的时间
      func();
      prev = Date.now()
    } else {
      clearTimeout(timerId);
      timerId = setTimeout(func, wait - diff)
    }
  }
}

// 防抖，demo地址： http://output.jsbin.com/lefezac

function debounce(func,wait) {
  wait || (wait = 500);
  let timerId;
  return function () { 
    clearTimeout(timerId); // 如果在wait 内再次触发，重新计时
   timerId = setTimeout(func, wait)
  }
}