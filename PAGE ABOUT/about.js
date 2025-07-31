 // =================== Search Button ===================
const searchBtn = document.getElementById('searchBtn');
if (searchBtn) {
searchBtn.addEventListener('click', () => {
    alert('Search functionality coming soon!');
});
}

// ==================== HAMBURGER MENU FUNCTIONALITY ====================
// ==================== HAMBURGER MENU ====================
// Moved the function call right after its definition
function initializeHamburgerMenu() {
const hamburger = document.querySelector('.hamburger');
const bottomRow = document.querySelector('.bottom-row');
const body = document.body;

// Debugging: Log elements to console
console.log('Hamburger:', hamburger);
console.log('Bottom row:', bottomRow);

if (!hamburger || !bottomRow) {
    console.error('Hamburger menu elements not found!');
    return;
}

const toggleMenu = () => {
    console.log('Toggling menu'); // Debug log
    hamburger.classList.toggle('active');
    bottomRow.classList.toggle('active');
    body.classList.toggle('menu-open');
    
    if (!bottomRow.classList.contains('active')) {
    document.querySelectorAll('.nav-links li.active').forEach(item => {
        item.classList.remove('active');
    });
    }
};

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.querySelectorAll('.nav-links li').forEach(link => {
    if (link.querySelector('.dropdown')) {
    link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
        if (e.target === this.querySelector('a:first-child')) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.classList.toggle('active');
        document.querySelectorAll('.nav-links li').forEach(otherLink => {
            if (otherLink !== this) otherLink.classList.remove('active');
        });
        }
    });
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    if (!link.parentElement.querySelector('.dropdown')) {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
        toggleMenu();
        }
    });
    }
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.custom-header') && bottomRow.classList.contains('active')) {
    toggleMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
    hamburger.classList.remove('active');
    bottomRow.classList.remove('active');
    body.classList.remove('menu-open');
    document.querySelectorAll('.nav-links li.active').forEach(item => {
        item.classList.remove('active');
    });
    }
});
}

// ACTUALLY CALL THE FUNCTION
initializeHamburgerMenu();

// Carousel functionality for team section
class TeamCarousel {
  constructor() {
    this.track = document.getElementById('team-carousel-track');
    this.cards = Array.from(this.track.children);
    this.prevBtn = document.getElementById('prev-btn');
    this.nextBtn = document.getElementById('next-btn');
    this.dotsContainer = document.getElementById('team-nav-dots');
    this.currentIndex = 0;
    this.isAnimating = false;
    
    this.init();
  }

  init() {
    // Create dots
    this.createDots();
    
    // Set initial state
    this.updateCarousel(0, false);
    
    // Add event listeners
    this.addEventListeners();
    
    // Handle window resize
    window.addEventListener('resize', this.debounce(() => {
      this.updateCarousel(this.currentIndex, false);
    }, 250));
    
    // Add touch/swipe support
    this.addTouchSupport();
  }

  createDots() {
    this.dotsContainer.innerHTML = '';
    this.cards.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
    this.dots = Array.from(this.dotsContainer.children);
  }

  addEventListeners() {
    this.prevBtn.addEventListener('click', () => this.previousSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Add click to cards for navigation
    this.cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        if (index !== this.currentIndex) {
          this.goToSlide(index);
        }
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.previousSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
  }

  addTouchSupport() {
    let startX = 0;
    let endX = 0;
    let startY = 0;
    let endY = 0;

    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.track.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent scrolling
    });

    this.track.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      endY = e.changedTouches[0].clientY;
      
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Only trigger if horizontal swipe is more significant than vertical
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    });
  }

  calculateTransform(index) {
    const cardWidth = this.cards[0].offsetWidth + parseInt(getComputedStyle(this.cards[0]).marginLeft) + parseInt(getComputedStyle(this.cards[0]).marginRight);
    const containerWidth = this.track.parentElement.offsetWidth;
    const centerOffset = containerWidth / 2 - cardWidth / 2;
    
    return centerOffset - (index * cardWidth);
  }

  updateCarousel(index, animate = true) {
    if (this.isAnimating && animate) return;
    
    this.isAnimating = true;
    this.currentIndex = index;

    // Calculate transform to center the active card
    const translateX = this.calculateTransform(index);
    
    // Apply transform
    if (animate) {
      this.track.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      this.track.style.transition = 'none';
    }
    
    this.track.style.transform = `translateX(${translateX}px)`;

    // Update card states
    this.updateCardStates(index);
    
    // Update dots
    this.updateDots(index);

    // Reset animation flag
    setTimeout(() => {
      this.isAnimating = false;
    }, animate ? 600 : 0);
  }

  updateCardStates(activeIndex) {
    this.cards.forEach((card, index) => {
      // Remove all state classes
      card.classList.remove('active', 'adjacent', 'far');
      
      if (index === activeIndex) {
        card.classList.add('active');
      } else if (Math.abs(index - activeIndex) === 1) {
        card.classList.add('adjacent');
      } else {
        card.classList.add('far');
      }
    });
  }

  updateDots(activeIndex) {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.cards.length || index === this.currentIndex) return;
    this.updateCarousel(index);
  }

  nextSlide() {
    const nextIndex = (this.currentIndex + 1) % this.cards.length;
    this.goToSlide(nextIndex);
  }

  previousSlide() {
    const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
    this.goToSlide(prevIndex);
  }

  // Utility function for debouncing
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Auto-play functionality (optional)
class AutoPlay {
  constructor(carousel, interval = 5000) {
    this.carousel = carousel;
    this.interval = interval;
    this.autoPlayTimer = null;
    this.isPlaying = false;
    
    this.init();
  }

  init() {
    // Start autoplay
    this.start();
    
    // Pause on hover
    this.carousel.track.addEventListener('mouseenter', () => this.pause());
    this.carousel.track.addEventListener('mouseleave', () => this.start());
    
    // Pause on focus (accessibility)
    this.carousel.track.addEventListener('focusin', () => this.pause());
    this.carousel.track.addEventListener('focusout', () => this.start());
    
    // Pause when user interacts
    this.carousel.prevBtn.addEventListener('click', () => this.pause());
    this.carousel.nextBtn.addEventListener('click', () => this.pause());
    
    // Pause on visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pause();
      } else {
        this.start();
      }
    });
  }

  start() {
    if (this.isPlaying) return;
    
    this.isPlaying = true;
    this.autoPlayTimer = setInterval(() => {
      this.carousel.nextSlide();
    }, this.interval);
  }

  pause() {
    if (!this.isPlaying) return;
    
    this.isPlaying = false;
    clearInterval(this.autoPlayTimer);
  }

  stop() {
    this.pause();
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const carousel = new TeamCarousel();
});

// Intersection Observer for performance
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const carouselObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Carousel is visible, ensure it's properly initialized
      const carousel = entry.target.querySelector('.carousel-track');
      if (carousel && !carousel.dataset.initialized) {
        carousel.dataset.initialized = 'true';
        // Re-initialize if needed
      }
    }
  });
}, observerOptions);

// Observe the carousel container
document.addEventListener('DOMContentLoaded', () => {
  const carouselContainer = document.querySelector('.carousel-container');
  if (carouselContainer) {
    carouselObserver.observe(carouselContainer);
  }
});