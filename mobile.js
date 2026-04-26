// SIMPLE MOBILE JAVASCRIPT - GUARANTEED TO WORK

document.addEventListener('DOMContentLoaded', function() {
    console.log('Mobile JS loaded');
    

    
    // Language Switcher - SIMPLE VERSION
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('language') || 'hi';
    
    // Set initial active button
    langButtons.forEach(btn => {
        if (btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Language button click handler
    langButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const newLang = this.dataset.lang;
            
            if (newLang === currentLang) return;
            
            console.log('Switching language to:', newLang);
            currentLang = newLang;
            localStorage.setItem('language', newLang);
            
            // Update active button
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Translate page
            translatePage(newLang);
            
            // Show notification
            showNotification(newLang === 'hi' ? 'भाषा हिंदी में बदली गई' : 'Language changed to English');
        });
    });
    
    // Simple translation function
    function translatePage(lang) {
        const elements = document.querySelectorAll('[data-en][data-hi]');
        
        elements.forEach(el => {
            const text = lang === 'hi' ? el.getAttribute('data-hi') : el.getAttribute('data-en');
            if (text) {
                el.textContent = text;
            }
        });
        
        // Translate placeholders
        const placeholderElements = document.querySelectorAll('[data-placeholder-en][data-placeholder-hi]');
        placeholderElements.forEach(el => {
            const placeholder = lang === 'hi' ? el.getAttribute('data-placeholder-hi') : el.getAttribute('data-placeholder-en');
            if (placeholder) {
                el.placeholder = placeholder;
            }
        });
        
        // Translate select options
        const optionElements = document.querySelectorAll('option[data-en][data-hi]');
        optionElements.forEach(el => {
            const text = lang === 'hi' ? el.getAttribute('data-hi') : el.getAttribute('data-en');
            if (text) {
                el.textContent = text;
            }
        });
    }
    
    // Simple notification
    function showNotification(message) {
        // Remove existing notification
        const existing = document.querySelector('.mobile-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.className = 'mobile-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            left: 50%;
            transform: translateX(-50%);
            background: #667eea;
            color: white;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10001;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            animation: slideDown 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }
    
    // Add notification animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateX(-50%) translateY(0); opacity: 1; }
            to { transform: translateX(-50%) translateY(-20px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Apply initial language
    if (currentLang === 'en') {
        translatePage('en');
    }
});

console.log('✅ Mobile JavaScript loaded successfully!');