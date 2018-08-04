let searchInput = document.querySelector('#search');
let imgCt = document.querySelector('.layout>main')
searchInput.addEventListener('keyup',getKeyword)

function getKeyword() {
  let curPage = 1; // 当搜索词改变时，将curpage重置
  let keyword = event.target.value.trim();
  if (event.keyCode !== 13) return;
  // 等同于  if (event.key !== 'Enter') return;
  //  当enter 事件触发
  imgCt.innerHTML = ''; 
 new Barrel(imgCt, keyword, curPage, 200);
}







//  https://pixabay.com/api/docs/

