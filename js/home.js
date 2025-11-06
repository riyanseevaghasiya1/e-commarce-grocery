 $(document).ready(function() {
            // Category Carousel
            $('#categoryCarousel').owlCarousel({
                loop: true,
                margin: 30,
                nav: false,
                dots: true,
                autoplay: true,
                autoplayTimeout: 3000,
                autoplayHoverPause: true,
                responsive: {
                    0: {
                        items: 2
                    },
                    481: {
                        items: 3
                    },
                    576: {
                        items: 4
                    },
                    768: {
                        items: 5
                    },
                    992: {
                        items: 6
                    },
                    1200: {
                        items: 8
                    }
                }
            });

            // Best Sellers Carousel
            var bestSellersCarousel = $('#bestSellers').owlCarousel({
                loop: false,
                margin: 20,
                nav: false,
                dots: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });

            // Fresh Vegetables Carousel
            var freshVegCarousel = $('#freshVeg').owlCarousel({
                loop: false,
                margin: 20,
                nav: false,
                dots: false,
                autoplay: false,
                responsive: {
                    0: {
                        items: 1
                    },
                    480: {
                        items: 2
                    },
                    768: {
                        items: 3
                    },
                    992: {
                        items: 4
                    },
                    1200: {
                        items: 5
                    }
                }
            });

            // Custom Navigation Buttons
            $('.slider-nav.prev').click(function() {
                var carouselId = $(this).data('carousel');
                $('#' + carouselId).trigger('prev.owl.carousel');
            });

            $('.slider-nav.next').click(function() {
                var carouselId = $(this).data('carousel');
                $('#' + carouselId).trigger('next.owl.carousel');
            });

            // Category Item Click Animation
            $('.shop-category-item').click(function() {
                var categoryName = $(this).find('.shop-category-name').text();
                console.log('Selected category: ' + categoryName);
                
                $(this).css('transform', 'scale(0.95) translateY(-10px)');
                setTimeout(() => {
                    $(this).css('transform', '');
                }, 200);
            });
        });

        // Quick View Modal Functions
        function openQuickView(button) {
            const productCard = button.closest('.product-card');
            const productImage = productCard.querySelector('.product-image');
            const productName = productCard.querySelector('.product-name');
            const productPrice = productCard.querySelector('.current-price');

            const modal = document.getElementById('quickViewModal');
            const modalImage = document.getElementById('modalProductImage');
            const modalName = document.getElementById('modalProductName');
            const modalPrice = document.getElementById('modalProductPrice');
            const quantityInput = document.getElementById('quantityInput');

            if (modalImage && productImage) {
                modalImage.src = productImage.src;
                modalImage.alt = productName ? productName.textContent : 'Product';
            }
            
            if (modalName && productName) {
                modalName.textContent = productName.textContent;
            }
            
            if (modalPrice && productPrice) {
                modalPrice.textContent = productPrice.textContent;
            }
            
            if (quantityInput) {
                quantityInput.value = 1;
            }

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        }

        function closeQuickView() {
            const modal = document.getElementById('quickViewModal');
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        }

        // Quantity Controls
        function increaseQuantity() {
            const input = document.getElementById('quantityInput');
            if (input) {
                const currentValue = parseInt(input.value) || 1;
                input.value = Math.min(currentValue + 1, 99);
            }
        }

        function decreaseQuantity() {
            const input = document.getElementById('quantityInput');
            if (input) {
                const currentValue = parseInt(input.value) || 1;
                input.value = Math.max(currentValue - 1, 1);
            }
        }

        // Add to Cart from Modal
        function addToCartFromModal() {
            const productName = document.getElementById('modalProductName');
            const quantity = document.getElementById('quantityInput');
            
            if (productName && quantity) {
                console.log(`Added ${quantity.value}x "${productName.textContent}" to cart!`);
                
                const btn = document.querySelector('.modal-add-to-cart');
                if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
                    btn.style.background = '#10b981';
                    
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 1500);
                }
                
                setTimeout(() => {
                    closeQuickView();
                }, 1500);
            }
        }

        // Add to Wishlist
        function addToWishlist(button) {
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-name').textContent;
                console.log(`❤️ Added "${productName}" to wishlist!`);
                
                const icon = button.querySelector('i');
                if (icon) {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    button.style.color = '#ff6b6b';
                }
                
                button.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    button.style.transform = '';
                }, 200);
            }
        }

        // Add to Cart
        function addToCart(button) {
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-name').textContent;
                const productPrice = productCard.querySelector('.current-price').textContent;
                console.log(`🛒 Added "${productName}" (${productPrice}) to cart!`);
                
                button.style.transform = 'scale(1.2)';
                button.style.background = '#10b981';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.style.transform = '';
                    button.style.background = '';
                    button.style.color = '';
                }, 300);
            }
        }

        // Modal Close on Outside Click
        document.getElementById('quickViewModal')?.addEventListener('click', function(e) {
            if (e.target === this) {
                closeQuickView();
            }
        });

        // Keyboard Navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('quickViewModal');
                if (modal && modal.classList.contains('show')) {
                    closeQuickView();
                }
            }
        });

        // Quantity Input Validation
        const quantityInput = document.getElementById('quantityInput');
        if (quantityInput) {
            quantityInput.addEventListener('input', function() {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) this.value = 1;
                if (value > 99) this.value = 99;
            });

            quantityInput.addEventListener('blur', function() {
                if (this.value === '' || isNaN(this.value)) {
                    this.value = 1;
                }
            });
        }

        // Hero Button Actions
        document.querySelectorAll('.hero-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                console.log('Explore More clicked');
            });
        });

        // Feature Cards Click Handler
        document.querySelectorAll('.feature-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (e.target.tagName !== 'A') {
                    const title = this.querySelector('.feature-title').textContent;
                    console.log(`Feature selected: ${title}`);
                }
            });
        });

        // Collection Cards Click Handler
        document.querySelectorAll('.collection-card').forEach(card => {
            card.addEventListener('click', function() {
                const title = this.querySelector('.collection-title').textContent;
                console.log(`Collection selected: ${title}`);
            });
        });

        // Prevent Default for Demo Links
        document.querySelectorAll('a[href="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
            });
        });

        // Scroll Reveal Animation
        function revealOnScroll() {
            const elements = document.querySelectorAll('.collection-card, .feature-card, .product-card');

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                observer.observe(element);
            });
        }

        // Initialize Scroll Reveal
        revealOnScroll();

        console.log('✅ Grocery Store - Owl Carousel Version Loaded Successfully!');