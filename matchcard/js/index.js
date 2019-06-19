(function(){
    function initPage(){
        cloneCard();
        startTimer();
    }

    //初始化卡牌
    function cloneCard(){
        let cardAmount=24;
        let cardDom,tableDom,tempDom;
        tableDom=document.querySelector(".table");
        cardDom=document.querySelector(".card");
        for(let i=0;i<cardAmount;i++){
            
        }
    }

    //设置定时器
    let timer;
    function startTimer(){
        let timeDom=document.getElementById("time");
        let second=200;
        timeDom.innerHTML=second;
        timer=setTimeout(function loop(){
            timeDom.innerHTML=--second;
            if(second===0){
                setTimeout(()=>{
                    alert("游戏失败");
                },0);
            }else{
                setTimeout(loop,1000);
            }
        },1000);
    }

    //游戏胜利
    function winGame(){
        clearTimeout(timer);
        alert("游戏胜利");
    }

    window.onload=initPage;
})();