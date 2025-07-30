document.addEventListener('DOMContentLoaded', () => {
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

  // =================== Hero Slider ===================
  const slides = document.querySelectorAll('.slide');
  const navDots = document.querySelectorAll('.nav-dot');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    navDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
  }

  if (slides.length && navDots.length) {
    showSlide(currentSlide);
    slideInterval = setInterval(nextSlide, 3000);

    navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
        resetInterval();
      });
    });

    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
      heroSlider.addEventListener('mouseleave', resetInterval);
    }
  }

  // =================== Category Carousel ===================
  const categoryCarousel = document.querySelector(".category-carousel");
  const cards = document.querySelectorAll(".category-card");

  let activeIndex = 0;

  function updateTitle(index) {
    cards.forEach((card, i) => {
      const overlay = card.querySelector(".category-title-overlay");
      if (overlay) {
        overlay.classList.toggle("active", i === index);
      }
    });
  }

  function cycleCategory() {
    if (!cards.length) return;
    cards[activeIndex].classList.remove("active");
    activeIndex = (activeIndex + 1) % cards.length;
    cards[activeIndex].classList.add("active");
    cards[activeIndex].scrollIntoView({ behavior: "smooth", inline: "center" });
    updateTitle(activeIndex);
  }

  if (categoryCarousel && cards.length) {
    cards[activeIndex].classList.add("active");
    updateTitle(activeIndex);
    setInterval(cycleCategory, 3000);
  }

  // =================== Most Wanted Carousel ===================
  const carouselCards = document.querySelectorAll('.carousel-card');
  const navDotsContainer = document.getElementById('navDots');

  if (carouselCards.length > 0 && navDotsContainer) {
    let currentCard = 0;
    let autoSlideInterval;
    let hoveredCard = null;

    function setCarousel() {
      requestAnimationFrame(() => {
        carouselCards.forEach((card, i) => {
          const offset = i - currentCard;
          card.style.zIndex = -Math.abs(offset);

          let transform = "";
          let scale = 1;
          
          if (offset === 0) {
            card.classList.add('active');
            card.classList.remove('visible');
            scale = 1;
          } else if (Math.abs(offset) === 1) {
            card.classList.add('visible');
            card.classList.remove('active');
            scale = 0.85;
          } else {
            card.classList.remove('active');
            card.classList.remove('visible');
            scale = 0.75;
          }
          
          // Apply hover scaling if this card is being hovered
          if (hoveredCard === card) {
            if (offset === 0) {
              scale = 1.05; // Active card hover scale
            } else if (Math.abs(offset) === 1) {
              scale = 0.9; // Visible card hover scale
            }
          }
          
          transform = `translateX(${offset * 50}%) scale(${scale})`;
          card.style.transform = transform;
        });
        updateCarouselDots();
      });
    }

    function nextCarouselSlide() {
      currentCard = (currentCard + 1) % carouselCards.length;
      setCarousel();
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextCarouselSlide, 3000);
    }

    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    function createCarouselDots() {
      carouselCards.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.addEventListener('click', () => {
          currentCard = i;
          setCarousel();
        });
        navDotsContainer.appendChild(dot);
      });
    }

    function updateCarouselDots() {
      const dots = document.querySelectorAll('.dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCard);
      });
    }

    // Initialize carousel
    createCarouselDots();
    setCarousel();
    startAutoSlide();

    // Hover interactions for auto-slide
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
      carouselTrack.addEventListener('mouseenter', stopAutoSlide);
      carouselTrack.addEventListener('mouseleave', startAutoSlide);
    }

    // Add hover effects for individual cards
    carouselCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        hoveredCard = card;
        setCarousel(); // Recalculate with hover effect
      });
      
      card.addEventListener('mouseleave', () => {
        hoveredCard = null;
        setCarousel(); // Recalculate without hover effect
      });
      
      // Click to advance
      card.addEventListener('click', () => {
        nextCarouselSlide();
      });
    });
  }

  // =================== Back to Top Button ===================
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.pageYOffset > 300);
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // =================== Login Form ===================
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const togglePassword = document.getElementById("togglePassword");
    const successSound = document.getElementById("successSound");
    const rememberMeCheckbox = document.querySelector('.remember-forgot input');

    // This code is for reference if used in a standard web environment
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail && emailInput) {
      emailInput.value = savedEmail;
      rememberMeCheckbox.checked = true;
    }

    // Toggle password
    togglePassword?.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type");
      passwordInput.setAttribute("type", type === "password" ? "text" : "password");
      togglePassword.textContent = type === "password" ? "Hide" : "Show";
    });

    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
      let isValid = true;

      emailError.textContent = "";
      passwordError.textContent = "";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      if (password === "") {
        passwordError.textContent = "Password cannot be empty.";
        isValid = false;
      }

      if (isValid) {
        if (rememberMeCheckbox.checked) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }

        if (successSound) successSound.play();
        alert("✅ Login successful!");
        window.location.href = "web_index.html";
      }
    });
  }

  // =================== Signup Form ===================
  const signupForm = document.getElementById("signupForm");
  if (signupForm) {
    const usernameInput = document.getElementById("username");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const togglePassword = document.getElementById("togglePassword");
    const toggleConfirmPassword = document.getElementById("toggleConfirmPassword");
    const termsCheckbox = document.querySelector(".terms input");
    const successSound = document.getElementById("successSound");

    // Error fields
    const usernameError = document.getElementById("usernameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmPasswordError");
    const termsError = document.getElementById("termsError");

    // Toggle password visibility
    togglePassword?.addEventListener("click", () => {
      const type = passwordInput.getAttribute("type");
      passwordInput.setAttribute("type", type === "password" ? "text" : "password");
      togglePassword.textContent = type === "password" ? "Hide" : "Show";
    });

    toggleConfirmPassword?.addEventListener("click", () => {
      const type = confirmPasswordInput.getAttribute("type");
      confirmPasswordInput.setAttribute("type", type === "password" ? "text" : "password");
      toggleConfirmPassword.textContent = type === "password" ? "Hide" : "Show";
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Reset error messages
      usernameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      confirmPasswordError.textContent = "";
      termsError.textContent = "";

      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value;
      const confirmPassword = confirmPasswordInput.value;
      let isValid = true;

      // Username validation
      if (username === "") {
        usernameError.textContent = "Username cannot be empty.";
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address.";
        isValid = false;
      }

      // Password validation
      if (password.length < 6) {
        passwordError.textContent = "Password must be at least 6 characters.";
        isValid = false;
      }

      // Confirm password match
      if (password !== confirmPassword) {
        confirmPasswordError.textContent = "Passwords do not match.";
        isValid = false;
      }

      // Terms checkbox validation
      if (!termsCheckbox.checked) {
        termsError.textContent = "You must agree to the Terms & Conditions.";
        isValid = false;
      }

      // If everything is valid
      if (isValid) {
        if (successSound) successSound.play();

        // Show success message
        alert("🎉 Registration successful!");

        // Redirect or reset form
        window.location.href = "web_login.html";
      }
    });
  }
});

