// Theme and Language Management System
class ThemeLanguageManager {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.currentLanguage = localStorage.getItem('language') || 'hi';
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupLanguage();
        this.bindEvents();
        this.loadSavedPreferences();
    }

    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        this.updateThemeIcon();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
        this.updateThemeIcon();
        this.showThemeNotification();
    }

    updateThemeIcon() {
        const themeIcon = document.getElementById('themeIcon');
        const themeBtn = document.getElementById('themeToggle');
        if (themeIcon && themeBtn) {
            if (this.currentTheme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeIcon.style.color = '#FFD700';
                themeBtn.classList.add('light-mode');
            } else {
                themeIcon.className = 'fas fa-moon';
                themeIcon.style.color = '#ffffff';
                themeBtn.classList.remove('light-mode');
            }
        }
    }

    showThemeNotification() {
        const message = this.currentTheme === 'dark' ? 
            (this.currentLanguage === 'hi' ? '🌙 डार्क मोड सक्रिय' : '🌙 Dark Mode Activated') :
            (this.currentLanguage === 'hi' ? '☀️ लाइट मोड सक्रिय' : '☀️ Light Mode Activated');
        
        this.showNotification(message);
    }

    // Language Management
    setupLanguage() {
        this.translations = {
            hi: {
                // Navigation
                'Home': 'होम',
                'Products': 'उत्पाद',
                'About': 'हमारे बारे में',
                'Contact': 'संपर्क',
                
                // Hero Section
                'Natural': 'प्राकृतिक',
                'oils and spices': 'तेल और मसालों का',
                'Trusted': 'विश्वसनीय',
                'source': 'स्रोत',
                'Pure oils and spices made with traditional methods': 'परंपरागत तरीकों से बनाए गए शुद्ध तेल और मसाले',
                'Shop Now': 'अभी खरीदें',
                'Learn More': 'और जानें',
                
                // Products Section
                'Our Products': 'हमारे उत्पाद',
                'Natural and pure quality': 'प्राकृतिक और शुद्ध गुणवत्ता के साथ',
                'View All Products': 'सभी उत्पाद देखें और खरीदें',
                'Mustard Oil': 'सरसों का तेल',
                'Wheat Flour': 'गेहूं का आटा',
                'Turmeric Powder': 'हल्दी पाउडर',
                'Chili Powder': 'मिर्च पाउडर',
                
                // About Section
                'Radha Oil Industry': 'राधा ऑयल इंडस्ट्री',
                'Tradition and Quality Combined': 'परंपरा और गुणवत्ता का संगम',
                'Establishment': 'स्थापना',
                'Start of Radha Oil Industry with natural oils and spices': 'राधा ऑयल इंडस्ट्री की शुरुआत प्राकृतिक तेल और मसालों के साथ',
                'Natural': 'प्राकृतिक',
                '100% pure and natural products': '100% शुद्ध और प्राकृतिक उत्पाद',
                'Direct from Farmers': 'किसान से सीधे',
                'Direct purchase from farmers': 'सीधे किसानों से खरीदारी',
                'Quality': 'गुणवत्ता',
                'Quality guarantee': 'उच्च गुणवत्ता की गारंटी',
                
                // Contact Section
                'Contact Us': 'संपर्क करें',
                'Connect with us and place your orders': 'हमसे जुड़ें और अपने ऑर्डर दें',
                'Address': 'पता',
                'Phone': 'फोन',
                'Email': 'ईमेल',
                'Your Name': 'आपका नाम',
                'Phone Number': 'फोन नंबर',
                'Select Product': 'उत्पाद चुनें',
                'Message (Optional)': 'मैसेज (वैकल्पिक)',
                'Send': 'भेजें',
                'Order on WhatsApp': 'WhatsApp पर ऑर्डर करें',
                'Call Now': 'कॉल करें',
                
                // Footer
                'Natural quality with new experience': 'प्राकृतिक गुणवत्ता के साथ नया अनुभव',
                'Quick Links': 'त्वरित लिंक',
                'Follow Us': 'फॉलो करें',
                'All rights reserved': 'सभी अधिकार सुरक्षित',
                
                // Notifications
                'Language changed to Hindi': 'भाषा हिंदी में बदली गई',
                'Language changed to English': 'Language changed to English'
            },
            en: {
                // Navigation
                'होम': 'Home',
                'उत्पाद': 'Products',
                'हमारे बारे में': 'About',
                'संपर्क': 'Contact',
                
                // Hero Section
                'प्राकृतिक': 'Natural',
                'तेल और मसालों का': 'oils and spices',
                'विश्वसनीय': 'Trusted',
                'स्रोत': 'source',
                'परंपरागत तरीकों से बनाए गए शुद्ध तेल और मसाले': 'Pure oils and spices made with traditional methods',
                'अभी खरीदें': 'Shop Now',
                'और जानें': 'Learn More',
                
                // Products Section
                'हमारे उत्पाद': 'Our Products',
                'प्राकृतिक और शुद्ध गुणवत्ता के साथ': 'Natural and pure quality',
                'सभी उत्पाद देखें और खरीदें': 'View All Products & Shop',
                'सरसों का तेल': 'Mustard Oil',
                'गेहूं का आटा': 'Wheat Flour',
                'हल्दी पाउडर': 'Turmeric Powder',
                'मिर्च पाउडर': 'Chili Powder',
                
                // About Section
                'राधा ऑयल इंडस्ट्री': 'Radha Oil Industry',
                'परंपरा और गुणवत्ता का संगम': 'Tradition and Quality Combined',
                'स्थापना': 'Establishment',
                'राधा ऑयल इंडस्ट्री की शुरुआत प्राकृतिक तेल और मसालों के साथ': 'Start of Radha Oil Industry with natural oils and spices',
                'प्राकृतिक': 'Natural',
                '100% शुद्ध और प्राकृतिक उत्पाद': '100% pure and natural products',
                'किसान से सीधे': 'Direct from Farmers',
                'सीधे किसानों से खरीदारी': 'Direct purchase from farmers',
                'गुणवत्ता': 'Quality',
                'उच्च गुणवत्ता की गारंटी': 'Quality guarantee',
                
                // Contact Section
                'संपर्क करें': 'Contact Us',
                'हमसे जुड़ें और अपने ऑर्डर दें': 'Connect with us and place your orders',
                'पता': 'Address',
                'फोन': 'Phone',
                'ईमेल': 'Email',
                'आपका नाम': 'Your Name',
                'फोन नंबर': 'Phone Number',
                'उत्पाद चुनें': 'Select Product',
                'मैसेज (वैकल्पिक)': 'Message (Optional)',
                'भेजें': 'Send',
                'WhatsApp पर ऑर्डर करें': 'Order on WhatsApp',
                'कॉल करें': 'Call Now',
                
                // Footer
                'प्राकृतिक गुणवत्ता के साथ नया अनुभव': 'Natural quality with new experience',
                'त्वरित लिंक': 'Quick Links',
                'फॉलो करें': 'Follow Us',
                'सभी अधिकार सुरक्षित': 'All rights reserved',
                
                // Notifications
                'भाषा हिंदी में बदली गई': 'Language changed to Hindi',
                'Language changed to English': 'Language changed to English'
            }
        };
    }

    switchLanguage(lang) {
        if (lang === this.currentLanguage) return;
        
        this.currentLanguage = lang;
        localStorage.setItem('language', lang);
        
        // Update language switcher animation
        const languageSwitcher = document.querySelector('.language-switcher');
        if (languageSwitcher) {
            if (lang === 'en') {
                languageSwitcher.classList.add('english');
            } else {
                languageSwitcher.classList.remove('english');
            }
        }
        
        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            }
        });
        
        // Translate all elements
        this.translatePage();
        this.showLanguageNotification();
    }

    translatePage() {
        // Add fade out effect
        document.body.classList.add('lang-fade-out');
        
        setTimeout(() => {
            // Translate elements with data attributes
            document.querySelectorAll('[data-en][data-hi]').forEach(element => {
                const key = this.currentLanguage === 'hi' ? 'data-hi' : 'data-en';
                const text = element.getAttribute(key);
                if (text) {
                    element.textContent = text;
                }
            });
            
            // Translate placeholder text
            document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(element => {
                const currentPlaceholder = element.placeholder;
                const translation = this.translations[this.currentLanguage][currentPlaceholder];
                if (translation) {
                    element.placeholder = translation;
                }
            });
            
            // Remove fade out and add fade in
            document.body.classList.remove('lang-fade-out');
            document.body.classList.add('lang-fade-in');
            
            setTimeout(() => {
                document.body.classList.remove('lang-fade-in');
            }, 300);
        }, 200);
    }

    showLanguageNotification() {
        const message = this.currentLanguage === 'hi' ? 
            'भाषा हिंदी में बदली गई 🇮🇳' : 
            'Language changed to English 🇺🇸';
        this.showNotification(message);
    }

    // Event Binding
    bindEvents() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Ctrl + Shift + T for theme toggle
            if (e.ctrlKey && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
            
            // Ctrl + Shift + L for language toggle
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                const newLang = this.currentLanguage === 'hi' ? 'en' : 'hi';
                this.switchLanguage(newLang);
            }
        });
    }

    loadSavedPreferences() {
        // Set initial language button state
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.lang === this.currentLanguage) {
                btn.classList.add('active');
            }
        });

        // Apply initial translations if needed
        if (this.currentLanguage === 'en') {
            this.translatePage();
        }
    }

    // Notification System
    showNotification(message) {
        // Remove existing notifications
        document.querySelectorAll('.theme-lang-notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = 'theme-lang-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(102, 126, 234, 0.3);
            z-index: 10001;
            font-weight: 500;
            animation: slideInRight 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        
        document.body.appendChild(notification);
        
        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'slideOutRight 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { 
            transform: translateX(100%) scale(0.8); 
            opacity: 0; 
        }
        to { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
        }
    }
    
    @keyframes slideOutRight {
        from { 
            transform: translateX(0) scale(1); 
            opacity: 1; 
        }
        to { 
            transform: translateX(100%) scale(0.8); 
            opacity: 0; 
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.2s ease;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(notificationStyles);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeLanguageManager = new ThemeLanguageManager();
});

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeLanguageManager;
}