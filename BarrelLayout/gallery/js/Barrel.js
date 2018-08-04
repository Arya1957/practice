
class Barrel {
    constructor(el, keyword,curPage,BaseHeight) {
        console.log(keyword);

        this.el = document.querySelector(el);
        this.keyword = keyword || 'cat';
        this.curPage = curPage || 1;
        this.BaseHeight = BaseHeight || 200;
        this.imgUrls = [];
        this.loading = false;
        this.lanuch();

        window.onresize = throttle(() => {
            //  这里有些浪费，能否不重新请求数据呢？ =>  将数据存到了this.imgUrls 里
            this.el.innerHTML = '';
            this.placeImg(this.imgUrls) ;          
        }, 200);

        window.onscroll = throttle(() => {
            if (this.isToBottom()) {
                this.loadmore()
            }
    },300)
}

    loadmore() {
       if(this.loading) return ;
       this.lanuch();
    }

    lanuch () {
        this.getImg()
        .then(this.placeImg.bind(this)) //这里一定要记得绑定 this
        .catch((err) => console.log(err));
    }

   
    getImg(keyword) {
        return new Promise((resolve, reject) => {
            //  console.log(this);
            let data = {
                key: '9707187-ef5962554ce6e0f6e0d82c02c',
                q: this.keyword ,
                image_type: 'photo',
                page: this.curPage || 1,
                per_page: 20, // perPageCount
                lang: 'en' || 'zh'
            };
            let url = 'https://pixabay.com/api/?';
            for (let key in data) {
                url += key + '=' + data[key] + '&'
            }
            //   console.log(url);
            this.loading = true; // 上锁
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.send();
            xhr.onload =  ()=> {
                if ((xhr.status >= 200 || xhr.status < 300) || xhr.status === 304) {
                    let imgData = JSON.parse(xhr.response);
                    resolve(imgData);
                    this.imgUrls = imgData;
                    this.curPage ++;
                    this.loading = false; // 解锁

                    return this.imgUrls
                } else {
                    console.log('error')
                }
            };
            xhr.onerror = function () {
                reject('ajax error')
            }
        })
    }

    // 将图片一排排的安排好，计算好宽度，并将信息传给 render 函数，让render函数按照算好的宽高将图片摆放在页面上
    placeImg(img) {
     //   console.log(this)
        let wrapperWidth = parseFloat(getComputedStyle(this.el).width);

        let rowList = [];
        let rowTotalWidth = 0;
        img.hits.forEach((imgInfo) => {
            imgInfo.newHeight = this.BaseHeight;
            imgInfo.newWidth = this.BaseHeight * imgInfo.webformatWidth / imgInfo.webformatHeight;
            // webformatWidth / webformatHeight =  newWidth / this.BaseHeight
            imgInfo.ratio = imgInfo.webformatWidth / imgInfo.webformatHeight;
            //  图片的宽高比保存下来后面用

            if (imgInfo.newWidth + rowTotalWidth > wrapperWidth) {
                //  如果当前遍历到的图片宽度加上 我们之前的没有渲染的图片的总宽度大于容器宽度，就先不管当前图片，将目前 rowList 里的图片让render函数去处理
                this.render(rowList, rowTotalWidth, wrapperWidth);
                rowList = [imgInfo];
                rowTotalWidth = imgInfo.newWidth;
            } else {
                rowList.push(imgInfo);
                rowTotalWidth += imgInfo.newWidth;
            }
        });
        this.render(rowList, rowTotalWidth, wrapperWidth);
        rowList = [];
        rowTotalWidth = 0;
        // 因为只有当 imgInfo.newWidth + rowTotalWidth > wrapperWidth 时，才会调用 render函数，这里可能会有一个尴尬的情况是： 当前请求的图片还剩几张没有render (宽度总和不满足我们前面设置的渲染条件). 所以才要再遍历完之后再次调用 render 函数

    }

    render(imgList, rowTotalWidth, wrapperWidth) {
        let newHeight = this.BaseHeight * (wrapperWidth / rowTotalWidth);
        imgList.forEach((img) => {
            let figureNode = document.createElement('figure');
            let imgNode = document.createElement('img');

            imgNode.className = 'lazyload';
            imgNode.setAttribute('data-src',img.webformatURL) ;


          //   imgNode.src = img.webformatURL;
            figureNode.style.width = img.ratio * newHeight + 'px';
            figureNode.style.height = newHeight + 'px';
            // console.log('高度：' + figureNode.style.height, '宽度：' + figureNode.style.width);
            figureNode.appendChild(imgNode);
            this.el.appendChild(figureNode);
            lazyLoad( this.el.querySelectorAll('.lazyload')
        ) 
            // 将需要懒加载的列表传给 lazyload函数
        })

    }

    isToBottom() {
        return (document.body.scrollHeight - document.documentElement.scrollTop - document.documentElement.clientHeight) < 5
        // 页面内容高度 - 滚动距离 - 窗口高度； 这种判断方法的好处是不用埋节点来判断是否滚动到底部
         // document.body.scrollTop总是 0 : https://www.jianshu.com/p/b0a39995b11f
    }

}







