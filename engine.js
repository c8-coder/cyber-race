/* ===== SUPABASE ===== */

const SUPABASE_URL="https://ktgzpvykyuunbnjcmtpz.supabase.co";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0Z3pwdnlreXV1bmJuamNtdHB6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTAyMDMsImV4cCI6MjA4NjUyNjIwM30._rYFIlO-nLiYmqYMAMJH9QpAgdbElmB5aQXVHwpYK_s";
const supabaseClient=supabase.createClient(SUPABASE_URL,SUPABASE_KEY);

/* ===== CANVAS ===== */

const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

/* ===== INTRO ===== */

setTimeout(()=>{
document.getElementById("intro").style.display="none";
document.getElementById("menu").style.display="flex";
},2000);

/* ===== GAME STATE ===== */

let player={
x:canvas.width/2-25,
y:canvas.height-120,
w:50,
h:80,
color:"#0ff",
speed:7,
nitro:100
};

let enemies=[];
let score=0;
let running=false;

/* ===== SPAWN ENEMY ===== */

function spawnEnemy(){
enemies.push({
x:Math.random()*(canvas.width-50),
y:-100,
w:50,
h:80,
speed:4+Math.random()*3
});
}

/* ===== DRAW ===== */

function drawBackground(){
ctx.fillStyle="#03030a";
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawCar(x,y,color){
ctx.shadowBlur=20;
ctx.shadowColor=color;
ctx.fillStyle=color;
ctx.fillRect(x,y,50,80);
ctx.shadowBlur=0;
}

/* ===== CONTROLS ===== */

window.addEventListener("keydown",(e)=>{
if(e.key==="ArrowLeft") player.x-=player.speed;
if(e.key==="ArrowRight") player.x+=player.speed;
});

/* ===== GAME LOOP ===== */

function gameLoop(){

if(!running) return;

drawBackground();

score+=0.5;

if(Math.random()<0.03) spawnEnemy();

drawCar(player.x,player.y,player.color);

enemies.forEach((e,i)=>{

e.y+=e.speed;
drawCar(e.x,e.y,"red");

if(
player.x<e.x+e.w &&
player.x+player.w>e.x &&
player.y<e.y+e.h &&
player.y+player.h>e.y
){
running=false;
alert("Game Over\nScore: "+Math.floor(score));
uploadScore();
document.getElementById("menu").style.display="flex";
}

if(e.y>canvas.height) enemies.splice(i,1);

});

ctx.fillStyle="gold";
ctx.fillText("Score: "+Math.floor(score),20,30);

requestAnimationFrame(gameLoop);
}

/* ===== START GAME ===== */

function startGame(){
document.getElementById("menu").style.display="none";
score=0;
enemies=[];
running=true;
gameLoop();
}

/* ===== RANK ===== */

async function uploadScore(){
let name=document.getElementById("playerName").value||"Player";
await supabaseClient.from("scores")
.insert([{player:name,score:Math.floor(score)}]);
}

async function openBoard(){

let {data}=await supabaseClient.from("scores")
.select("*")
.order("score",{ascending:false})
.limit(10);

let text="🏆 TOP 10\n";
data.forEach(d=>{
text+=d.player+" : "+d.score+"\n";
});

alert(text);
}
