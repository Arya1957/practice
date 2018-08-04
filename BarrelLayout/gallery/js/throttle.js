// 节流函数
// 如果函数在一段时间内（delay）调用了多次，那么只有一次生效


function throttle(func, wait) {  //  节流函数
    let prev, timer;  //  上一次调用的时间
    return function fn() {
        let curr = Date.now();
        let diff = curr - prev;
        if (!prev || diff >= wait) {  // 第一次调用或者离上一次调用时间间隔大于或等于延迟时间
          //  console.log(func);
            func();
            prev = curr;
        } else if (diff < wait) {
            clearTimeout(timer);
            timer = setTimeout(func, wait - diff)
        }
    }
  }

  

// function throttle(fn, delay) {
//     console.log('throttle');

//     let timerId = null;
//     return function () {
//         clearTimeout(timerId);
//         timerId = setTimeout(() => {
//             fn.apply(this, arguments)
//         }, delay)
//     }
// }