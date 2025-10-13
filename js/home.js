// Initialize all Owl Carousels when document is ready
$(document).ready(function() {
    
    // Best Sellers Carousel
    $('.bestsellers-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['<span>‹</span>', '<span>›</span>'],
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            480: {
                items: 2,
                margin: 15
            },
            768: {
                items: 3,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1280: {
                items: 5,
                margin: 20
            }
        },
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        smartSpeed: 800
    });

    // Fresh Vegetables Carousel
    $('.vegetables-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['<span>‹</span>', '<span>›</span>'],
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            480: {
                items: 2,
                margin: 15
            },
            768: {
                items: 3,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1280: {
                items: 5,
                margin: 20
            }
        },
        autoplay: true,
        autoplayTimeout: 3500,
        autoplayHoverPause: true,
        smartSpeed: 800
    });

    // Chips Collection Carousel
    $('.chips-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['<span>‹</span>', '<span>›</span>'],
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            480: {
                items: 2,
                margin: 15
            },
            768: {
                items: 3,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1280: {
                items: 5,
                margin: 20
            }
        },
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        smartSpeed: 800
    });

    // Cookies & Cakes Carousel
    $('.cookies-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['<span>‹</span>', '<span>›</span>'],
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            480: {
                items: 2,
                margin: 15
            },
            768: {
                items: 3,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1280: {
                items: 5,
                margin: 20
            }
        },
        autoplay: true,
        autoplayTimeout: 4500,
        autoplayHoverPause: true,
        smartSpeed: 800
    });

    // Popcorn & Jerky Carousel
    $('.popcorn-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        navText: ['<span>‹</span>', '<span>›</span>'],
        responsive: {
            0: {
                items: 1,
                margin: 10
            },
            480: {
                items: 2,
                margin: 15
            },
            768: {
                items: 3,
                margin: 20
            },
            1024: {
                items: 4,
                margin: 20
            },
            1280: {
                items: 5,
                margin: 20
            }
        },
        autoplay: true,
        autoplayTimeout: 5000,
        autoplayHoverPause: true,
        smartSpeed: 800
    });

    // Add to Cart Button Click Event
    $('button.bg-emerald-500').on('click', function(e) {
        e.preventDefault();
        
        // Get product details from the card
        const productCard = $(this).closest('.bg-white');
        const productName = productCard.find('.text-sm.text-gray-600').text();
        const productPrice = productCard.find('.font-bold.text-gray-900').first().text();
        
        // Add visual feedback
        $(this).html('<span class="text-xl">✓</span>');
        $(this).addClass('!bg-green-600');
        
        // Show notification (you can customize this)
        showNotification('Added to cart: ' + productName + ' - ' + productPrice);
        
        // Reset button after 1.5 seconds
        setTimeout(() => {
            $(this).html('<span class="text-2xl leading-none">+</span>');
            $(this).removeClass('!bg-green-600');
        }, 1500);
    });

    // Feature Card Click Events
    $('.bg-amber-50, .bg-blue-50, .bg-emerald-50, .bg-pink-50').on('click', function() {
        const featureTitle = $(this).find('h3').text();
        showNotification('Feature clicked: ' + featureTitle);
    });

    // Collection Card Click Events
    $('.relative.rounded-2xl.overflow-hidden.group').on('click', function() {
        const collectionTitle = $(this).find('h3').text();
        showNotification('Collection selected: ' + collectionTitle);
    });

    // Smooth Scroll for Internal Links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 100
            }, 1000);
        }
    });

    // Lazy Loading Images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Add animation on scroll
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

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

});

// Notification Function
function showNotification(message) {
    // Remove existing notification
    $('.notification').remove();
    
    // Create notification element
    const notification = $('<div>')
        .addClass('notification')
        .css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'background': '#10b981',
            'color': 'white',
            'padding': '16px 24px',
            'border-radius': '12px',
            'box-shadow': '0 10px 25px rgba(0, 0, 0, 0.2)',
            'z-index': '9999',
            'animation': 'slideInRight 0.3s ease-out',
            'font-weight': '500',
            'max-width': '300px'
        })
        .text(message);
    
    // Add animation
    $('body').append(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.css('animation', 'slideOutRight 0.3s ease-out');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations dynamically
$('head').append(`
    <style>
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
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
                transform: translateX(100%);
                opacity: 0;
            }
        }
    </style>
`);

// Handle window resize
let resizeTimer;
$(window).on('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Refresh carousels on resize
        $('.owl-carousel').trigger('refresh.owl.carousel');
    }, 250);
});

// Prevent drag on images
$('img').on('dragstart', function(e) {
    e.preventDefault();
});

console.log('🛒 Grocery Store initialized successfully!');