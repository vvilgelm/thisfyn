// ===================================
// FYN - Main JavaScript
// ===================================

(function() {
    'use strict';

    // Wait for DOM to load
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        // Initialize all features
        initSmoothScroll();
        initContactForm();
        initScrollReveal();
        console.log('✅ FYN initialized');
    }

    // Smooth scrolling for anchor links
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Contact form handler
    function initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const statusDiv = document.getElementById('formStatus');
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Get form data
            const formData = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                message: form.message.value.trim()
            };

            // Basic validation
            if (!formData.name || !formData.email || !formData.message) {
                showStatus('Please fill in all fields', 'error');
                return;
            }

            if (!isValidEmail(formData.email)) {
                showStatus('Please enter a valid email address', 'error');
                return;
            }

            // Disable submit button
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                // Send to API endpoint
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    showStatus('Message sent successfully! We\'ll get back to you soon.', 'success');
                    form.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                showStatus('Oops! Something went wrong. Please try again.', 'error');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });

        function showStatus(message, type) {
            const statusDiv = document.getElementById('formStatus');
            statusDiv.textContent = message;
            statusDiv.className = `form__status ${type}`;
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                statusDiv.textContent = '';
                statusDiv.className = 'form__status';
            }, 5000);
        }

        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }
    }

    // Scroll reveal animation
    function initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe sections and features
        document.querySelectorAll('.section, .feature').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

})();

