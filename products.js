// Default products data (fallback)
const defaultProducts = [
    {
        id: 1,
        name: "सरसों का तेल",
        description: "शुद्ध कोल्ड प्रेस्ड सरसों का तेल",
        price: 180,
        unit: "लीटर",
        image: "images/mustard-oil.jpg",
        fallbackImage: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=300&fit=crop&q=80",
        features: ["कोल्ड प्रेस्ड", "100% शुद्ध", "प्राकृतिक", "बिना रसायन"],
        badge: "बेस्ट सेलर"
    },
    {
        id: 2,
        name: "अलसी का तेल",
        description: "प्रीमियम क्वालिटी अलसी का तेल",
        price: 220,
        unit: "लीटर",
        image: "images/linseed-oil.jpg",
        features: ["ओमेगा-3 भरपूर", "हृदय के लिए अच्छा", "प्राकृतिक", "ताजा निकाला गया"],
        badge: "प्रीमियम"
    },
    {
        id: 3,
        name: "गेहूं का आटा",
        description: "ताजा पिसा हुआ साबुत गेहूं का आटा",
        price: 45,
        unit: "किलो",
        image: "images/wheat-flour.jpg",
        features: ["साबुत गेहूं", "ताजा पिसा", "फाइबर युक्त", "पोषक तत्वों से भरपूर"],
        badge: "ताजा"
    },
    {
        id: 4,
        name: "मैदा",
        description: "उच्च गुणवत्ता का रिफाइंड आटा",
        price: 40,
        unit: "किलो",
        image: "images/maida.jpg",
        features: ["महीन पिसा", "सफेद रंग", "बेकिंग के लिए आदर्श", "लंबी शेल्फ लाइफ"],
        badge: "क्वालिटी"
    },
    {
        id: 5,
        name: "हल्दी पाउडर",
        description: "शुद्ध पिसी हुई हल्दी",
        price: 120,
        unit: "किलो",
        image: "images/turmeric-powder.jpg",
        features: ["100% शुद्ध", "तेज रंग", "औषधीय गुण", "ताजी पिसी"],
        badge: "ऑर्गेनिक"
    },
    {
        id: 6,
        name: "धनिया पाउडर",
        description: "ताजा पिसा धनिया पाउडर",
        price: 100,
        unit: "किलो",
        image: "images/coriander-powder.jpg",
        features: ["सुगंधित", "ताजा पिसा", "प्राकृतिक स्वाद", "बिना मिलावट"],
        badge: "ताजा"
    },
    {
        id: 7,
        name: "मिर्च पाउडर",
        description: "तेज लाल मिर्च का पाउडर",
        price: 150,
        unit: "किलो",
        image: "images/chili-powder.jpg",
        features: ["तेज स्वाद", "चटक लाल रंग", "शुद्ध मिर्च", "लंबे समय तक ताजा"],
        badge: "स्पाइसी"
    }
];

// Load products from admin panel or use defaults
let products = loadProductsFromAdmin();

// Shopping cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    updateCartUI();
    setupEventListeners();
    setupAdminSync(); // Add admin sync functionality
});

// Load products from admin panel or use defaults
function loadProductsFromAdmin() {
    try {
        // First check if admin has updated products
        const adminProducts = localStorage.getItem('adminProducts');
        if (adminProducts) {
            const parsedProducts = JSON.parse(adminProducts);
            console.log('✅ Products loaded from admin panel:', parsedProducts.length);
            return parsedProducts;
        }
        
        // Fallback to default products
        console.log('📦 Using default products');
        return defaultProducts;
    } catch (error) {
        console.error('Error loading products from admin:', error);
        return defaultProducts;
    }
}

// Setup admin synchronization
function setupAdminSync() {
    // Add admin sync indicator to the page
    const syncIndicator = document.createElement('div');
    syncIndicator.className = 'admin-sync-indicator';
    syncIndicator.innerHTML = `
        <i class="fas fa-sync-alt"></i>
        <span>Admin Panel Connected</span>
    `;
    document.body.appendChild(syncIndicator);
    
    // Show indicator briefly on page load
    setTimeout(() => {
        syncIndicator.classList.add('active');
        setTimeout(() => {
            syncIndicator.classList.remove('active');
        }, 3000);
    }, 1000);
    
    // Listen for storage changes (when admin panel updates data)
    window.addEventListener('storage', function(e) {
        if (e.key === 'adminProducts') {
            console.log('🔄 Admin updated products, refreshing...');
            products = loadProductsFromAdmin();
            loadProducts(); // Reload the products display
            showSyncNotification('Products updated from admin panel!');
        }
    });
    
    // Also listen for direct localStorage changes in the same tab
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        if (key === 'adminProducts') {
            setTimeout(() => {
                console.log('🔄 Admin updated products (same tab), refreshing...');
                products = loadProductsFromAdmin();
                loadProducts();
                showSyncNotification('Products updated from admin panel!');
            }, 100);
        }
    };
}

