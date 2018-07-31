/* 冒泡排序 */

/* 思路：
-  比较相邻两个的数，如果前面一个比后面一个大，则交换他们的位置
-  这样一轮下来，最大的数排在最后面，第一轮比较的次数为 n-1
-  第二轮比较，重复上述操作，但是由于上一轮中最后一个元素已经是最大的了，所以这一轮最后一个不用比较
*/

{
function sort (arr) {
    for (let i =0 ; i < arr.length -1 ; i++){
      for (let j = 0; j< arr.length - i -1; j++) {
          if (arr[j] > arr[j+1]) {
              //  如果前一个大于后一个，则交换位置
          swap(arr,j,j+1);
          }
      }
    }
    return arr
}


// swap 函数的作用是交换元素的位置
function swap (arr,left,right) {
   let temp = arr[left];
   arr[left] = arr[right];
   arr[right] = temp ;
}


let arr = [29,12,10,14,9,37,14,43,13,37];
sort(arr) //  [9, 10, 12, 13, 14, 14, 29, 37, 37, 43]
}

/*
其他排序还有：
- 选择排序： 把最小的放前面。先指定一个相对最小的在最前面，然后将后面的与第一个进行对比（一直比到最后），一轮结束后，将这一轮的比之前第一个更小的值放在第一个
- 插入排序 ： 起牌算法
- 归并排序 ： 领导算法
- 快速排序：
自私算法： 我前面的都比我矮，我后面的都比我高
- 随机化快速排序

[算法动态可视化](https://visualgo.net/en/sorting?slide=1)

 */