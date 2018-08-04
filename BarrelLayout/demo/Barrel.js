function Barrel(selector) {
    this.$el = $(selector);
    this.rowList = [];
    this.loadImg();
}

Barrel.prototype = {
    getImgUrls: function (num) {
        let width, height, color;
        let urls = [];
        for (let i = 0; i < num; i++) {
            width = Math.floor(Math.random() * 400 + 50);
            height = Math.floor(Math.random() * 300 + 50);
            color = Math.random().toString(16).substring(2, 8);
            urls.push('http://via.placeholder.com/' + width + 'x' + height + '/' + color + '/' + 'fff')
        }
        return urls
    },
    loadImg: function() {
        let imgUrls = this.getImgUrls(10);
        for (let i = 0; i < imgUrls.length; i++) {
            let img = new Image();
            img.src = imgUrls[i]; // 图片预加载
            img.onload =  () => {
                let imginfo = {
                    target: img,
                    width: 200 * img.width/img.height,
                    height: 200
                };
                this.placeImg(imginfo)
                // 每张图片一加载，就交给 placeImg 函数来处理
            }
        }


    },
    placeImg: function (imgInfo) {
        let ctWidth = this.$el.width();
        let rowWidth = 0;
        let newRowHeight = 0;
        let lastImgInfo = imgInfo;
        this.rowList.push(imgInfo);
        for(let i =0;i< this.rowList.length;i++){
            rowWidth  += this.rowList[i].width;
        }
       // console.log(rowWidth);

        if (rowWidth > ctWidth) {
            this.rowList.pop();
            rowWidth = rowWidth - lastImgInfo.width;
            newRowHeight = ctWidth * 200 / rowWidth;
            this.renderImg(this.rowList,newRowHeight);
            this.rowList = [];
            this.rowList.push(lastImgInfo)
        }


    },
    renderImg: function(imgs,h){
        let imgWrapper = $('<div class="img-wrapper"></div>');
        for(let i = 0; i< imgs.length;i++){
          //  console.log(  imgs[i].target)
            imgs[i].target.style.height = h + 'px';
            imgWrapper.append(imgs[i].target);
        }
      this.$el.append(imgWrapper)
    }

};