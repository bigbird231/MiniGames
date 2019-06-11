(function(){
    //几分几
    let divideX=6;
    let divideY=4;
    //布局数组
    let randomArr=[];
    //画布属性
    let canvas,context,canvasWidth,canvasHeight,divideWidth,divideHeight;
    //图片
    let image;

    //初始化页面
    function initPage(){
        loadImg();
        initSize();
        randomLayout();
        drawPicture();
        initListener();
    }

    //载入图片
    function loadImg(){
        image=new Image();
        image.src="img/disney.jpeg";
    }

    //初始化单位长度
    function initSize(){
        canvas=document.getElementById("content");
        context=canvas.getContext("2d");
        canvasWidth=canvas.clientWidth;
        canvasHeight=canvas.clientHeight;
        divideWidth=canvasWidth/divideX;
        divideHeight=canvasHeight/divideY;
        console.log(divideWidth,divideHeight);
    }

    //生成随机图片布局
    function randomLayout(){
        let originArr=[];
        let divide=divideX*divideY;
        for(let i=0;i<divide;i++){
            originArr.push(i);
        }
        randomArr=[];
        for(let i=0;i<divide;i++){
            let random=Math.floor(Math.random()*originArr.length);
            randomArr.push(originArr[random]);
            originArr.splice(random,1);
        }
        console.log(randomArr);
    }

    //根据布局数组，绘制图形
    function drawPicture(){
        for(let dy=0;dy<divideY;dy++){
            for(let dx=0;dx<divideX;dx++){
                let key=dy*divideWidth+dx;
                let value=randomArr[key];
                if(value===0){
                    continue;
                }
                let sy=Math.floor(value/divideX)-1;
                let sx=value%divideX-1;
                debugger;
                context.drawImage(image,sx*divideWidth,sy*divideHeight,divideWidth,divideHeight,dx*divideWidth,dy*divideHeight,divideWidth,divideHeight);
            }
        }
    }

    //点击后交换图片位置
    function switchPicture(e){

    }

    //事件绑定
    function initListener(){
        canvas.addEventListener("click",function(e){

        },false);
    }

    window.onload=initPage;
})();