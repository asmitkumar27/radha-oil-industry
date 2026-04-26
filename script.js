// Basic functionality for Radha Oil Industry Website

// Learn More Modal Functions
function openLearnMoreModal() {
    const modal = document.getElementById('learnMoreModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLearnMoreModal() {
    const modal = document.getElementById('learnMoreModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Tab functionality for Learn More Modal
function showTab(tabName) {
    // Hide all tab panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    
    // Remove active class from all tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab panel
    const selectedPanel = document.getElementById(tabName);
    if (selectedPanel) {
        selectedPanel.classList.add('active');
    }
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Contact form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name') || this.querySelector('input[type="text"]').value;
            const phone = formData.get('phone') || this.querySelector('input[type="tel"]').value;
            const product = formData.get('product') || this.querySelector('select').value;
            const message = formData.get('message') || this.querySelector('textarea').value;
            
            // Create WhatsApp message
            let whatsappMessage = `🌾 *Radha Oil Industry - नई पूछताछ*\n\n`;
            whatsappMessage += `👤 *नाम:* ${name}\n`;
            whatsappMessage += `📱 *फोन:* ${phone}\n`;
            if (product) {
                whatsappMessage += `🛒 *उत्पाद:* ${product}\n`;
            }
            if (message) {
                whatsappMessage += `💬 *संदेश:* ${message}\n`;
            }
            whatsappMessage += `\nकृपया जल्दी संपर्क करें। धन्यवाद! 🙏`;
            
            // Open WhatsApp
            const whatsappUrl = `https://wa.me/919580383682?text=${encodeURIComponent(whatsappMessage)}`;
            window.open(whatsappUrl, '_blank');
            
            // Reset form
            this.reset();
            
            // Show success message
            alert('आपका संदेश भेजा गया है! हम जल्दी संपर्क करेंगे।');
        });
    }
});

console.log('✅ Basic script loaded successfully!');