// Show sync notification
function showSyncNotification(message) {
    const notification = document.createElement('div');
    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            z-index: 10001;
            font-weight: 500;
            animation: slideInRight 0.3s ease;
        ">
            <i class="fas fa-sync-alt"></i> ${message}
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Load products into grid
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <div class="product-image" style="background-size: cover; background-position: center;">
            <div class="product-badge">${product.badge}</div>
            <div class="image-fallback" style="display: none; background: ${getProductColor(product.id)}; color: #333; font-size: 2rem; display: flex; align-items: center; justify-content: center; height: 100%;">
                ${getProductIcon(product.id)} ${product.name}
            </div>
        </div>
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <ul class="product-features">
                ${product.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <div class="product-pricing">
                <div class="product-price">₹${product.price}</div>
                <div class="product-unit">प्रति ${product.unit}</div>
            </div>
            <div class="quantity-selector">
                <label>मात्रा:</label>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                    <input type="number" class="quantity-input" id="qty-${product.id}" value="1" min="1" max="50">
                    <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                </div>
            </div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i>
                कार्ट में डालें
            </button>
        </div>
    `;
    
    // Try to load the local image first, then fallback
    const img = new Image();
    const productImage = card.querySelector('.product-image');
    const fallback = card.querySelector('.image-fallback');
    
    img.onload = function() {
        // Local image loaded successfully
        productImage.style.backgroundImage = `url('${product.image}')`;
        fallback.style.display = 'none';
    };
    
    img.onerror = function() {
        // Local image failed, try fallback image
        if (product.fallbackImage) {
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                productImage.style.backgroundImage = `url('${product.fallbackImage}')`;
                fallback.style.display = 'none';
            };
            fallbackImg.onerror = function() {
                // Both images failed, show colored fallback
                productImage.style.backgroundImage = 'none';
                productImage.style.background = getProductColor(product.id);
                fallback.style.display = 'flex';
            };
            fallbackImg.src = product.fallbackImage;
        } else {
            // No fallback image, show colored fallback
            productImage.style.backgroundImage = 'none';
            productImage.style.background = getProductColor(product.id);
            fallback.style.display = 'flex';
        }
    };
    
    // Start loading the local image
    img.src = product.image;
    
    return card;
}

// Get product icon based on product type
function getProductIcon(productId) {
    const icons = {
        1: '🛢️', // Mustard oil
        2: '🛢️', // Linseed oil  
        3: '🌾', // Wheat flour
        4: '🥛', // Refined flour
        5: '🟡', // Turmeric
        6: '🟢', // Coriander
        7: '🔴'  // Chili powder
    };
    return icons[productId] || '📦';
}

// Get product color based on product type
function getProductColor(productId) {
    const colors = {
        1: 'linear-gradient(135deg, #FFD700, #FFA500)', // Golden for mustard oil
        2: 'linear-gradient(135deg, #8B4513, #A0522D)', // Brown for linseed oil
        3: 'linear-gradient(135deg, #DEB887, #F4A460)', // Wheat color for flour
        4: 'linear-gradient(135deg, #F5F5DC, #FFFACD)', // Light for refined flour
        5: 'linear-gradient(135deg, #FFD700, #FF8C00)', // Yellow for turmeric
        6: 'linear-gradient(135deg, #228B22, #32CD32)', // Green for coriander
        7: 'linear-gradient(135deg, #DC143C, #FF6347)'  // Red for chili
    };
    return colors[productId] || 'linear-gradient(135deg, #ccc, #999)';
}

// Quantity controls
function increaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue < 50) {
        input.value = currentValue + 1;
    }
}

function decreaseQuantity(productId) {
    const input = document.getElementById(`qty-${productId}`);
    const currentValue = parseInt(input.value);
    if (currentValue > 1) {
        input.value = currentValue - 1;
    }
}

// Add to cart functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const quantity = parseInt(document.getElementById(`qty-${productId}`).value);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartUI();
    showAddToCartAnimation(productId);
}

// Show add to cart animation
function showAddToCartAnimation(productId) {
    const button = document.querySelector(`button[onclick="addToCart(${productId})"]`);
    const originalText = button.innerHTML;
    
    button.innerHTML = '<i class="fas fa-check"></i> जोड़ा गया!';
    button.style.background = '#28a745';
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
    }, 1500);
}

// Cart functionality
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartOverlay = document.getElementById('cartOverlay');
    
    cartSidebar.classList.toggle('open');
    cartOverlay.classList.toggle('active');
    
    if (cartSidebar.classList.contains('open')) {
        updateCartDisplay();
    }
}

function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    if (totalItems > 0) {
        cartCount.style.display = 'flex';
    } else {
        cartCount.style.display = 'none';
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h3>आपका कार्ट खाली है</h3>
                <p>कुछ उत्पाद जोड़ें</p>
                <button class="continue-shopping" onclick="toggleCart()">खरीदारी जारी रखें</button>
            </div>
        `;
        cartTotal.textContent = '0';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price} प्रति ${item.unit}</div>
                <div class="cart-item-quantity">
                    <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-quantity-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    <span style="margin-left: 10px; font-weight: 600;">₹${itemTotal}</span>
                </div>
            </div>
            <button class="remove-item" onclick="removeFromCart(${item.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total;
}

