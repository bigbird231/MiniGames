(function(){
    let randomCards;
    //卡牌总数
    let cardAmount=24;
    let timer;

    function initPage(){
        randomCard();
        cloneCard();
        startTimer();
        bindListener();
    }

    //初始化卡牌
    function cloneCard(){
        let cardWidth=80;
        let cardHeight=-120;
        let cardDom,tableDom,tempDom;
        tableDom=document.querySelector(".table");
        cardDom=document.querySelector(".card");
        tableDom.innerHTML="";
        for(let i=0;i<cardAmount;i++){
            tempDom=cardDom.cloneNode(true);
            let front=tempDom.querySelector(".front");
            //根据随机卡牌设置图片偏移量
            front.style.backgroundPosition=(randomCards[i][0]*cardWidth)+"px "+(randomCards[i][1]*cardHeight)+"px";
            tableDom.appendChild(tempDom);
        }
    }

    //随机卡牌
    function randomCard(){
        let maxX=12;
        let maxY=4;
        let originCards=[];
        randomCards=[];
        //先产生对牌
        for(let i=0;i<(cardAmount/2);i++){
            let randomX=Math.floor(Math.random()*maxX);
            let randomY=Math.floor(Math.random()*maxY);
            originCards.push([randomX,randomY]);
        }
        originCards=originCards.concat(originCards);
        //再生成随机卡牌
        for(let i=0;i<cardAmount;i++){
            let random=Math.floor(Math.random()*originCards.length);
            randomCards.push(originCards[random]);
            originCards.splice(random,1);
        }
        console.log(randomCards);
    }

    //设置事件监听
    function bindListener(){
        let tableDom=document.querySelector(".table");
        let lastDom,removeCard=0;
        tableDom.addEventListener("click",(e)=>{
            let target=e.target;
            if(target.className==="table"){
                return ;
            }else{
                //多节点事件，在父节点上单次绑定
                while(target.className.indexOf("card")<0){
                    target=target.parentNode;
                }
                let className=target.className;
                if(className.indexOf("rotate")>=0){
                    target.className=className.replace("rotate","");
                }else{
                    target.className=className+" rotate";
                }
                //判断是否相同卡牌
                if(lastDom===undefined){
                    lastDom=target;
                }else{
                    let lastFront=lastDom.querySelector(".front");
                    let front=target.querySelector(".front");
                    if(lastFront.style.backgroundPosition==front.style.backgroundPosition){
                        setTimeout(()=>{
                            lastDom.className=lastDom.className+" removed";
                            target.className=target.className+" removed";
                            removeCard+=2;
                            lastDom=undefined;
                            if(removeCard===cardAmount){
                                setTimeout(winGame,600);
                            }
                        },1200);
                    }else{
                        setTimeout(()=>{
                            lastDom.className=lastDom.className.replace("rotate","");
                            target.className=target.className.replace("rotate","");
                            lastDom=undefined;
                        },1200);
                    }
                }
            }
        },false);
    }

    //设置定时器
    function startTimer(){
        let timeDom=document.getElementById("time");
        let second=110;
        timeDom.innerHTML=second;
        timer=setTimeout(function loop(){
            timeDom.innerHTML=--second;
            if(second===0){
                setTimeout(()=>{
                    alert("游戏失败");
                    location.reload();
                },0);
            }else{
                timer=setTimeout(loop,1000);
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