document.addEventListener('DOMContentLoaded', () => {
    // =================== Search Button ===================
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            alert('Search functionality coming soon!');
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

    // =================== Cart Page ===================
    // Sample cart data with more realistic fashion items
    const cartData = [
        {
            id: 1,
            name: "KRTKL Jersey AKU",
            type: "Jersey",
            color: "Black",
            size: "M",
            price: 89,
            quantity: 1,
            stock: 12,
            image: "../Products/KRTKL/KRTKL_Jersey AKU back.webp"
        },
        {
            id: 2,
            name: "OPT Hoodie Rodeo",
            type: "Hoodie",
            color: "Black",
            size: "L",
            price: 65,
            quantity: 2,
            stock: 8,
            image: "../Products/OPT/OPT_Hoodie Rodeo black back.png.webp"
        },
        {
            id: 3,
            name: "STONED Jeans Black",
            type: "Jeans",
            color: "Black",
            size: "36",
            price: 55,
            quantity: 1,
            stock: 15,
            image: "../STONED/BOTTOM/14.1_49de332d-df40-4c14-8056-65f69fdf3f1d_900x.webp"
        },
        {
            id: 4,
            name: "OPT Hoodie Rodeo Grey",
            type: "Hoodie",
            color: "Grey",
            size: "M",
            price: 90,
            quantity: 3,
            stock: 20,
            image: "../Products/OPT/OPT_Hoodie Rodeo grey front.webp"
        },
        {
            id: 5,
            name: "STUSSY Thermal Basic",
            type: "T-Shirt",
            color: "Camo",
            size: "L",
            price: 125,
            quantity: 1,
            stock: 6,
            image: "../Products/STUSSY/STUSSY_thermal basic camo front.webp"
        },
        {
            id: 6,
            name: "SVG Longsleeve White",
            type: "Longsleeve",
            color: "White",
            size: "M",
            price: 70,
            quantity: 1,
            stock: 10,
            image: "../Products/SVG/SVG_Longsleeve white front.webp"
        },
        {
            id: 7,
            name: "OPT Cap Brown",
            type: "Accessory",
            color: "Brown",
            size: "One Size",
            price: 35,
            quantity: 1,
            stock: 4,
            image: "../Products/OPT/OPT_CapBrown.webp"
        }
    ];

    let appliedVoucher = null;
    let voucherDiscount = 0;

    // Voucher codes and their benefits
    const vouchers = {
        'SAVE10': { type: 'percentage', value: 10, minAmount: 100 },
        'WELCOME20': { type: 'fixed', value: 20, minAmount: 150 },
        'FREESHIP': { type: 'shipping', value: 50, minAmount: 0 },
        'STUDENT15': { type: 'percentage', value: 15, minAmount: 80 }
    };

    // Generate random delivery date (7-14 days from now)
    function generateDeliveryDate() {
        const today = new Date();
        const minDays = 7;
        const maxDays = 14;
        const randomDays = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
        const deliveryDate = new Date(today.getTime() + (randomDays * 24 * 60 * 60 * 1000));
        
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        
        return deliveryDate.toLocaleDateString('en-US', options);
    }

    // Initialize the page
    function init() {
        console.log('Initializing cart with', cartData.length, 'items');
        renderCartItems();
        updateSummary();
        setupEventListeners();
        document.getElementById('delivery-date').textContent = generateDeliveryDate();
    }

    // Render cart items
    function renderCartItems() {
        console.log('Rendering cart items:', cartData);
        const cartItemsContainer = document.getElementById('cart-items');
        
        if (!cartItemsContainer) {
            console.error('Cart items container not found!');
            return;
        }
        
        cartItemsContainer.innerHTML = '';

        if (cartData.length === 0) {
            cartItemsContainer.innerHTML = '<div style="text-align: center; padding: 2rem; color: var(--lighter-gray);">Your cart is empty</div>';
            return;
        }

        cartData.forEach((item, index) => {
            console.log('Rendering item:', item);
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <input type="checkbox" class="item-checkbox" data-id="${item.id}" checked>
                <img src="${item.image}" alt="${item.name}" class="item-image" onerror="this.src='https://via.placeholder.com/100x100/404040/ffffff?text=IMG'">
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <div class="item-specs">
                        <div class="spec-row">
                            <span><strong>Type:</strong> ${item.type}</span>
                            <span><strong>Color:</strong> ${item.color}</span>
                        </div>
                        <div class="spec-row">
                            <span><strong>Size:</strong> ${item.size}</span>
                        </div>
                        <div class="stock-info">
                            <i class="fas fa-check-circle"></i> ${item.stock} in stock
                        </div>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" min="1" max="${item.stock}" data-id="${item.id}">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)" ${item.quantity >= item.stock ? 'disabled' : ''}>+</button>
                </div>
                <div class="item-price">
                    <div class="price-current">${(item.price * item.quantity).toFixed(2)}</div>
                    <div class="price-per-unit">${item.price.toFixed(2)} each</div>
                </div>
                <div class="item-actions">
                    <button class="action-btn remove-btn" onclick="removeItem(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </button>
                    <button class="action-btn favorite-btn" onclick="moveToFavorite(${item.id})">
                        <i class="fas fa-heart"></i> Favorite
                    </button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        updateCartCount();
        console.log('Finished rendering', cartData.length, 'items');
    }

    // Make updateQuantity globally accessible
    window.updateQuantity = function (id, change) {
        const item = cartData.find(item => item.id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity >= 1 && newQuantity <= item.stock) {
                item.quantity = newQuantity;
                renderCartItems();
                updateSummary();
            }
        }
    };

    // Confirm before removing item
    window.removeItem = function (id) {
        const item = cartData.find(item => item.id === id);
        if (item && confirm(`Are you sure you want to remove "${item.name}" from the cart?`)) {
            const index = cartData.findIndex(item => item.id === id);
            if (index > -1) {
                cartData.splice(index, 1);
                renderCartItems();
                updateSummary();
            }
        }
    };

    // Confirm before moving to favorite
    window.moveToFavorite = function (id) {
        const item = cartData.find(item => item.id === id);
        if (item && confirm(`Move "${item.name}" to favorites?`)) {
            alert(`"${item.name}" has been added to your favorites!`);
        }
    };

    // Update cart count
    function updateCartCount() {
        const count = cartData.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }

    // Update summary
    function updateSummary() {
        const selectedItems = getSelectedItems();
        const productAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);
        const shippingCharge = appliedVoucher && appliedVoucher.type === 'shipping' ? 0 : 50;
        
        let discount = 0;
        if (appliedVoucher) {
            if (appliedVoucher.type === 'percentage') {
                discount = (productAmount * appliedVoucher.value) / 100;
            } else if (appliedVoucher.type === 'fixed') {
                discount = appliedVoucher.value;
            } else if (appliedVoucher.type === 'shipping') {
                discount = 50; // shipping cost
            }
        }

        const totalAmount = productAmount + shippingCharge - discount;

        document.getElementById('product-amount').textContent = `RM${productAmount.toFixed(2)}`;
        document.getElementById('shipping-charge').textContent = `RM${shippingCharge.toFixed(2)}`;
        document.getElementById('discount-amount').textContent = `-RM${discount.toFixed(2)}`;
        document.getElementById('total-amount').textContent = `RM${totalAmount.toFixed(2)}`;

        // Enable/disable checkout button
        const checkoutBtn = document.getElementById('checkout-btn');
        checkoutBtn.disabled = selectedItems.length === 0;
    }

    // Get selected items
    function getSelectedItems() {
        const checkboxes = document.querySelectorAll('.item-checkbox:not(#select-all)');
        const selectedIds = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => parseInt(cb.dataset.id));
        
        return cartData.filter(item => selectedIds.includes(item.id));
    }

    // Setup event listeners
    function setupEventListeners() {
        // Select all checkbox
        document.getElementById('select-all').addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.item-checkbox:not(#select-all)');
            checkboxes.forEach(cb => cb.checked = this.checked);
            updateSummary();
        });

        // Individual checkboxes
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('item-checkbox') && e.target.id !== 'select-all') {
                updateSummary();
                
                // Update select all checkbox
                const allCheckboxes = document.querySelectorAll('.item-checkbox:not(#select-all)');
                const checkedCheckboxes = document.querySelectorAll('.item-checkbox:not(#select-all):checked');
                document.getElementById('select-all').checked = allCheckboxes.length === checkedCheckboxes.length;
            }
        });

        // Quantity input changes
        document.addEventListener('change', function(e) {
            if (e.target.classList.contains('qty-input')) {
                const id = parseInt(e.target.dataset.id);
                const newQuantity = parseInt(e.target.value);
                const item = cartData.find(item => item.id === id);
                
                if (item && newQuantity >= 1 && newQuantity <= item.stock) {
                    item.quantity = newQuantity;
                    renderCartItems();
                    updateSummary();
                } else {
                    e.target.value = item.quantity; // Reset to previous value
                }
            }
        });

        // Voucher dropdown
        document.getElementById('voucher-dropdown').addEventListener('change', function() {
            if (this.value) {
                document.getElementById('voucher-code').value = this.value;
            }
        });

        // Apply voucher button
        document.getElementById('apply-voucher').addEventListener('click', applyVoucher);

        // Voucher code input (Enter key)
        document.getElementById('voucher-code').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                applyVoucher();
            }
        });

        // Checkout button
        document.getElementById('checkout-btn').addEventListener('click', function() {
            const selectedItems = getSelectedItems();
            if (selectedItems.length > 0) {
                alert(`Proceeding to checkout with ${selectedItems.length} items!`);
            }
        });
    }

    // Apply voucher
    function applyVoucher() {
        const code = document.getElementById('voucher-code').value.trim().toUpperCase();
        const statusDiv = document.getElementById('voucher-status');
        
        if (!code) {
            showVoucherStatus('Please enter a voucher code', false);
            return;
        }

        if (vouchers[code]) {
            const voucher = vouchers[code];
            const selectedItems = getSelectedItems();
            const productAmount = selectedItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            if (productAmount >= voucher.minAmount) {
                appliedVoucher = voucher;
                showVoucherStatus(`Voucher "${code}" applied successfully!`, true);
                updateSummary();
            } else {
                showVoucherStatus(`Minimum order amount of RM${voucher.minAmount} required for this voucher`, false);
            }
        } else {
            showVoucherStatus('Invalid voucher code. Please try again.', false);
        }
    }

    // Show voucher status
    function showVoucherStatus(message, success) {
        const statusDiv = document.getElementById('voucher-status');
        statusDiv.textContent = message;
        statusDiv.className = `voucher-status ${success ? 'status-success' : 'status-error'}`;
        statusDiv.style.display = 'block';

        // Hide status after 5 seconds
        setTimeout(() => {
            statusDiv.style.display = 'none';
        }, 5000);
    }

    init();
});

// =================== Footer Functions ===================
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