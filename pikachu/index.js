let code = ` /* 鼻子 */                                                
.pikachu .nose {
  position: absolute;
  top: 28px;
  width: 0;
  height: 0;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 12px;
  border-style: solid;
  border-radius: 50%;
  border-color: #000 transparent transparent transparent;
}

/* 眼睛 */
.pikachu .eye {
  position: absolute;
  width: 40px;
  height: 40px;
  border: 4px solid #000;
  background: #2e2e2e;
  border-radius: 50%;
}
.pikachu .eye.left {
  right: 50%;
  margin-right: 75px;
}
.pikachu .eye.right {
  left: 50%;
  margin-left: 75px;
}
.pikachu .eye::before {
  position: absolute;
  left: 5px;
  content: "";
  display: block;
  width: 16px;
  height: 16px;
  background: #fff;
  border-radius: 50%;
  animation: blink 3s infinite step-start 0s;
}
/* 眼睛眨呀眨 ~  */

@keyframes blink {
  0%, 100% {
    opacity: 0;
  }
  15%,
  95% {
    opacity: 1;
  }
}

/* 红红的脸蛋 */

.pikachu .face {
  width: 55px;
  height: 55px;
  background: #fc0d1c;
  border-radius: 50%;
  position: absolute;
  top: 85px;
  border: 3px solid #2e2e2e;
}
.pikachu .face.left {
  right: 50%;
  margin-right: 100px;
}
.pikachu .face.right {
  left: 50%;
  margin-left: 100px;
}

/* 小舌头 */

.pikachu .upperlip {
  position: absolute;
  height: 20px;
  width: 70px;
  border: 3px solid #000;
  top: 58px;
  border-top: none;
  background: #FFE600;
}
.pikachu .upperlip.left {
  border-bottom-left-radius: 36px 18px;
  border-right: none;
  transform: rotate(-20deg);
  right: 50%;
}
.pikachu .upperlip.right {
  border-bottom-right-radius: 40px 20px;
  border-left: none;
  transform: rotate(20deg);
  left: 50%;
}
.pikachu .lowerlip-wrapper {
  overflow: hidden;
  position: absolute;
  left: 50%;
  margin-left: -70px;
  height: 140px;
  width: 140px;
  bottom: -24px;
}
.pikachu .lowerlip-wrapper .lowerlip {
  position: absolute;
  bottom: 0;
  width: 140px;
  height: 1000px;
  background: #990513;
  border-radius: 140px / 760px;
  border: 3px solid #000;
  overflow: hidden;
}
.pikachu .lowerlip-wrapper .lowerlip:after {
  background: #fc4a62;
  content: '';
  position: absolute;
  bottom: 0;
  width: 114px;
  height: 114px;
  border-radius: 50%;
  left: 50%;
  margin-left: -57px;
}
/*完*/
`;


let duration = 30;

$('.actions').on('click', 'button', function (e) {
    $button = $(e.currentTarget); // 在事件冒泡过程中的当前DOM元素
  //  $button = $(e.target); // event.target 触发事件的DOM元素
    console.log(e.target);

    speed = $button.attr('data-speed');
    $button.addClass('active')
        .siblings('.active').removeClass('active');
    switch (speed) {
        case 'slow':
            duration = 100;
            break;
        case 'normal':
            duration = 50;
            break;
        case 'fast':
            duration = 20;
            break;
    }

});


function writeCode( code, fn) {
    let wrapper = document.querySelector('#code');
    let styleTag = document.querySelector('#styleTag');
    let n = 0;
    let id;
    id = setTimeout(function run() {
        n += 1;
        wrapper.innerHTML = code.substring(0, n);
        styleTag.innerHTML = code.substring(0, n);
        wrapper.scrollTop = wrapper.scrollHeight;
        if (n < code.length) {
            id = setTimeout(run, duration)
        } else {
            fn && fn.call() //如果传了回调那么我就再调一下回调。
        }
    }, duration)
}


writeCode(code);

