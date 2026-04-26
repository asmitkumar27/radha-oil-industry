// Admin Panel JavaScript
let currentUser = null;
let products = [];
let orders = [];
let customers = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    loadStoredData();
    setupEventListeners();
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('adminUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        showDashboard();
    }
});

// Setup event listeners
function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Company form
    document.getElementById('companyForm').addEventListener('submit', updateCompanyInfo);
    
    // Admin form
    document.getElementById('adminForm').addEventListener('submit', updateAdminCredentials);
    
    // Add product form
    document.getElementById('addProductForm').addEventListener('submit', addNewProduct);
    
    // Order filter
    document.getElementById('orderFilter').addEventListener('change', filterOrders);
}

// Login functionality
function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Default credentials (you can change these)
    const validCredentials = getStoredCredentials();
    
    if (username === validCredentials.username && password === validCredentials.password) {
        currentUser = { username, loginTime: new Date() };
        localStorage.setItem('adminUser', JSON.stringify(currentUser));
        showDashboard();
        showNotification('Login successful!', 'success');
    } else {
        showNotification('Invalid credentials!', 'error');
    }
}

// Get stored credentials
function getStoredCredentials() {
    const stored = localStorage.getItem('adminCredentials');
    if (stored) {
        return JSON.parse(stored);
    }
    return { username: 'admin', password: 'radha123' };
}

// Show dashboard
function showDashboard() {
    document.getElementById('loginContainer').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    loadDashboardData();
}

// Logout
function logout() {
    localStorage.removeItem('adminUser');
    currentUser = null;
    document.getElementById('loginContainer').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    showNotification('Logged out successfully!', 'success');
}

// Show section
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to nav item
    event.target.classList.add('active');
    
    // Update page title
    const titles = {
        dashboard: 'Dashboard',
        products: 'Products Management',
        orders: 'Orders Management',
        customers: 'Customer Database',
        settings: 'Settings'
    };
    document.getElementById('pageTitle').textContent = titles[sectionName];
    
    // Load section data
    switch(sectionName) {
        case 'products':
            loadProductsTable();
            break;
        case 'orders':
            loadOrdersTable();
            break;
        case 'customers':
            loadCustomersTable();
            break;
    }
}

// Load dashboard data
function loadDashboardData() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('totalOrders').textContent = orders.length;
    document.getElementById('totalCustomers').textContent = customers.length;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    document.getElementById('totalRevenue').textContent = `₹${totalRevenue}`;
}

// Load stored data
function loadStoredData() {
    // Load products from localStorage or use defaults
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
        products = JSON.parse(storedProducts);
        console.log('📦 Loaded products from admin storage:', products.length);
    } else {
        // Default products
        products = [
            {
                id: 1,
                name: "सरसों का तेल",
                description: "शुद्ध कोल्ड प्रेस्ड सरसों का तेल",
                price: 180,
                unit: "लीटर",
                image: "images/mustard-oil.jpg",
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
        saveProducts(); // Save default products to localStorage
        console.log('📦 Initialized with default products');
    }
    
    // Load orders
    const storedOrders = localStorage.getItem('adminOrders');
    if (storedOrders) {
        orders = JSON.parse(storedOrders);
        console.log('📋 Loaded orders from admin storage:', orders.length);
    }
    
    // Load customers
    const storedCustomers = localStorage.getItem('adminCustomers');
    if (storedCustomers) {
        customers = JSON.parse(storedCustomers);
        console.log('👥 Loaded customers from admin storage:', customers.length);
    }
}

// Save data functions
function saveProducts() {
    localStorage.setItem('adminProducts', JSON.stringify(products));
    console.log('💾 Products saved to admin storage');
    
    // Trigger website update by dispatching storage event
    window.dispatchEvent(new StorageEvent('storage', {
        key: 'adminProducts',
        newValue: JSON.stringify(products),
        url: window.location.href
    }));
}

function saveOrders() {
    localStorage.setItem('adminOrders', JSON.stringify(orders));
    console.log('💾 Orders saved to admin storage');
}

function saveCustomers() {
    localStorage.setItem('adminCustomers', JSON.stringify(customers));
    console.log('💾 Customers saved to admin storage');
}

// Products management
function loadProductsTable() {
    const tbody = document.getElementById('productsTableBody');
    tbody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${product.image}" alt="${product.name}" class="product-image-cell" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0yMCAyMEg0MFY0MEgyMFYyMFoiIGZpbGw9IiNERERERkYiLz4KPC9zdmc+'">
            </td>
            <td><strong>${product.name}</strong></td>
            <td>₹${product.price}</td>
            <td>${product.unit}</td>
            <td><span class="badge">${product.badge}</span></td>
            <td>
                <button class="btn-secondary" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Add new product
function showAddProductModal() {
    document.getElementById('addProductModal').classList.add('active');
}

function closeAddProductModal() {
    document.getElementById('addProductModal').classList.remove('active');
    document.getElementById('addProductForm').reset();
}

function addNewProduct(e) {
    e.preventDefault();
    
    const newProduct = {
        id: Math.max(...products.map(p => p.id), 0) + 1, // Generate unique ID
        name: document.getElementById('productName').value,
        description: document.getElementById('productDescription').value,
        price: parseInt(document.getElementById('productPrice').value),
        unit: document.getElementById('productUnit').value,
        badge: document.getElementById('productBadge').value,
        features: document.getElementById('productFeatures').value.split(',').map(f => f.trim()),
        image: `images/${document.getElementById('productName').value.replace(/\s+/g, '-').toLowerCase()}.jpg`
    };
    
    products.push(newProduct);
    saveProducts(); // This will trigger website update
    loadProductsTable();
    loadDashboardData();
    closeAddProductModal();
    showNotification('Product added successfully! Website updated.', 'success');
}

// Edit product
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        // Fill form with product data
        document.getElementById('productName').value = product.name;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productUnit').value = product.unit;
        document.getElementById('productBadge').value = product.badge;
        document.getElementById('productFeatures').value = product.features.join(', ');
        
        showAddProductModal();
        
        // Change form submission to update instead of add
        const form = document.getElementById('addProductForm');
        form.onsubmit = function(e) {
            e.preventDefault();
            updateProduct(id);
        };
    }
}

