// ================== NHẠC ==================
const bgm = document.getElementById("bgm");

function startMusic() {
  bgm.volume = 0.5;
  bgm.play().catch(()=>{});
  document.removeEventListener("click", startMusic);
}

document.addEventListener("click", startMusic);


// ================== SAO RƠI ==================
const icons = ["⭐","🌟","✨","☆","★","✧","✦","⋆"];
const cards = [
  { img:"anh1.jpg", text:"❤️Chúc Hường năm mới sẽ có thêm thật là nhiều niềm vui ❤️" },
  { img:"anh2.jpg", text:"❤️‍🩹Năm mới mong chị sẽ luôn được bình an và nhẹ lòng❤️‍🩹" },
  { img:"anh3.jpg", text:"😍Chúc chị Hường sang năm mới sẽ ngày càng xinh đẹp hơn cả 😍" },
  { img:"anh4.jpg", text:"🍀Mong rằng sang năm mới sẽ có thật nhiều sự may mắn và tốt đẹp tới với chị🍀" },
  { img:"anh5.jpg", text:"💕Mong chị Hường sẽ luôn nhận được sự yêu thương và trân trọng 💕" },
  { img:"anh6.jpg", text:"☁️Chúc cho Hường có một năm nhẹ nhàng và ít phải lo nghĩ nhe ☁️" },
  { img:"anh7.jpg", text:"💜Mong cho chị có một năm thật thuận lợi và hạnh phúc 💜"}
];

let index = 0;

const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
const popupText = document.getElementById("popup-text");

function showCard(){
  popupImg.src = cards[index].img;
  popupText.innerText = cards[index].text;
  popup.style.display = "flex";
  index = (index + 1) % cards.length;
}

function createStar(){
  const star = document.createElement("div");
  star.className="star";
  star.textContent = icons[Math.floor(Math.random()*icons.length)];
  star.style.left = Math.random()*window.innerWidth+"px";
  star.style.fontSize = (20+Math.random()*20)+"px";
  star.style.animationDuration = (5+Math.random()*4)+"s";
  star.onclick = showCard;
  document.body.appendChild(star);
  setTimeout(()=>star.remove(),9000);
}

setInterval(createStar,700);

popup.onclick=()=>popup.style.display="none";


// ================== PHÁO HOA ==================
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize",resize);

class Particle{
  constructor(x,y,vx,vy,color){
    this.x=x;
    this.y=y;
    this.vx=vx;
    this.vy=vy;
    this.life=100;
    this.color=color;
  }
  update(){
    this.x+=this.vx;
    this.y+=this.vy;
    this.vy+=0.03;
    this.vx*=0.99;
    this.vy*=0.99;
    this.life--;
  }
  draw(){
    ctx.globalAlpha=this.life/100;
    ctx.beginPath();
    ctx.arc(this.x,this.y,2,0,Math.PI*2);
    ctx.fillStyle=this.color;
    ctx.fill();
    ctx.globalAlpha=1;
  }
}

let particles=[];

function explode(x,y){
  const color=`hsl(${Math.random()*360},100%,60%)`;
  const type=Math.floor(Math.random()*4);

  if(type===0) circleShape(x,y,color);
  else if(type===1) heartShape(x,y,color);
  else if(type===2) starShape(x,y,color);
  else flowerShape(x,y,color);
}

function circleShape(x,y,color){
  const count=100;
  for(let i=0;i<count;i++){
    const angle=(Math.PI*2/count)*i;
    const speed=3+Math.random()*2;
    particles.push(new Particle(
      x,y,
      Math.cos(angle)*speed,
      Math.sin(angle)*speed,
      color
    ));
  }
}

function heartShape(x,y,color){
  for(let t=0;t<Math.PI*2;t+=0.05){
    const hx=16*Math.pow(Math.sin(t),3);
    const hy=13*Math.cos(t)
            -5*Math.cos(2*t)
            -2*Math.cos(3*t)
            -Math.cos(4*t);
    particles.push(new Particle(
      x,y,
      hx*0.25,
      -hy*0.25,
      color
    ));
  }
}

function starShape(x,y,color){
  const spikes=5;
  const outer=5;
  const inner=2.5;
  for(let i=0;i<spikes*2;i++){
    const r=i%2===0?outer:inner;
    const angle=(Math.PI*i)/spikes;
    particles.push(new Particle(
      x,y,
      Math.cos(angle)*r,
      Math.sin(angle)*r,
      color
    ));
  }
}

function flowerShape(x,y,color){
  const petals=8;
  for(let i=0;i<petals;i++){
    const angle=(Math.PI*2/petals)*i;
    for(let r=0;r<4;r++){
      particles.push(new Particle(
        x,y,
        Math.cos(angle)*(r+1)*1.5,
        Math.sin(angle)*(r+1)*1.5,
        color
      ));
    }
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  if(Math.random()<0.05){
    explode(
      Math.random()*canvas.width,
      Math.random()*canvas.height*0.6
    );
  }

  particles.forEach((p,i)=>{
    p.update();
    p.draw();
    if(p.life<=0) particles.splice(i,1);
  });

  requestAnimationFrame(animate);
}

animate();
