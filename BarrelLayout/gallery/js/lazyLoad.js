 function lazyLoad(image) {
  let imgs = [].slice.call(image) || document.querySelectorAll('.lazyload');
  
  let onscroll = throttle(
      function scroll() {
          if (imgs.length === 0) return window.removeEventListener('scroll', onscroll); // 如果都加载完了，移除监听事件
          imgNodes = imgs.filter(img => img.classList.contains('lazyload'));
          imgNodes.forEach(imgNode => {
              if (isVisible(imgNode)) {
                  loadImg(imgNode);
              }
          })
      }, 500);
  window.addEventListener('scroll', onscroll);
  window.dispatchEvent(new Event('scroll'));  //  派发一个 scroll 事件，防止在页面刚加载并且没有滚动时产生空白
}

function isVisible(img) {  // 判断元素是否在可视范围
  let {top, right, bottom, left} = img.getBoundingClientRect();
  let vpWidth = document.documentElement.clientWidth;
  let vpHeight = document.documentElement.clientHeight;
  if (((top > 0 && top < vpHeight) || (bottom > 0 && bottom < vpHeight )) && ((right > 0 && right < vpWidth) || (left > 0 && left < vpWidth))) {
      return true
  }
}

function loadImg(imgNode) {     //  加载图片
  let img = new Image();
  img.src = imgNode.dataset.src;
  img.onload = function () {
    imgNode.src =  img.src;
    imgNode.classList.remove('lazyload')  // 图片加载后就不再遍历
  }
}