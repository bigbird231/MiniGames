(function(){
    function initPage(){
        cloneCard();
        startTimer();
        bindListener();
    }

    //初始化卡牌
    function cloneCard(){
        let cardAmount=24;
        let cardDom,tableDom,tempDom;
        tableDom=document.querySelector(".table");
        cardDom=document.querySelector(".card");
        for(let i=1;i<cardAmount;i++){
            tempDom=cardDom.cloneNode(true);
            tableDom.appendChild(tempDom);
        }
    }

    //设置事件监听
    function bindListener(){
        let tableDom=document.querySelector(".table");
        tableDom.addEventListener("click",(e)=>{
            let target=e.target;
            if(target.className==="table"){
                return ;
            }else{
                while(target.className.indexOf("card")<0){
                    target=target.parentNode;
                }
                let className=target.className;
                if(className.indexOf("rotate")>=0){
                    target.className=className.replace("rotate","");
                }else{
                    target.className=className+" rotate";
                }
            }
        },false);
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