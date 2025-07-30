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
            alert(`Added Loose Fit Hoodie (Size ${selectedSize}) to cart!`);
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