$(document).ready(function(){
    let xBoard=0,yBoard=495; //координаты доски
    let xBall=Math.round(Math.random()*450)+10; //стартовая позиция по Х мяча
    let yBall=0; //стартовая позиция по У мяча
    let isUp=false,isRight=true; //направление мяча
    let boardS=false //отскок доски выкл
    let pause=false; //пауза
    let xBallsp=2; //скорость мяча по Х
    let yBallsp=2; //скорость мяча по У
    var timer; //запуск игры
    let speedK=1; 
    let i=0; //направление отскока доски (0=выкл)
    let countB=0; //количество отбиваний мяча. для определения уровня игры
    
   
    $("#startgame").click(function(){
        pause=false, boardS=false;
        speedK=1,i=0;
        countB=0;
        yBall=0,yBoard=495;
        isUp=false;
        isRight=true;
        xBallsp=2;
        yBallsp=2;
        timer=setInterval(game,25); // м.сек
    });
    $("#stopgame").click(function(){
        if(pause==false){
        clearInterval(timer);
        pause=true;
        } else if(pause==true){        
            timer=setInterval(game,25); // м.сек
            pause=false;
        }
    });
    
    
    
    game();

    $("body").keydown( function(k){
        if(k.which == 37 && pause!=true){    
            if(xBoard>1){
                xBoard = xBoard-10;                    
            };            
        };
        if(k.which == 39 && pause!=true){
            if(xBoard <450){
                xBoard = xBoard+10;
            };
        };    
    });  

    function game(){    
        if(xBall>=490){
            isRight=false;
            xBallsp=(Math.round(Math.random()*2)+1)*speedK;
        };
        if(xBall<=0){
            isRight=true;
            xBallsp=(Math.round(Math.random()*2)+1)*speedK;
        };
        if(yBall<=0){
            isUp=false;
            yBallsp=(Math.round(Math.random()*2)+1)*speedK;
        };
        if(yBall>=480){
            if((xBall<xBoard-10 && isRight==false) || (xBall>xBoard+50 && isRight==true)
            ||(xBall<xBoard-15 &&  isRight==true) || (xBall>xBoard+55 && isRight==false)){
                $("#ball").animate({left: xBall,top: 490},1);
                isUp=true;
                yBall=490;
                clearInterval(timer);
            } else{
            isUp=true;
            i=1;
            yBallsp=3*speedK};
            countB=countB+1;
            if(countB>5 && countB<10){
                speedK=2} else if(countB>=10 && countB<15){
                    speedK=3} else if(countB>=15){
                        speedK=4};
        };

        if(isUp==true && yBoard<510 && boardS==false && i!=0){
            yBoard=yBoard+5;
        };
        if(isUp==true && yBoard>=490 && boardS==true){
            yBoard=yBoard-5;
        };
        if(yBoard==495 && i!=0){boardS=false,i=0};
        if(yBoard==510){boardS=true; i++};

        if(xBall<490 && isRight==true){            
            xBall = xBall+xBallsp;
        } else if(xBall>0 && isRight==false){
            xBall=xBall-xBallsp;
        }

        if(yBall<480 && isUp==false){
            yBall=yBall+yBallsp;
        } else if(yBall>0 && isUp==true){
            yBall=yBall-yBallsp;
        }

       
        $("#arrea").text("LEVEL"+" "+speedK);
        $("#ball").animate({left: xBall,top: yBall},1);
        $("#board").animate({left: xBoard,top: yBoard},0);
        
    };
    
});