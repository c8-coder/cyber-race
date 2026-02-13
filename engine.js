const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let score=0;
let coins=0;
let enemies=[];

let player=new Entity();
player.addComponent("position",{x:canvas.width/2,y:canvas.height-150});
player.addComponent("movement",{speed:7});
player.addComponent("hp",{value:100});
player.addComponent("skill",SkillComponent("dash"));

ecs.addEntity(player);

function spawnEnemy(){
enemies.push({
x:Math.random()*canvas.width,
y:-100,
speed:5
});
}

function drawCar(x,y){
ctx.fillStyle="cyan";
ctx.fillRect(x,y,60,100);
}

function update(){
ctx.clearRect(0,0,canvas.width,canvas.height);

score+=0.5;
if(Math.random()<0.02) spawnEnemy();

let pos=player.get("position");
let move=player.get("movement");

drawCar(pos.x,pos.y);

enemies.forEach((e,i)=>{
e.y+=e.speed;
drawCar(e.x,e.y);

if(e.y>canvas.height){
enemies.splice(i,1);
coins+=5;
}
});

updateSkills();

document.getElementById("scoreUI").innerText="Score: "+Math.floor(score);
document.getElementById("coinsUI").innerText="Coins: "+coins;

requestAnimationFrame(update);
}

update();

document.getElementById("skillBtn").onclick=()=>{
activateSkill(player);
};
