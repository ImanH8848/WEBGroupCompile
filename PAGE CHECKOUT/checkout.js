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

 // Simple calendar functionality
    document.addEventListener('DOMContentLoaded', function() {
        // Schedule delivery toggle
        const scheduleToggle = document.getElementById('scheduleToggle');
        const scheduleContent = document.getElementById('scheduleContent');

        if (scheduleToggle && scheduleContent) {
            scheduleToggle.addEventListener('click', function() {
                this.classList.toggle('active');
                scheduleContent.classList.toggle('active');
            });
        }

        // Calendar show/hide
        const dateInput = document.getElementById('dateInput');
        const calendarOverlay = document.getElementById('calendarOverlay');
        const applyDates = document.getElementById('applyDates');
        const clearDates = document.getElementById('clearDates');
        const dateDisplay = document.getElementById('dateDisplay');

        if (dateInput && calendarOverlay) {
            dateInput.addEventListener('click', function() {
                calendarOverlay.classList.add('active');
            });
        }

        // Close calendar when clicking overlay background
        if (calendarOverlay) {
            calendarOverlay.addEventListener('click', function(e) {
                if (e.target === calendarOverlay) {
                    calendarOverlay.classList.remove('active');
                }
            });
        }

        // Apply dates button
        if (applyDates && dateDisplay && calendarOverlay) {
            applyDates.addEventListener('click', function() {
                dateDisplay.textContent = '22 July 2025'; // Static date for demo
                calendarOverlay.classList.remove('active');
            });
        }

        // Clear dates button
        if (clearDates && dateDisplay) {
            clearDates.addEventListener('click', function() {
                dateDisplay.textContent = 'Select date range';
            });
        }

        // Simple day selection
        const calendarDays = document.querySelectorAll('.calendar-day:not(.other-month)');
        if (calendarDays.length > 0) {
            calendarDays.forEach(day => {
                day.addEventListener('click', function() {
                    // Remove selected class from all days
                    document.querySelectorAll('.calendar-day').forEach(d => {
                        d.classList.remove('selected');
                    });

                    // Add selected class to clicked day
                    this.classList.add('selected');
                });
            });
        }

        // Payment method selection with dropdown functionality
        document.querySelectorAll('.payment-option').forEach(option => {
            option.addEventListener('click', function(e) {
                // Prevent event bubbling from dropdown clicks
                if (e.target.closest('.payment-dropdown')) {
                    return;
                }

                // Remove selected class and hide all dropdowns
                document.querySelectorAll('.payment-option').forEach(opt => {
                    opt.classList.remove('selected');
                    const dropdown = opt.querySelector('.payment-dropdown');
                    if (dropdown) {
                        dropdown.classList.remove('active');
                    }
                });

                // Select current option
                this.classList.add('selected');
                const radioInput = this.querySelector('input[type="radio"]');
                if (radioInput) {
                    radioInput.checked = true;
                }

                // Show dropdown if it exists (not for COD)
                const dropdown = this.querySelector('.payment-dropdown');
                if (dropdown) {
                    dropdown.classList.add('active');
                }
            });
        });

        // Payment sub-option selection
        document.querySelectorAll('.payment-sub-option').forEach(subOption => {
            subOption.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent parent click event

                // Find the parent payment dropdown
                const parentDropdown = this.closest('.payment-dropdown');
                if (!parentDropdown) return;

                // Remove selected class from all sub-options in this dropdown
                parentDropdown.querySelectorAll('.payment-sub-option').forEach(opt => {
                    opt.classList.remove('selected');
                });

                // Add selected class to clicked sub-option
                this.classList.add('selected');

                // Update the main payment option label to show selection
                const paymentOption = this.closest('.payment-option');
                const label = paymentOption.querySelector('label');
                if (label) {
                    const originalText = label.textContent.split(' - ')[0]; // Get original text before any " - "
                    const selectedText = this.textContent.trim();

                    // Update label to show selection
                    label.textContent = `${originalText} - ${selectedText}`;
                }
            });
        });

        // Quantity controls
        document.querySelectorAll('.quantity-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const isIncrement = this.textContent === '+';
                const quantitySpan = isIncrement ?
                    this.previousElementSibling :
                    this.nextElementSibling;

                if (!quantitySpan) return;

                let quantity = parseInt(quantitySpan.textContent) || 0;
                if (isIncrement) {
                    quantity++;
                } else if (quantity > 1) {
                    quantity--;
                }

                quantitySpan.textContent = quantity.toString().padStart(2, '0');
            });
        });

        // Confirm order
        const confirmBtn = document.querySelector('.confirm-btn');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function() {
                alert('Order confirmed! Thank you for your purchase.');
            });
        }

        // Validation patterns
        const validationRules = {
            mobile: {
                required: true,
                pattern: /^(\+?60|0)[1-9][0-9]{7,9}$/,
                message: 'Please enter a valid mobile number (e.g., +60 12-345-6789)'
            },
            email: {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            zip: {
                required: true,
                pattern: /^[0-9]{5,10}$/,
                message: 'Please enter a 5-10 digit code'
            }
        };

        // Validate field function
        function validateField(field) {
            const fieldId = field.id;
            const formGroup = field.closest('.form-group');
            if (!formGroup) return true;

            const errorMessage = formGroup.querySelector('.error-message');
            
            // Only validate if the field has validation rules
            if (!validationRules[fieldId]) return true;

            const rules = validationRules[fieldId];
            let isValid = true;
            
            // Check required
            if (rules.required && !field.value.trim()) {
                if (errorMessage) errorMessage.textContent = 'This field is required';
                isValid = false;
            }
            // Check pattern
            else if (rules.pattern && !rules.pattern.test(field.value.trim())) {
                if (errorMessage) errorMessage.textContent = rules.message;
                isValid = false;
            }
            
            // Update UI
            if (!isValid) {
                formGroup.classList.add('error');
                formGroup.classList.remove('success');
                if (errorMessage) errorMessage.classList.add('show');
            } else {
                formGroup.classList.remove('error');
                formGroup.classList.add('success');
                if (errorMessage) errorMessage.classList.remove('show');
            }
            
            return isValid;
        }

        // Add validation on blur for mobile, email, and zip
        const mobileField = document.getElementById('mobile');
        if (mobileField) {
            mobileField.addEventListener('blur', function() {
                validateField(this);
            });
        }
        
        const emailField = document.getElementById('email');
        if (emailField) {
            emailField.addEventListener('blur', function() {
                validateField(this);
            });
        }
        
        const zipField = document.getElementById('zip');
        if (zipField) {
            zipField.addEventListener('blur', function() {
                validateField(this);
            });
        }

        // Simple validation for other required fields
        document.querySelectorAll('input, select, textarea').forEach(field => {
            if (!['mobile', 'email', 'zip'].includes(field.id)) {
                field.addEventListener('blur', function() {
                    const formGroup = this.closest('.form-group');
                    if (!formGroup) return;

                    const errorMessage = formGroup.querySelector('.error-message');
                    
                    if (!this.value && this.hasAttribute('required')) {
                        formGroup.classList.add('error');
                        if (errorMessage) {
                            errorMessage.textContent = 'This field is required';
                            errorMessage.classList.add('show');
                        }
                    } else {
                        formGroup.classList.remove('error');
                        if (errorMessage) errorMessage.classList.remove('show');
                        if (this.value) {
                            formGroup.classList.add('success');
                        } else {
                            formGroup.classList.remove('success');
                        }
                    }
                });
            }
        });
    });