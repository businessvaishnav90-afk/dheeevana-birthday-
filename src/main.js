import './style.css';
import { voiceNotesConfig } from './voiceNotesConfig.js';
import { myMessagesConfig } from './myMessagesConfig.js';

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

  // --- Main Voices Section Logic ---
  const mainVoicesContainer = document.getElementById('main-voices-container');
  
  if (mainVoicesContainer) {
    // Generate cards dynamically from config
    mainVoicesContainer.innerHTML = voiceNotesConfig.map((note, index) => `
      <div class="audio-card glass fade-in" style="transition-delay: ${(index % 10) * 0.1}s">
        <h3 class="audio-title">${note.title}</h3>
        <div class="audio-controls">
          <button class="audio-play-btn main-play-btn" data-id="voice-${note.id}"><i class="fas fa-play"></i></button>
          <input type="range" class="audio-progress main-progress" data-id="voice-${note.id}" value="0" min="0" max="100" step="0.1">
          <span class="audio-time main-time" data-id="voice-${note.id}">0:00 / 0:00</span>
        </div>
        <p class="audio-caption" style="color: var(--text-secondary); font-size: 0.9rem; margin-top: -0.5rem; font-style: italic;">${note.caption}</p>
        <audio id="voice-${note.id}" src="${note.file}" preload="metadata"></audio>
      </div>
    `).join('');

    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const mainCards = mainVoicesContainer.querySelectorAll('.audio-card');
    
    mainCards.forEach(card => {
      const playBtn = card.querySelector('.main-play-btn');
      const progressBar = card.querySelector('.main-progress');
      const timeDisplay = card.querySelector('.main-time');
      const audio = document.getElementById(playBtn.dataset.id);
      
      const setMetadata = () => {
        if (!isNaN(audio.duration)) {
          progressBar.max = audio.duration;
          timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
        }
      };

      if (audio.readyState >= 1) {
        setMetadata();
      } else {
        audio.addEventListener('loadedmetadata', setMetadata);
      }

      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          // Pause all other audios globally
          const globalAudios = document.querySelectorAll('audio:not(#bg-music)');
          globalAudios.forEach(a => {
            if (a !== audio && !a.paused) {
              a.pause();
              let btn = document.querySelector(`.main-play-btn[data-id="${a.id}"]`) || 
                        document.querySelector(`.dynamic-play-btn[data-id="${a.id}"]`) ||
                        document.querySelector(`.my-msg-play-btn[data-id="${a.id}"]`);
              if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
            }
          });
          
          if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            updatePlayIcon();
          }

          audio.play();
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          audio.pause();
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      });

      audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        if (audio.currentTime >= audio.duration) {
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
          progressBar.value = 0;
        }
      });

      progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
      });
    });
  }

  // --- A Message From Me Section Logic ---
  const myMessagesContainer = document.getElementById('my-messages-container');
  
  if (myMessagesContainer) {
    myMessagesContainer.innerHTML = myMessagesConfig.map((msg, index) => `
      <div class="audio-card glass fade-in" style="transition-delay: ${(index % 10) * 0.1}s">
        <h3 class="audio-title">${msg.title}</h3>
        <p class="audio-caption" style="color: var(--text-secondary); font-size: 0.9rem; margin-top: -0.5rem; margin-bottom: 1rem; font-style: italic;">${msg.subtitle}</p>
        <div class="audio-controls">
          <button class="audio-play-btn my-msg-play-btn" data-id="my-msg-${msg.id}"><i class="fas fa-play"></i></button>
          <input type="range" class="audio-progress my-msg-progress" data-id="my-msg-${msg.id}" value="0" min="0" max="100" step="0.1">
          <span class="audio-time my-msg-time" data-id="my-msg-${msg.id}">0:00 / 0:00</span>
        </div>
        <audio id="my-msg-${msg.id}" src="${msg.file}" preload="metadata"></audio>
      </div>
    `).join('');

    const formatTime = (seconds) => {
      if (isNaN(seconds)) return "0:00";
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const myMsgCards = myMessagesContainer.querySelectorAll('.audio-card');
    
    myMsgCards.forEach(card => {
      const playBtn = card.querySelector('.my-msg-play-btn');
      const progressBar = card.querySelector('.my-msg-progress');
      const timeDisplay = card.querySelector('.my-msg-time');
      const audio = document.getElementById(playBtn.dataset.id);
      
      const setMetadata = () => {
        if (!isNaN(audio.duration)) {
          progressBar.max = audio.duration;
          timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
        }
      };

      if (audio.readyState >= 1) {
        setMetadata();
      } else {
        audio.addEventListener('loadedmetadata', setMetadata);
      }

      playBtn.addEventListener('click', () => {
        if (audio.paused) {
          // Pause all other audios globally
          const globalAudios = document.querySelectorAll('audio:not(#bg-music)');
          globalAudios.forEach(a => {
            if (a !== audio && !a.paused) {
              a.pause();
              let btn = document.querySelector(`.main-play-btn[data-id="${a.id}"]`) || 
                        document.querySelector(`.dynamic-play-btn[data-id="${a.id}"]`) ||
                        document.querySelector(`.my-msg-play-btn[data-id="${a.id}"]`);
              if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
            }
          });
          
          if (isPlaying) {
            bgMusic.pause();
            isPlaying = false;
            updatePlayIcon();
          }

          audio.play();
          playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
          audio.pause();
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
      });

      audio.addEventListener('timeupdate', () => {
        progressBar.value = audio.currentTime;
        timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
        if (audio.currentTime >= audio.duration) {
          playBtn.innerHTML = '<i class="fas fa-play"></i>';
          progressBar.value = 0;
        }
      });

      progressBar.addEventListener('input', () => {
        audio.currentTime = progressBar.value;
      });
    });
  }

  // --- Hidden Surprise Section Logic ---
  const unlockBtn = document.getElementById('unlock-old-dheeevana-btn');
  const hiddenSection = document.getElementById('old-dheeevana-section');
  const voiceNotesContainer = document.getElementById('voice-notes-container');

  if (unlockBtn && hiddenSection && voiceNotesContainer) {
    unlockBtn.addEventListener('click', () => {
      unlockBtn.classList.add('hidden');
      hiddenSection.classList.remove('hidden');
      
      // Generate cards dynamically
      voiceNotesContainer.innerHTML = voiceNotesConfig.map((note, index) => `
        <div class="audio-card glass fade-in visible" style="transition-delay: ${(index % 10) * 0.1}s">
          <h3 class="audio-title">${note.title}</h3>
          <div class="audio-controls">
            <button class="audio-play-btn dynamic-play-btn" data-id="hidden-${note.id}"><i class="fas fa-play"></i></button>
            <input type="range" class="audio-progress dynamic-progress" data-id="hidden-${note.id}" value="0" min="0" max="100" step="0.1">
            <span class="audio-time dynamic-time" data-id="hidden-${note.id}">0:00 / 0:00</span>
          </div>
          <p class="audio-caption" style="color: var(--text-secondary); font-size: 0.9rem; margin-top: -0.5rem; font-style: italic;">${note.caption}</p>
          <audio id="hidden-${note.id}" src="${note.file}" preload="metadata"></audio>
        </div>
      `).join('');

      // Initialize dynamic audio logic
      const dynamicCards = voiceNotesContainer.querySelectorAll('.audio-card');
      
      dynamicCards.forEach(card => {
        const playBtn = card.querySelector('.dynamic-play-btn');
        const progressBar = card.querySelector('.dynamic-progress');
        const timeDisplay = card.querySelector('.dynamic-time');
        const audio = document.getElementById(playBtn.dataset.id);
        
        const setMetadata = () => {
          if (!isNaN(audio.duration)) {
            progressBar.max = audio.duration;
            timeDisplay.textContent = `0:00 / ${formatTime(audio.duration)}`;
          }
        };

        if (audio.readyState >= 1) {
          setMetadata();
        } else {
          audio.addEventListener('loadedmetadata', setMetadata);
        }

        playBtn.addEventListener('click', () => {
          if (audio.paused) {
            // Pause all other audios globally to prevent overlapping
            const globalAudios = document.querySelectorAll('audio:not(#bg-music)');
            globalAudios.forEach(a => {
              if (a !== audio && !a.paused) {
                a.pause();
                // Reset play button icon depending on which section it belongs to
                let btn;
                if (a.id.startsWith('hidden-')) {
                   btn = document.querySelector(`.dynamic-play-btn[data-id="${a.id}"]`);
                } else if (a.id.startsWith('voice-')) {
                   btn = document.querySelector(`.main-play-btn[data-id="${a.id}"]`);
                } else if (a.id.startsWith('my-msg-')) {
                   btn = document.querySelector(`.my-msg-play-btn[data-id="${a.id}"]`);
                }
                if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
              }
            });
            
            // Pause bg music
            if (isPlaying) {
              bgMusic.pause();
              isPlaying = false;
              updatePlayIcon();
            }

            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
          } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
          }
        });

        audio.addEventListener('timeupdate', () => {
          progressBar.value = audio.currentTime;
          timeDisplay.textContent = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
          if (audio.currentTime >= audio.duration) {
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            progressBar.value = 0;
          }
        });

        progressBar.addEventListener('input', () => {
          audio.currentTime = progressBar.value;
        });
      });
      
      // Fire confetti when unlocked
      fireConfetti();
    });
  }

});
