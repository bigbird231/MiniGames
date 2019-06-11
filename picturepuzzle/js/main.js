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
        //drawPicture();
        initListener();
    }

    //载入图片
    function loadImg(){
        image=new Image(200,112);
        image.src="img/disney.jpeg";
        image.onload=drawPicture;
        document.body.appendChild(image);
    }

    //初始化单位长度
    function initSize(){
        canvas=document.getElementById("content");
        context=canvas.getContext("2d");
        canvasWidth=canvas.clientWidth;
        canvasHeight=canvas.clientHeight;
        canvas.width=canvasWidth;
        canvas.height=canvasHeight;
        divideWidth=canvasWidth/divideX;
        divideHeight=canvasHeight/divideY;
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
    }

    //根据布局数组，绘制图形
    function drawPicture(){
        context.clearRect(0,0,canvasWidth,canvasHeight);
        for(let dy=0;dy<divideY;dy++){
            for(let dx=0;dx<divideX;dx++){
                let key=dy*divideX+dx;
                let value=randomArr[key];
                if(value===0){
                    continue;
                }
                let sy=Math.floor(value/divideX);
                let sx=value%divideX;
                context.drawImage(image,sx*divideWidth,sy*divideHeight,divideWidth,divideHeight,dx*divideWidth,dy*divideHeight,divideWidth,divideHeight);
            }
        }
    }

    //点击后交换图片位置
    function switchPicture(x,y){
        for(let i=0;i<randomArr.length;i++){
            //找寻0的位置
            if(randomArr[i]===0){
                //计算0的坐标索引
                let x0=i%divideX;
                let y0=Math.floor(i/divideX);
                //计算0与目标是否相邻
                if((Math.abs(x-x0)===1 && y==y0) || (Math.abs(y-y0)===1 && x==x0)){
                    //交换值
                    let index=x+divideX*y;
                    randomArr[i]=randomArr[index];
                    randomArr[index]=0;
                    drawPicture();
                }
                break;
            }
        }
    }

    //事件绑定
    function initListener(){
        //计算出事件点所在的空间位置
        canvas.addEventListener("click",function(e){
            let x=e.pageX-canvas.offsetLeft;
            let y=e.pageY-canvas.offsetTop;
            let indexX=Math.floor(x/divideWidth);
            let indexY=Math.floor(y/divideHeight);
            switchPicture(indexX,indexY);
        },false);
    }

    window.onload=initPage;
})();