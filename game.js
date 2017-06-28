/**
 * Created by abhishek on 23/7/16.
 */
var user=document.getElementById('username');
localStorage.setItem('userid',user);
stage=1;
score=0;
k=1;
var temp=false;
var canvas=document.getElementById('mycanvas');
var ctx=canvas.getContext('2d');//by default color is black
var c=localStorage.getItem('playerID');
c=JSON.parse(c);
var sprites = {};
sprites.player = new Image();
sprites.player.src=c;
sprites.goal = new Image();
sprites.goal.src='assets/ball.png';
sprites.enemy=[];

sprites.enemy[0]=new Image();
sprites.enemy[0].src='assets/bulbasaur.png';
sprites.enemy[1]=new Image();
sprites.enemy[1].src='assets/meow.png';
sprites.enemy[2]=new Image();
sprites.enemy[2].src='assets/gengar.png';
sprites.enemy[3]=new Image();
sprites.enemy[3].src='assets/drowsy.png';
sprites.enemy[4]=new Image();
sprites.enemy[4].src='assets/enemy5.png';
sprites.enemy[5]=new Image();
sprites.enemy[5].src='assets/enemy6.png';
sprites.enemy[6]=new Image();
sprites.enemy[6].src='assets/enemy7.png';
sprites.enemy[7]=new Image();
sprites.enemy[7].src='assets/enemy8.png';
var enemy = [
    {
        x:100,
        y:100,
        w:50,
        h:50,
        speedy:1
    },
    {
        x:250,
        y:200,
        w:50,
        h:50,
        speedy:1.5
    },
    {
        x:400,
        y:300,
        w:50,
        h:50,
        speedy:2
    },
    {
        x:550,
        y:100,
        w:50,
        h:50,
        speedy:2.5
    },
    {
        x:700,
        y:200,
        w:50,
        h:50,
        speedy:3
    },
    {
        x:850,
        y:100,
        w:50,
        h:50,
        speedy:3.5
    },
    {
        x:1000,
        y:100,
        w:50,
        h:50,
        speedy:4
    },
    {
        x:1150,
        y:100,
        w:50,
        h:50,
        speedy:4.5
    }
];

/*x =100;
 y=200;
 w=50;
 h=50;
 speedx=2;*/
game_width=1400;
game_height=750;
var game_over=false;
var player={
    x:10,
    y:game_height/2,
    w:50,
    h:50,
    speedx:3,
    ismoving:false
};
var goal={
    x:game_width-50,
    y:game_height/2,
    w:50,
    h:50
};
canvas.addEventListener('mousedown',function (event) {
    player.ismoving = true;

});
canvas.addEventListener('mouseup',function () {
    player.ismoving=false;
});
canvas.addEventListener('touchstart',function () {
    player.ismoving=true;
});
canvas.addEventListener('touchend',function () {
    player.ismoving=false;
});
function updateSpeed(a) {
  console.log('abhi');
    for(var i=0;i<enemy.length;i++){
        if(enemy[i].speedy>=0){
            var b=a-1;
            enemy[i].speedy+=b;
        }else{
            var c=a-1;
            enemy[i].speedy-=c;
        }
    }
    if(a==2){
        document.getElementById('mycanvas').style.backgroundImage="url('back2.png')";
    }
    if(a==3){
        document.getElementById('mycanvas').style.backgroundImage="url('images.jpeg')";
    }

}
var isColliding = function (r1,r2) {
    var first= Math.abs(r1.x-r2.x) <= Math.max(r1.w,r2.w);
    var second= Math.abs(r1.y-r2.y) <= Math.max(r1.h,r2.h);
    if(first&&second)
        return true;
    else
        return false;
}
var update= function () {
    /* x=x+speedx;
     if(x>=game_width-50||x<=0){
     speedx *= -1;
     }*/
    if(player.x>=(k*150)){
        score++;
        k++;
        // document.getElementById('score').innerHTML='score='+score;
    }
    enemy.forEach(function (element,index) {
        console.log(player.x);
        if(isColliding(player,element)){
            // var temp=localStorage.getItem('userid');
            // alert("Game Over"+temp);
            game_over=true;
            sessionStorage.setItem('score',score);
            window.location.href="gameover.html";
        }
    });
    if(isColliding(player,goal)){
        k=1;
        stage++;
        document.getElementById("le").style.display='block';
        document.getElementById("level").innerHTML='LEVEL ='+stage;

        setInterval(function(){
        document.getElementById("le").style.display='none';
        },2000)
        player.x=0;
        updateSpeed(stage);
        /*alert('you won');
         game_over=true;
         window.location="";*/
    }
    enemy.forEach(function (element,index) {
        element.y+=element.speedy;
        if(element.y >=game_height-50 ||element.y<=0){
            element.speedy *= -1;
        }
    })
    if(player.ismoving==true){
        player.x+=player.speedx;
    }
}
var draw= function () {
    ctx.clearRect(0,0,game_width,game_height);
    ctx.fillStyle= "rgb(0,200,0)";
    enemy.forEach(function (element,index) {
        //ctx.fillRect(element.x,element.y,element.w,element.h);
        ctx.drawImage(sprites.enemy[index],element.x,element.y,element.w,element.h)
    });
    ctx.fillStyle= "rgb(200,200,0)";
    //ctx.fillRect(player.x,player.y,player.w,player.h);
    ctx.drawImage(sprites.player,player.x,player.y,player.w,player.h);
    //ctx.fillRect(x,y,h,w) /*x coordinate,y,height,width*/
    ctx.fillStyle= "rgb(150,100,30)";
    //ctx.fillRect(goal.x,goal.y,goal.w,goal.h);
    ctx.drawImage(sprites.goal,goal.x,goal.y,goal.w,goal.h);

}
var render = function() {
    draw();
    update();
  if(game_over==false){
  window.requestAnimationFrame(render);
    }
}
render();
