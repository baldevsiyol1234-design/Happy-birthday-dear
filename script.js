const TOTAL = 30;
const RADIUS = 420; // radius for circle placement in px
const carousel = document.getElementById('carousel');
const captions = ['A memory to cherish — line 1','A memory to cherish — line 2','A memory to cherish — line 3','A memory to cherish — line 4','A memory to cherish — line 5','A memory to cherish — line 6','A memory to cherish — line 7','A memory to cherish — line 8','A memory to cherish — line 9','A memory to cherish — line 10','A memory to cherish — line 11','A memory to cherish — line 12','A memory to cherish — line 13','A memory to cherish — line 14','A memory to cherish — line 15','A memory to cherish — line 16','A memory to cherish — line 17','A memory to cherish — line 18','A memory to cherish — line 19','A memory to cherish — line 20','A memory to cherish — line 21','A memory to cherish — line 22','A memory to cherish — line 23','A memory to cherish — line 24','A memory to cherish — line 25','A memory to cherish — line 26','A memory to cherish — line 27','A memory to cherish — line 28','A memory to cherish — line 29','A memory to cherish — line 30'];
const captionEl = document.getElementById('caption');
let angle = 0;
let currentIndex = 0;

// create items
for(let i=0;i<TOTAL;i++){
  const item = document.createElement('div');
  item.className = 'item';
  const img = document.createElement('img');
  img.src = 'images/' + (i+1) + '.jpg';
  img.alt = 'photo ' + (i+1);
  item.appendChild(img);
  carousel.appendChild(item);
}

// position items in a circle
function positionItems(){
  const items = carousel.children;
  const step = 360 / TOTAL;
  for(let i=0;i<items.length;i++){
    const a = (i * step + angle) * Math.PI / 180;
    const x = Math.cos(a) * RADIUS;
    const z = Math.sin(a) * RADIUS;
    items[i].style.transform = `translate3d(${x}px, -50%, ${-z}px) rotateY(${(i*step+angle)}deg)`;
    const depth = (z + RADIUS) / (2*RADIUS);
    items[i].style.opacity = 0.4 + 0.6 * depth;
    items[i].classList.remove('front');
  }
  // find front index (closest to viewer - max z)
  let front = 0; let maxZ = -Infinity;
  for(let i=0;i<items.length;i++){
    const deg = (i * (360/TOTAL) + angle) % 360;
    const a = deg * Math.PI/180;
    const z = Math.sin(a) * RADIUS;
    if(z > maxZ){ maxZ = z; front = i; }
  }
  items[front].classList.add('front');
  currentIndex = front;
  captionEl.textContent = captions[front];
}

positionItems();

// auto-rotate every 5 seconds
setInterval(()=>{
  angle -= 360 / TOTAL; // rotate so next photo comes front
  positionItems();
}, 5000);

// confetti on load
function launchConfetti(){
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const pieces = [];
  for(let i=0;i<120;i++) pieces.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height-200, vx:(Math.random()-0.5)*6, vy:Math.random()*4+2, r:4+Math.random()*8, color:['#ff6f91','#ffd1dc','#ff9aa2','#fff7f9'][Math.floor(Math.random()*4)]});
  let t=0;
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let p of pieces){
      p.x += p.vx; p.y += p.vy; p.vy += 0.05;
      ctx.fillStyle = p.color; ctx.beginPath(); ctx.ellipse(p.x,p.y,p.r,p.r,0,0,Math.PI*2); ctx.fill();
      if(p.y > canvas.height+50){ p.y = -10; p.x = Math.random()*canvas.width; p.vy = Math.random()*4+2; }
    }
    t++; if(t<300) requestAnimationFrame(draw);
  }
  draw();
}

// try autoplay audio on interaction
const audio = document.getElementById('bgAudio');
document.addEventListener('click', ()=>{ audio.play().catch(()=>{}); }, {once:true});
audio.play().catch(()=>{});

// start confetti shortly after load
window.addEventListener('load', ()=>{ setTimeout(launchConfetti, 600); positionItems(); });
