// Enhanced Animations and Interactions for Radha Oil Industry Website

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarEffects();
    initButtonEffects();
    initParticleSystem();
    initTypingAnimation();
    initSmoothScrolling();
    initImageLazyLoading();
});

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.feature-item, .product-card-mini, .timeline-item');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animated');
                    }, index * 200);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    document.querySelectorAll('.animate-on-scroll, .slide-in-left, .slide-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Navbar Effects
function initNavbarEffects() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Button Effects
function initButtonEffects() {
    // Ripple effect for buttons
    document.querySelectorAll('.pulse-animation').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = this.querySelector('.button-ripple');
            if (ripple) {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
                
                setTimeout(() => {
                    ripple.style.width = '0';
                    ripple.style.height = '0';
                }, 300);
            }
        });
    });

    // Hover effects for product cards
    document.querySelectorAll('.product-card-mini').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Enhanced Particle System
function initParticleSystem() {
    const particlesContainer = document.querySelector('.floating-particles');
    if (!particlesContainer) return;
    
    // Create more particles with different types
    const particleTypes = ['🌾', '🍃', '✨', '🌿', '🌱'];
    
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'enhanced-particle';
        particle.textContent = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        
        particle.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 1.5 + 0.8}rem;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            animation: enhancedFloat ${Math.random() * 10 + 8}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
            pointer-events: none;
            z-index: 1;
        `;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for enhanced particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes enhancedFloat {
            0%, 100% { 
                transform: translateY(0px) translateX(0px) rotate(0deg); 
                opacity: 0.3; 
            }
            25% { 
                transform: translateY(-30px) translateX(15px) rotate(90deg); 
                opacity: 0.7; 
            }
            50% { 
                transform: translateY(-20px) translateX(-10px) rotate(180deg); 
                opacity: 1; 
            }
            75% { 
                transform: translateY(-40px) translateX(20px) rotate(270deg); 
                opacity: 0.5; 
            }
        }
    `;
    document.head.appendChild(style);
}

// Typing Animation
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const text = typingElement.textContent;
    typingElement.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing when element comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                observer.unobserve(entry.target);
            }
        });
    });
    
    observer.observe(typingElement);
}

// Smooth Scrolling
function initSmoothScrolling() {
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to about function
    window.scrollToAbout = function() {
        document.getElementById('about').scrollIntoView({
            behavior: 'smooth'
        });
    };
}

// Image Lazy Loading with Animation
function initImageLazyLoading() {
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.classList.add('image-loading');
                
                img.onload = function() {
                    img.classList.remove('image-loading');
                    img.style.opacity = '0';
                    img.style.transform = 'scale(1.1)';
                    img.style.transition = 'all 0.5s ease';
                    
                    setTimeout(() => {
                        img.style.opacity = '1';
                        img.style.transform = 'scale(1)';
                    }, 100);
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Interactive Elements
document.addEventListener('mousemove', function(e) {
    // Parallax effect for floating elements
    const floatingElements = document.querySelectorAll('.floating-leaf');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        const x = (mouseX - 0.5) * speed * 20;
        const y = (mouseY - 0.5) * speed * 20;
        
        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Contact Form Enhancement
function enhanceContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add validation animation
        input.addEventListener('invalid', function() {
            this.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 500);
        });
    });
}

// Add shake animation for form validation
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);

// Initialize contact form enhancements
enhanceContactForm();

// Performance optimization - Reduce animations on low-end devices
if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    document.documentElement.style.setProperty('--animation-duration', '0.5s');
}

// Add loading screen animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Animate elements in sequence
    setTimeout(() => {
        document.querySelector('.hero-title').classList.add('animated');
    }, 300);
    
    setTimeout(() => {
        document.querySelector('.hero-subtitle').classList.add('animated');
    }, 600);
    
    setTimeout(() => {
        document.querySelector('.hero-buttons').classList.add('animated');
    }, 900);
});

console.log('🌾 Radha Oil Industry - Enhanced animations loaded successfully! 🌾');

// Learn More Modal Functions
function openLearnMoreModal() {
    const modal = document.getElementById('learnMoreModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add entrance animation to modal content
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.animation = 'modalSlideIn 0.5s ease';
}

function closeLearnMoreModal() {
    const modal = document.getElementById('learnMoreModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tab System for Learn More Modal
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
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Add animation to tab content
    const activePanel = document.getElementById(tabName);
    activePanel.style.animation = 'fadeInUp 0.5s ease';
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    const modal = document.getElementById('learnMoreModal');
    if (e.target === modal) {
        closeLearnMoreModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLearnMoreModal();
    }
});

// Enhanced scroll to about function (fallback)
window.scrollToAbout = function() {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
        aboutSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
};

// Add counter animation for numbers in modal
function animateCounters() {
    const counters = document.querySelectorAll('.step-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        let current = 0;
        const increment = target / 20;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current);
                setTimeout(updateCounter, 50);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Initialize modal enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to modal cards
    const infoCards = document.querySelectorAll('.info-card, .benefit-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animation to quality items
    const qualityItems = document.querySelectorAll('.quality-item');
    qualityItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.animation = 'pulse 0.6s ease';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
});

// Add pulse animation for clicked elements
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(pulseStyle);

console.log('📚 Learn More Modal - Enhanced functionality loaded! 📚');