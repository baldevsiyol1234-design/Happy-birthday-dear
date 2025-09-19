// Slides & captions
const slides = document.querySelectorAll(".slideshow img");
const captionEl = document.getElementById("caption");

const captions = [
  "Your smile lights up my world ❤️",          // 1.jpg
  "Every moment with you is magical ✨",       // 2.jpg
  "You are my sunshine ☀️",                   // 3.jpg
  "Our love story is my favorite 📖",         // 4.jpg
  "You make my heart race 💓",                // 5.jpg
  "Your laughter is my favorite song 🎶",     // 6.jpg
  "Forever is only with you 🕊️",              // 7.jpg
  "I fall for you every day 💘",              // 8.jpg
  "You are my dream come true 🌸",            // 9.jpg
  "My safe place, my love 🏡",                // 10.jpg
  "Hand in hand, forever 💞",                 // 11.jpg
  "You make life beautiful 🌹",               // 12.jpg
  "You are my happy place 🌈",                // 13.jpg
  "The stars shine brighter with you 🌟",     // 14.jpg
  "You are my reason to smile 😊",            // 15.jpg
  "I cherish every moment with you ⏳",       // 16.jpg
  "Love grows stronger with time 💍",         // 17.jpg
  "You complete me 💕",                       // 18.jpg
  "Together forever, my love 💑",             // 19.jpg
  "Your eyes hold my universe 🌌",            // 20.jpg
  "You’re the best gift in my life 🎁",       // 21.jpg
  "Your touch is my comfort 🤗",              // 22.jpg
  "With you, I’m home 🏠",                    // 23.jpg
  "You’re my heartbeat 💖",                   // 24.jpg
  "You and me, always 💫",                    // 25.jpg
  "My endless love 💓",                       // 26.jpg
  "The best is yet to come 🌷",               // 27.jpg
  "You’re my one and only 💍",                // 28.jpg
  "Every day with you is special 🎉",         // 29.jpg
  "Happy Birthday, my love 💝"                // 30.jpg
];

let current = 0;
function showNext() {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
  captionEl.textContent = captions[current];
}
setInterval(showNext, 5000);
captionEl.textContent = captions[0];

// 🎉 Confetti effect
const confettiCanvas = document.getElementById("confetti");
const confettiCtx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confettiPieces = [];
for (let i = 0; i < 150; i++) {
  confettiPieces.push({
    x: Math.random() * confettiCanvas.width,
    y: Math.random() * confettiCanvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 150,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    tilt: Math.floor(Math.random() * 10) - 10
  });
}

function drawConfetti() {
  confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confettiPieces.forEach(p => {
    confettiCtx.beginPath();
    confettiCtx.fillStyle = p.color;
    confettiCtx.moveTo(p.x + p.tilt + p.r, p.y);
    confettiCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    confettiCtx.fill();
  });
  updateConfetti();
}

function updateConfetti() {
  confettiPieces.forEach(p => {
    p.y += Math.cos(p.d) + 1 + p.r / 2;
    p.x += Math.sin(p.d);
    if (p.y > confettiCanvas.height) {
      p.y = -10;
      p.x = Math.random() * confettiCanvas.width;
    }
  });
}
setInterval(drawConfetti, 20);