function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCartUI();
            updateCartDisplay();
        }
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartUI();
    updateCartDisplay();
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Checkout functionality
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('आपका कार्ट खाली है!');
        return;
    }
    
    const orderModal = document.getElementById('orderModal');
    const orderSummary = document.getElementById('orderSummary');
    const modalTotal = document.getElementById('modalTotal');
    
    // Update order summary
    orderSummary.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const summaryItem = document.createElement('div');
        summaryItem.className = 'summary-item';
        summaryItem.innerHTML = `
            <span>${item.name} (${item.quantity} ${item.unit})</span>
            <span>₹${itemTotal}</span>
        `;
        orderSummary.appendChild(summaryItem);
    });
    
    modalTotal.textContent = total;
    orderModal.classList.add('active');
}

function closeOrderModal() {
    const orderModal = document.getElementById('orderModal');
    orderModal.classList.remove('active');
}

// Setup event listeners
function setupEventListeners() {
    // Order form submission
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerAddress = document.getElementById('customerAddress').value;
        
        if (!customerName || !customerPhone || !customerAddress) {
            alert('कृपया सभी फील्ड भरें');
            return;
        }
        
        // Process order
        processOrder({
            name: customerName,
            phone: customerPhone,
            address: customerAddress,
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        });
    });
    
    // Close modal when clicking outside
    const orderModal = document.getElementById('orderModal');
    orderModal.addEventListener('click', function(e) {
        if (e.target === orderModal) {
            closeOrderModal();
        }
    });
}

// Process order
function processOrder(orderData) {
    // Send order to admin panel
    try {
        // Save to admin orders
        const adminOrders = JSON.parse(localStorage.getItem('adminOrders') || '[]');
        const newOrder = {
            id: Date.now().toString(),
            customerName: orderData.name,
            customerPhone: orderData.phone,
            customerAddress: orderData.address,
            items: orderData.items,
            total: orderData.total,
            status: 'pending',
            date: new Date().toISOString()
        };
        adminOrders.push(newOrder);
        localStorage.setItem('adminOrders', JSON.stringify(adminOrders));
        
        // Save to admin customers
        const adminCustomers = JSON.parse(localStorage.getItem('adminCustomers') || '[]');
        let customer = adminCustomers.find(c => c.phone === orderData.phone);
        if (customer) {
            customer.orderCount = (customer.orderCount || 0) + 1;
            customer.totalSpent = (customer.totalSpent || 0) + orderData.total;
            customer.lastOrder = new Date().toISOString();
        } else {
            adminCustomers.push({
                name: orderData.name,
                phone: orderData.phone,
                address: orderData.address,
                orderCount: 1,
                totalSpent: orderData.total,
                lastOrder: new Date().toISOString()
            });
        }
        localStorage.setItem('adminCustomers', JSON.stringify(adminCustomers));
        
        console.log('✅ Order saved to admin panel:', newOrder.id);
    } catch (error) {
        console.error('Error saving order to admin panel:', error);
    }
    
    // Show success message
    closeOrderModal();
    showSuccessMessage();
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartUI();
    toggleCart();
    
    // Send WhatsApp message
    sendWhatsAppOrder(orderData);
}

function sendWhatsAppOrder(orderData) {
    let message = `🛒 *नया ऑर्डर - Radha Oil Industry*\n\n`;
    message += `👤 *ग्राहक:* ${orderData.name}\n`;
    message += `📱 *फोन:* ${orderData.phone}\n`;
    message += `📍 *पता:* ${orderData.address}\n\n`;
    message += `🛍️ *ऑर्डर विवरण:*\n`;
    
    orderData.items.forEach(item => {
        message += `• ${item.name} - ${item.quantity} ${item.unit} (₹${item.price * item.quantity})\n`;
    });
    
    message += `\n💰 *कुल राशि:* ₹${orderData.total}\n\n`;
    message += `कृपया जल्दी डिलीवरी करें। धन्यवाद! 🙏`;
    
    const whatsappUrl = `https://wa.me/919580383682?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.add('active');
}

function closeSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    successMessage.classList.remove('active');
}

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});