// Minimalist text reveal
const offerText = "20% discount applied to your first order";
const offerElement = document.querySelector('.offer');

let charIndex = 0;
const typeWriter = () => {
  if (charIndex < offerText.length) {
    offerElement.textContent += offerText.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50);
  }
};

// Countdown with minimalist display
let countdown = 15;
const countdownEl = document.getElementById("countdown");
let redirectTimer;

const startCountdown = () => {
  redirectTimer = setInterval(() => {
    countdown--;
    countdownEl.textContent = countdown;
    if (countdown <= 0) {
      clearInterval(redirectTimer);
      window.location.href = "homepage.html";
    }
  }, 1000);
};

// Close button functionality
document.querySelector('.close-btn').addEventListener('click', () => {
  clearInterval(redirectTimer);
  document.getElementById('login-success-popup').style.display = 'none';
  window.location.href = "homepage.html";
});

// Continue button functionality
document.querySelector('.ok-btn').addEventListener('click', () => {
  clearInterval(redirectTimer);
  document.getElementById('login-success-popup').style.display = 'none';
  window.location.href = "homepage.html";
});

// Initialize
window.onload = () => {
  document.getElementById('login-success-popup').style.display = 'flex';
  setTimeout(typeWriter, 800); // Slight delay before typing starts
  startCountdown();
};