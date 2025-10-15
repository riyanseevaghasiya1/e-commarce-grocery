// Category Slider Navigation
function scrollCategories(direction) {
    const slider = document.getElementById('categorySlider');
    const scrollAmount = 220;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Products Slider Navigation
function scrollProducts(sliderId, direction) {
    const slider = document.getElementById(sliderId);
    const scrollAmount = 270;
    slider.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}

// Quick View Modal Functions
function openQuickView(button) {
    const productCard = button.closest('.product-card');
    const productImage = productCard.querySelector('.product-image').src;
    const productName = productCard.querySelector('.product-name').textContent;
    const productPrice = productCard.querySelector('.current-price').textContent;

    document.getElementById('modalProductImage').src = productImage;
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductPrice').textContent = productPrice;
    document.getElementById('quantityInput').value = 1;

    document.getElementById('quickViewModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewModal').classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Quantity Controls
function increaseQuantity() {
    const input = document.getElementById('quantityInput');
    input.value = parseInt(input.value) + 1;
}

function decreaseQuantity() {
    const input = document.getElementById('quantityInput');
    if (parseInt(input.value) > 1) {
        input.value = parseInt(input.value) - 1;
    }
}

// Add to Cart Function
function addToCartFromModal() {
    const productName = document.getElementById('modalProductName').textContent;
    const quantity = document.getElementById('quantityInput').value;
    alert(`Added ${quantity}x "${productName}" to cart!`);
    closeQuickView();
}

// Close modal on outside click
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('quickViewModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeQuickView();
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuickView();
        }
    });

    // Inject 'View All' button into category section header
    const catHeader = document.querySelector('.category-slider-container .section-header');
    if (catHeader && !catHeader.querySelector('.category-actions')) {
        const actions = document.createElement('div');
        actions.className = 'category-actions';

        const viewBtn = document.createElement('button');
        viewBtn.className = 'view-all-btn';
        viewBtn.textContent = 'View All';
        viewBtn.addEventListener('click', () => showNotification('Viewing all categories'));

        const prev = document.createElement('button');
        prev.className = 'ghost-icon-btn';
        prev.innerHTML = '<i class="fas fa-chevron-left"></i>';
        prev.addEventListener('click', () => scrollCategories(-1));

        const next = document.createElement('button');
        next.className = 'ghost-icon-btn';
        next.innerHTML = '<i class="fas fa-chevron-right"></i>';
        next.addEventListener('click', () => scrollCategories(1));

        actions.appendChild(viewBtn);
        actions.appendChild(prev);
        actions.appendChild(next);
        catHeader.appendChild(actions);
    }

    // Smooth scroll behavior for all sliders
    const sliders = document.querySelectorAll('.category-slider, .products-slider');
    
    sliders.forEach(slider => {
        let isDown = false;
        let startX;
        let scrollLeft;

        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    });

    // Auto scroll for category slider
    const categorySlider = document.getElementById('categorySlider');
    if (categorySlider) {
        let autoScrollTimer;
        let direction = 1;
        const step = 2; // pixels per tick
        const tickMs = 16; // ~60fps

        function startAutoScroll() {
            stopAutoScroll();
            autoScrollTimer = setInterval(() => {
                // bounce at edges
                if (categorySlider.scrollLeft + categorySlider.clientWidth >= categorySlider.scrollWidth - 2) {
                    direction = -1;
                } else if (categorySlider.scrollLeft <= 0) {
                    direction = 1;
                }
                categorySlider.scrollLeft += step * direction;
            }, tickMs);
        }

        function stopAutoScroll() {
            if (autoScrollTimer) clearInterval(autoScrollTimer);
        }

        // pause on hover or when user interacts
        categorySlider.addEventListener('mouseenter', stopAutoScroll);
        categorySlider.addEventListener('mouseleave', startAutoScroll);
        categorySlider.addEventListener('mousedown', stopAutoScroll);
        categorySlider.addEventListener('touchstart', stopAutoScroll, { passive: true });

        // also pause when hovering over arrows
        const prevBtn = document.querySelector('.category-slider-container .slider-nav.prev');
        const nextBtn = document.querySelector('.category-slider-container .slider-nav.next');
        [prevBtn, nextBtn].forEach(btn => {
            if (btn) {
                btn.addEventListener('mouseenter', stopAutoScroll);
                btn.addEventListener('mouseleave', startAutoScroll);
            }
        });

        startAutoScroll();
    }

    // Add to cart functionality for product cards
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent;
            const productPrice = productCard.querySelector('.current-price').textContent;
            
            // Add animation effect
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
            
            // Show notification
            showNotification(`Added "${productName}" to cart!`);
        });
    });

    // Wishlist functionality
    const wishlistButtons = document.querySelectorAll('.product-actions .action-btn:nth-child(2)');
    
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const icon = this.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.color = '#FF6B6B';
                showNotification('Added to wishlist!');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.color = '';
                showNotification('Removed from wishlist!');
            }
        });
    });

    // Category hover effect
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-name').textContent;
            showNotification(`Browsing ${categoryName}...`);
        });
    });

    // Collection cards click
    const collectionCards = document.querySelectorAll('.collection-card');
    
    collectionCards.forEach(card => {
        card.addEventListener('click', function() {
            const title = this.querySelector('.collection-title').textContent;
            showNotification(`Exploring ${title}...`);
        });
    });

    // Feature cards click
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A') {
                const link = this.querySelector('.feature-link');
                if (link) {
                    link.click();
                }
            }
        });
    });
});

// Notification function
function showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.custom-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'custom-notification';
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #00B207;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-weight: 500;
        font-size: 14px;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('style[data-notification-styles]')) {
        style.setAttribute('data-notification-styles', '');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Scroll reveal animation (excluding images)
function revealOnScroll() {
    const elements = document.querySelectorAll('.collection-card, .feature-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
}

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', revealOnScroll);

// Prevent default behavior for demo links
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('quantityInput');
    
    if (quantityInput) {
        quantityInput.addEventListener('input', function() {
            if (this.value < 1) {
                this.value = 1;
            }
            if (this.value > 99) {
                this.value = 99;
            }
        });
        
        quantityInput.addEventListener('blur', function() {
            if (this.value === '' || isNaN(this.value)) {
                this.value = 1;
            }
        });
    }
});

// Prevent default behavior for demo links
document.addEventListener('DOMContentLoaded', function() {
    const demoLinks = document.querySelectorAll('a[href="#"]');
    
    demoLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
        });
    });
});