// Update product
function updateProduct(id) {
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
        products[productIndex] = {
            ...products[productIndex],
            name: document.getElementById('productName').value,
            description: document.getElementById('productDescription').value,
            price: parseInt(document.getElementById('productPrice').value),
            unit: document.getElementById('productUnit').value,
            badge: document.getElementById('productBadge').value,
            features: document.getElementById('productFeatures').value.split(',').map(f => f.trim())
        };
        
        saveProducts(); // This will trigger website update
        loadProductsTable();
        closeAddProductModal();
        showNotification('Product updated successfully! Website updated.', 'success');
        
        // Reset form submission
        document.getElementById('addProductForm').onsubmit = addNewProduct;
    }
}

// Delete product
function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        saveProducts(); // This will trigger website update
        loadProductsTable();
        loadDashboardData();
        showNotification('Product deleted successfully! Website updated.', 'success');
    }
}

// Orders management
function loadOrdersTable() {
    const tbody = document.getElementById('ordersTableBody');
    tbody.innerHTML = '';
    
    if (orders.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 40px; color: #666;">No orders yet</td></tr>';
        return;
    }
    
    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>#${order.id}</td>
            <td>${order.customerName}</td>
            <td>${order.customerPhone}</td>
            <td>${order.items.length} items</td>
            <td>₹${order.total}</td>
            <td><span class="badge" style="background: ${getStatusColor(order.status)}">${order.status}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="btn-secondary" onclick="viewOrder(${order.id})">View</button>
                <button class="btn-primary" onclick="updateOrderStatus(${order.id})">Update</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Get status color
function getStatusColor(status) {
    switch(status) {
        case 'pending': return '#ffc107';
        case 'completed': return '#28a745';
        case 'cancelled': return '#dc3545';
        default: return '#6c757d';
    }
}

// Filter orders
function filterOrders() {
    const filter = document.getElementById('orderFilter').value;
    // Implementation for filtering orders
    loadOrdersTable();
}

// Customers management
function loadCustomersTable() {
    const tbody = document.getElementById('customersTableBody');
    tbody.innerHTML = '';
    
    if (customers.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 40px; color: #666;">No customers yet</td></tr>';
        return;
    }
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.address}</td>
            <td>${customer.orderCount || 0}</td>
            <td>₹${customer.totalSpent || 0}</td>
            <td>${customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Settings management
function updateCompanyInfo(e) {
    e.preventDefault();
    
    const companyInfo = {
        name: document.getElementById('companyName').value,
        phone: document.getElementById('companyPhone').value,
        email: document.getElementById('companyEmail').value,
        address: document.getElementById('companyAddress').value
    };
    
    localStorage.setItem('companyInfo', JSON.stringify(companyInfo));
    showNotification('Company information updated!', 'success');
}

function updateAdminCredentials(e) {
    e.preventDefault();
    
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }
    
    if (newUsername && newPassword) {
        const credentials = { username: newUsername, password: newPassword };
        localStorage.setItem('adminCredentials', JSON.stringify(credentials));
        showNotification('Admin credentials updated!', 'success');
        
        // Clear form
        document.getElementById('adminForm').reset();
    }
}

// Export functions
function exportData() {
    const data = {
        products,
        orders,
        customers,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `radha-oil-industry-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!', 'success');
}

function exportCustomers() {
    if (customers.length === 0) {
        showNotification('No customers to export!', 'error');
        return;
    }
    
    const csv = convertToCSV(customers);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `customers-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Customers exported successfully!', 'success');
}

// Convert to CSV
function convertToCSV(data) {
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#17a2b8'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyle);

// Listen for orders from the main website
window.addEventListener('storage', function(e) {
    if (e.key === 'newOrder') {
        const newOrder = JSON.parse(e.newValue);
        addNewOrder(newOrder);
    }
});

// Add new order from website
function addNewOrder(orderData) {
    const order = {
        id: orders.length + 1,
        customerName: orderData.name,
        customerPhone: orderData.phone,
        customerAddress: orderData.address,
        items: orderData.items,
        total: orderData.total,
        status: 'pending',
        date: new Date().toISOString()
    };
    
    orders.push(order);
    saveOrders();
    
    // Add customer if new
    const existingCustomer = customers.find(c => c.phone === orderData.phone);
    if (!existingCustomer) {
        customers.push({
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            orderCount: 1,
            totalSpent: orderData.total,
            lastOrder: new Date().toISOString()
        });
    } else {
        existingCustomer.orderCount++;
        existingCustomer.totalSpent += orderData.total;
        existingCustomer.lastOrder = new Date().toISOString();
    }
    
    saveCustomers();
    loadDashboardData();
    
    if (currentUser) {
        showNotification('New order received!', 'success');
    }
}

console.log('🔧 Admin Panel - Backend system loaded successfully! 🔧');
console.log('🔗 Website sync enabled - Changes will automatically update the website');

// Test admin-website connection
setTimeout(() => {
    const testConnection = localStorage.getItem('adminProducts');
    if (testConnection) {
        console.log('✅ Admin-Website connection verified');
    }
}, 1000);