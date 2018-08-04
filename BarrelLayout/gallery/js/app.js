let searchInput = document.querySelector('#search');
searchInput.addEventListener('keyup',getKeyword)

function getKeyword() {
  let curPage = 1; // 当搜索词改变时，将curpage重置
  let keyword = event.target.value.trim();
  if (event.keyCode !== 13) return;
  // 等同于  if (event.key !== 'Enter') return;
  //  当enter 事件触发
  console.log(keyword);
 new Barrel('.layout>main', keyword, curPage, 200);
}







//  https://pixabay.com/api/docs/