// =================== Contact Form Validation ===================
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.querySelector(".contact-left");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      const nameInput = contactForm.querySelector('input[name="name"]');
      const emailInput = contactForm.querySelector('input[name="email"]');
      const phoneInput = contactForm.querySelector('input[name="phone"]');
      const messageInput = contactForm.querySelector('textarea[name="message"]');

      let isValid = true;
      let errorMessage = "";

      // Reset previous styles
      [nameInput, emailInput, messageInput].forEach(input => {
        input.style.borderColor = "transparent";
      });

      // Name validation
      if (nameInput.value.trim() === "") {
        errorMessage += "❗ Name is required.\n";
        nameInput.style.borderColor = "#ff7e5f";
        isValid = false;
      }

      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        errorMessage += "❗ Please enter a valid email address.\n";
        emailInput.style.borderColor = "#ff7e5f";
        isValid = false;
      }

      // Phone number validation
      const phonePattern = /^[0-9]{10,15}$/; // Simple validation for 10–15 digits
      if (!phonePattern.test(phoneInput.value.trim())) {
        errorMessage += "❗ Enter a valid phone number (10–15 digits).\n";
        phoneInput.style.borderColor = "#ff7e5f";
        isValid = false;
      }

      // Message validation
      if (messageInput.value.trim().length < 10) {
        errorMessage += "❗ Message must be at least 10 characters.\n";
        messageInput.style.borderColor = "#ff7e5f";
        isValid = false;
      }

      if (!isValid) {
        e.preventDefault();
        alert(errorMessage);
      }
    });
  }
});

// =================== Team Carousel Functions ===================
const track = document.getElementById('team-carousel-track');
const cards = Array.from(track.children);
const dotsContainer = document.getElementById('team-nav-dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentIndex = 0;
let cardWidth = 360 + 40; // Fixed width + gap (matches your CSS)
let containerWidth = document.querySelector('.carousel-container').offsetWidth;

function initializeCarousel() {
  createDots();
  updateCarousel();
  
  // Event listeners
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  window.addEventListener('resize', handleResize);
}

function updateCarousel() {
  containerWidth = document.querySelector('.carousel-container').offsetWidth;
  const maxOffset = (cards.length - 1) * cardWidth;
  let offset = (containerWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
  
  // Adjust for last card
  if (-offset > maxOffset - (containerWidth / 2) + (cardWidth / 2)) {
    offset = -maxOffset + (containerWidth / 2) - (cardWidth / 2);
  }
  
  // Ensure we don't show empty space on the left for first card
  if (currentIndex === 0) {
    offset = Math.min(offset, (containerWidth / 2) - (cardWidth / 2));
  }
  
  track.style.transition = 'transform 0.5s ease';
  track.style.transform = `translateX(${offset}px)`;
  
  updateActiveClasses();
  updateDots();
}

function updateActiveClasses() {
  cards.forEach((card, index) => {
    card.classList.remove('center', 'side', 'hidden');
    
    if (index === currentIndex) {
      card.classList.add('center');
    } else if (Math.abs(index - currentIndex) === 1) {
      card.classList.add('side');
    } else {
      card.classList.add('hidden');
    }
  });
}

function prevSlide() {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
}

function nextSlide() {
  if (currentIndex < cards.length - 1) {
    currentIndex++;
    updateCarousel();
  }
}

function createDots() {
  dotsContainer.innerHTML = '';
  cards.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
      currentIndex = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });
}

function updateDots() {
  Array.from(dotsContainer.children).forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function handleResize() {
  containerWidth = document.querySelector('.carousel-container').offsetWidth;
  updateCarousel();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCarousel);

// =================== Footer Functions ===================
// These functions need to be outside the DOMContentLoaded event
// because they're called directly from HTML onclick attributes

document.querySelectorAll('.dropdown-toggle').forEach(button => {
  button.addEventListener('click', () => {
    const content = button.nextElementSibling;
    content.classList.toggle('show');
  });
});

function toggleDropdown(header) {
  const section = header.parentElement;
  const content = section.querySelector('.dropdown-content');

  section.classList.toggle('active');
  content.classList.toggle('active');
}