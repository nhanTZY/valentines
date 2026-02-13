// ================================
// ADVANCED PARTICLE GENERATION
// ================================
function createFloatingHearts() {
    const container = document.getElementById('heartsContainer');
    const heartCount = window.innerWidth <= 480 ? 10 : 15;
    const hearts = ['❤', '♥', '💕', '💖', '💗'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        
        const leftPosition = Math.random() * 100;
        const animationDuration = 15 + Math.random() * 20;
        const animationDelay = Math.random() * 15;
        const fontSize = 16 + Math.random() * 12;
        
        heart.style.left = `${leftPosition}%`;
        heart.style.fontSize = `${fontSize}px`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${animationDelay}s`;
        heart.style.color = `rgba(255, ${107 + Math.random() * 50}, ${157 + Math.random() * 50}, 0.6)`;
        
        container.appendChild(heart);
    }
}

function createParticles() {
    const container = document.getElementById('particlesContainer');
    const particleCount = window.innerWidth <= 480 ? 12 : 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = Math.random() > 0.5 ? 'particle' : 'sparkle';
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const tx = (Math.random() - 0.5) * 200;
        const ty = (Math.random() - 0.5) * 200;
        const duration = 10 + Math.random() * 15;
        const delay = Math.random() * 10;
        
        particle.style.left = `${startX}px`;
        particle.style.top = `${startY}px`;
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        container.appendChild(particle);
    }
}

function createFloatingActionHearts() {
    const container = document.getElementById('floatingHeartsLayer');
    const positions = [
        { top: '15%', left: '10%', delay: 0 },
        { top: '20%', left: '85%', delay: 1 },
        { top: '70%', left: '12%', delay: 2 },
        { top: '75%', left: '88%', delay: 1.5 },
        { top: '45%', left: '8%', delay: 0.5 },
        { top: '50%', left: '92%', delay: 2.5 }
    ];

    positions.forEach(pos => {
        const heart = document.createElement('div');
        heart.className = 'action-heart';
        heart.innerHTML = '♥';
        heart.style.top = pos.top;
        heart.style.left = pos.left;
        heart.style.animationDelay = `${pos.delay}s`;
        container.appendChild(heart);
    });
}

// ================================
// PREMIUM CURSOR TRAIL
// ================================
let lastHeartTime = 0;
const heartInterval = 120;

document.addEventListener('mousemove', function(e) {
    const now = Date.now();
    if (now - lastHeartTime < heartInterval) return;
    
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const rect = envelopeWrapper.getBoundingClientRect();
    
    if (!envelopeWrapper.classList.contains('opened') &&
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top && e.clientY <= rect.bottom) {
        
        const heart = document.createElement('div');
        heart.className = 'cursor-heart';
        const hearts = ['♥', '❤', '💕'];
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = e.clientX + (Math.random() - 0.5) * 10 + 'px';
        heart.style.top = e.clientY + (Math.random() - 0.5) * 10 + 'px';
        heart.style.color = `rgba(255, ${107 + Math.random() * 30}, ${157 + Math.random() * 30}, 0.8)`;
        
        document.body.appendChild(heart);
        lastHeartTime = now;
        
        setTimeout(() => heart.remove(), 1200);
    }
});

// ================================
// ENVELOPE INTERACTION
// ================================
const envelopeWrapper = document.getElementById('envelopeWrapper');
const letter = document.getElementById('letter');
const spotifyIframe = document.getElementById('spotifyIframe');
let isOpened = false;

function openEnvelope() {
    if (!isOpened) {
        envelopeWrapper.classList.add('opened');
        document.body.classList.add('letter-open');
        isOpened = true;
        
        // Multi-layered burst effects
        createPremiumBurst();
        createHeartExplosion();
        createSparkleRain();
        
        // Spotify autoplay after letter fully reveals
        setTimeout(() => {
            const currentSrc = spotifyIframe.src;
            if (!currentSrc.includes('autoplay=1')) {
                spotifyIframe.src = currentSrc + '&autoplay=1';
            }
        }, 1800);
    }
}

envelopeWrapper.addEventListener('click', openEnvelope);

envelopeWrapper.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openEnvelope();
    }
});

// ================================
// PREMIUM BURST EFFECTS
// ================================
function createPremiumBurst() {
    const container = document.getElementById('particlesContainer');
    const burstCount = 40;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '6px';
        particle.style.height = '6px';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        
        const angle = (Math.PI * 2 * i) / burstCount;
        const distance = 100 + Math.random() * 150;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.background = `radial-gradient(circle, rgba(255, ${107 + Math.random() * 50}, ${157 + Math.random() * 50}, 0.9), transparent)`;
        particle.style.boxShadow = `0 0 10px rgba(255, 107, 157, 0.8)`;
        particle.style.animation = `burstParticle 2s ease-out forwards`;
        particle.style.setProperty('--burst-tx', `${tx}px`);
        particle.style.setProperty('--burst-ty', `${ty}px`);
        
        container.appendChild(particle);
        setTimeout(() => particle.remove(), 2000);
    }
}

function createHeartExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const hearts = ['❤', '♥', '💕', '💖', '💗', '💓'];
    
    for (let i = 0; i < 25; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = (18 + Math.random() * 12) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '9999';
        heart.style.color = `rgba(255, ${107 + Math.random() * 50}, ${157 + Math.random() * 50}, 0.9)`;
        heart.style.filter = `drop-shadow(0 0 8px rgba(255, 107, 157, 0.6))`;
        
        const angle = (Math.PI * 2 * i) / 25;
        const distance = 120 + Math.random() * 180;
        
        heart.style.animation = `heartExplosion 2.5s ease-out forwards`;
        heart.style.setProperty('--heart-tx', `${Math.cos(angle) * distance}px`);
        heart.style.setProperty('--heart-ty', `${Math.sin(angle) * distance}px`);
        heart.style.setProperty('--heart-rotate', `${Math.random() * 720 - 360}deg`);
        
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2500);
    }
}

function createSparkleRain() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.borderRadius = '50%';
            sparkle.style.left = (centerX - 200 + Math.random() * 400) + 'px';
            sparkle.style.top = (centerY - 100) + 'px';
            sparkle.style.background = 'radial-gradient(circle, rgba(255, 255, 255, 0.9), rgba(255, 192, 203, 0.6))';
            sparkle.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.9)';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '9999';
            sparkle.style.animation = 'sparkleRain 2s ease-out forwards';
            
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 2000);
        }, i * 20);
    }
}

// CSS animations for effects
const style = document.createElement('style');
style.textContent = `
    @keyframes burstParticle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--burst-tx), var(--burst-ty)) scale(0);
            opacity: 0;
        }
    }
    
    @keyframes heartExplosion {
        0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translate(var(--heart-tx), var(--heart-ty)) scale(0.4) rotate(var(--heart-rotate));
            opacity: 0;
        }
    }
    
    @keyframes sparkleRain {
        0% {
            transform: translateY(0) scale(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translateY(50px) scale(1);
        }
        100% {
            transform: translateY(400px) scale(0.2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// INITIALIZE
// ================================
window.addEventListener('DOMContentLoaded', function() {
    createFloatingHearts();
    createParticles();
    createFloatingActionHearts();
});

// Responsive regeneration
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        const particlesContainer = document.getElementById('particlesContainer');
        const heartsContainer = document.getElementById('heartsContainer');
        
        particlesContainer.innerHTML = '';
        heartsContainer.innerHTML = '';
        
        createParticles();
        createFloatingHearts();
    }, 300);
});
