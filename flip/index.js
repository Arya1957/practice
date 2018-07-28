let curIndex = 1;

let previousBtn = document.querySelector('.previous');
let nextBtn = document.querySelector('.next');



previousBtn.addEventListener('click',function(){

    if(curIndex === 1) return ;
    let curpage = document.getElementById("page"+curIndex);
    curpage.style.transform = "rotateX(90deg)";

    curIndex--;

    let prepage = document.getElementById("page"+curIndex);
    prepage.style.transform = "rotateX(0deg)";

});
nextBtn.addEventListener('click',function(){
    if(curIndex === 6) return ;
    let curpage = document.getElementById("page"+curIndex);
    curpage.style.transform = "rotateX(-90deg)";
    curIndex ++ ;

    let nextpage = document.getElementById("page"+curIndex);
    nextpage.style.transform = "rotateX(0deg)";

    console.log(nextpage);

});