import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const startOverlay = document.getElementById('start-overlay');
  const startBtn = document.getElementById('start-celebration');
  const mainContent = document.getElementById('main-content');
  const bgMusic = document.getElementById('bg-music');
  const musicControls = document.getElementById('music-controls');
  const playBtn = document.getElementById('play-btn');
  const muteBtn = document.getElementById('mute-btn');
  const volumeSlider = document.getElementById('volume-slider');
  
  // Audio State
  let isPlaying = false;
  let isMuted = false;

  // Personal Message Data
  const personalMessage = `Thank you, Devana Pradeep, for being my friend.
One thing I want to say is that I really miss the Dheevana who used to talk in a funny and carefree way. Sometimes it feels like that Dheevana has become more formal now, but I will always cherish the version of you that made me smile and laugh.
No matter what changes, I will always value our friendship, and you can always come to me if there is any way I can help, even after years have passed or even if we are no longer friends. I say this because there are many reasons, far beyond the good luck you have brought into my life, some of which I will keep as a secret in my heart.
On your special day, I wish you happiness, success, peace, and countless beautiful moments ahead.
Happy Birthday, Dheevana.`;

  // Start Celebration
  startBtn.addEventListener('click', () => {
    startOverlay.style.opacity = '0';
    setTimeout(() => {
      startOverlay.classList.add('hidden');
      mainContent.classList.remove('hidden');
      musicControls.classList.remove('hidden');
      
      // Attempt to play music
      bgMusic.volume = 0.5;
      bgMusic.play().then(() => {
        isPlaying = true;
        updatePlayIcon();
      }).catch(e => console.log("Audio playback requires interaction.", e));
      
      // Trigger initial confetti
      fireConfetti();
      
      // Initialize observer after layout is ready
      initObserver();
    }, 1000);
  });

  // Audio Controls
  playBtn.addEventListener('click', () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
    isPlaying = !isPlaying;
    updatePlayIcon();
  });

  muteBtn.addEventListener('click', () => {
    isMuted = !isMuted;
    bgMusic.muted = isMuted;
    muteBtn.innerHTML = isMuted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
  });

  volumeSlider.addEventListener('input', (e) => {
    bgMusic.volume = e.target.value;
  });

  function updatePlayIcon() {
    playBtn.innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
  }

  // Scroll Animation Observer
  let typeWriterStarted = false;
  function initObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Trigger typewriter when message section is in view
          if (entry.target.querySelector('#typewriter-text') && !typeWriterStarted) {
            typeWriterStarted = true;
            typeWriterEffect(document.getElementById('typewriter-text'), personalMessage, 40);
          }
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  }

  // Typewriter Effect
  function typeWriterEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = '';
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }

  // Surprise Button
  const surpriseBtn = document.getElementById('open-surprise-btn');
  const surpriseContent = document.getElementById('surprise-content');
  
  surpriseBtn.addEventListener('click', () => {
    surpriseBtn.classList.add('hidden');
    surpriseContent.classList.remove('hidden');
    
    // Intense Confetti
    var duration = 3000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#d49a89', '#f6d1d8', '#ffffff']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#d49a89', '#f6d1d8', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  });

  // Particles Background
  function createParticles() {
    const container = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 15 + 5 + 'px';
      particle.style.width = size;
      particle.style.height = size;
      
      particle.style.left = Math.random() * 100 + 'vw';
      particle.style.animationDuration = Math.random() * 10 + 10 + 's';
      particle.style.animationDelay = Math.random() * 10 + 's';
      
      container.appendChild(particle);
    }
  }
  createParticles();

  // Basic Confetti
  function fireConfetti() {
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#d49a89', '#f6d1d8', '#ffffff']
    });
  }

  // Image Modal Logic
  const modal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const closeBtn = document.querySelector('.close-modal');
  
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      modalImg.src = img.src;
      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

});
