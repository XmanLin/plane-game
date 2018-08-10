window.onload =init; //窗口加载方法
//获取鼠标的参数
window.onmousemove = MouseMove;
var  context;
var my_plane, enemys=[],bullets=[];
var cW = 1024;
var cH = 768;
//我方子弹速度

//我方飞机初始位置
var my_planeX =512;
var my_planeY = 600;
//敌机坐标
var score=400;
var p1;


function init(){
    //找到画布
    var canvas = document.getElementById("plane_game");
    context = canvas.getContext("2d");
    game_bg = AddImage("image/bg.png");
    my_plane = AddImage("image/II.png");
    p1=document.getElementById("score");
    //敌机出现的定时器
    setInterval(createEnemy,1000);
    //子弹发射的频率
    setInterval(creatbullet,200);
    //定时器
    setInterval(GameTick,1000/60);

}
//刷新机制的方法
function GameTick() {
    //log("第"+(i++)+"次");
    clearScreen();//每次刷新之前要清空当前屏幕
    context.drawImage(game_bg, 0, 0);
    context.drawImage(my_plane, my_planeX, my_planeY);
    updateEnemy();
    updatebullet();
    end();
    shoot();

}
//摧毁敌方飞机的条件
function shoot(){
    for(var i = enemys.length-1;i>=0;i--){
        for(var j = bullets.length-1;j>=0;j--){
            var item = enemys[i];
            var itemb = bullets[j];
            var hit = hit_enemy(item.x,item.y,47,60,itemb.x,itemb.y);
            if(hit){
                enemys.splice(i,1);
                p1.innerText ="分数:"+(++score);
                if(score==600){
                    return next();
                }
                bullets.splice(j,1);

                break;
            }
        }
    }
}
function hit_enemy(x1,y1,w1,h1,x2,y2){
    if(x2>=x1 && x2<=x1+w1 &&  y2>=y1 && y2<=y1+h1){
        return true;
    }
    else
    {
        return false;
    }
}
//满足我方飞机摧毁的条件
function end(){
    for(var i = enemys.length-1;i>=0;i--) {
        var item = enemys[i];
        var hit = hitPlane(item.x, item.y, 47,50, my_planeX, my_planeY+4,69,91);//敌机的坐标获取问题已解决！！！困扰死宝宝了！！！
        if (hit) {
            enemys.splice(i,1);
            endGame();
            break;
        }
    }
}

//x1,y1 敌机的坐标；w1,h1敌机的宽高；x2,y2我方飞机的坐标
function hitPlane(x1, y1, w1, h1, x2, y2,w2,h2) {
    if(x1+w1>=x2 && x1<=x2+w2 && y1+h1>=y2 && y1<=y2+h2) {
        return true;
    } else {
        return false;
    }

}
//刷新敌方飞机
function updateEnemy(){
    for(var i=0;i<enemys.length;i++){
        var item = enemys[i];
        context.drawImage(item.item, item.x, item.y);
        item.x += 0;
        item.y += 14;
    }
}

//创建敌方飞机的方法
function createEnemy(){
    for(var i=randomNum(0,23);i<randomNum(10,23);i++){
        for(var j=0;j<randomNum(0,1);j++){
            var item = AddImage("image/enemy.png");
            enemys.push({
                item:item,
                x:50*i,
                y:92*j-100
            })
        }
    }

}
//刷新子弹
function updatebullet(){
    for(var i=0;i<bullets.length;i++){
        var itemb = bullets[i];
        context.drawImage(itemb.item, itemb.x, itemb.y);
        itemb.x += 0;
        itemb.y -= 4;
        if(itemb.y<0){
            bullets.splice(i,1);
        }
    }
}

//创建子弹的方法
function creatbullet() {

    var itemb = AddImage("image/bullet1.png");
    bullets.push({
        item: itemb,
        x: my_planeX+35,
        y: my_planeY
    })
}
//随机生成[min,max]之间的整数
function randomNum(minNum,maxNum){
    switch(arguments.length){
        case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
        case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
        default:
            return 0;
            break;
    }

}
//移动我方飞机的方法
function MouseMove(e){

    my_planeX = e.x - my_plane.width/2;
    my_planeY = e.y - my_plane.height/2;
    //鼠标左边的位置
    if(e.x<= my_plane.width/2) {
        my_planeX = 0;
    }
    //鼠标右边的位置
    if(e.x>= cW - my_plane.width/2){
        my_planeX =cW-my_plane.width;
    }
    //鼠标上边的位置
    if(e.y<=my_plane.height/2){
        my_planeY =0;
    }
    //鼠标下边的位置
    if(e.y>=cH - my_plane.height/2){
        my_planeY = cH -my_plane.height;
    }

}

//添加图片的方法
function AddImage(url){
    var img = new Image();
    img.src=url;
    return img;
}
//清空当前屏幕的方法
function clearScreen(){
    //清空当前屏幕
    context.clearRect(0,0,cW,cH);

}
function endGame(){
    window.location.href="";
}
function next(){
    window.location.href="success.html";
}