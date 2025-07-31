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
        
        // Image switching functionality
        function changeImage(newSrc) {
            document.getElementById('mainImage').src = newSrc;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.classList.remove('active');
            });
            event.target.closest('.thumbnail').classList.add('active');
        }

        // Size selector functionality
        document.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });

        // Collapsible sections
        function toggleCollapsible(header) {
            const content = header.nextElementSibling;
            const arrow = header.querySelector('span:last-child');
            
            if (content.classList.contains('active')) {
                content.classList.remove('active');
                arrow.textContent = '▼';
            } else {
                content.classList.add('active');
                arrow.textContent = '▲';
            }
        }

        // Add to cart functionality
        document.querySelector('.add-to-cart-btn').addEventListener('click', function() {
            const selectedSize = document.querySelector('.size-btn.active').textContent;
            alert(`Added Loose Fit Sweatshirt (Size ${selectedSize}) to cart!`);
        });

        // Wishlist functionality
        document.querySelector('.wishlist-btn').addEventListener('click', function() {
            this.style.background = this.style.background === 'rgb(255, 59, 48)' ? 'white' : '#ff3b30';
            this.style.color = this.style.color === 'white' ? '#000' : 'white';
        });

        // Product card hover effects
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });