$(document).ready(function () {
    // ==========================================
    // CATEGORY SLIDER INITIALIZATION
    // ==========================================
    $(document).ready(function () {
        $(".shop-categories-track").owlCarousel({
            loop: false,
            margin: 20,
            nav: false,
            dots: true,
            autoplay: false,
            smartSpeed: 600,
            responsive: {
                0: { items: 2 },
                480: { items: 3 },
                768: { items: 4 },
                992: { items: 5 },
                1200: { items: 7 }
            }
        });
    });


    // ==========================================
    // BEST SELLERS CAROUSEL
    // ==========================================
    var bestSellersCarousel = $('#bestSellers').owlCarousel({
        loop: false,
         margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }
        }
    });

    // ==========================================
    // DEAL OF THE DAY CAROUSEL
    // ==========================================
    var freshVegCarousel = $('#freshVeg').owlCarousel({
        loop: false,
        margin: 20,
        nav: false,
        dots: false,
        autoplay: false,
        responsive: {
            0: { items: 1 },
            480: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 5 }

        }
    })

    var testimonialSlider = $('#testimonialSlider').owlCarousel({
        loop: true,
        // margin: 20,
        center: true,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3500,
        smartSpeed: 800,
        responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1024: { items: 3 },
            480: { items: 2 },
            768: { items: 3 },
            992: { items: 4 },
            1200: { items: 4 }
        }
    });



    // Currency Change
    document.getElementById("currencySelect").addEventListener("change", function () {
        let curr = this.value;
        document.querySelectorAll(".trend-price").forEach(el => {
            let usd = parseFloat(el.dataset.usd);

            if (curr === "USD") el.innerText = "$" + usd.toFixed(2);
            if (curr === "INR") el.innerText = "₹" + (usd * 83).toFixed(0);
            if (curr === "EUR") el.innerText = "€" + (usd * 0.92).toFixed(2);
        });
    });


    // ==========================================
    // CATEGORY CLICK HANDLER
    // ==========================================
    $('.shop-category-item').click(function () {
        const categoryName = $(this).find('.shop-category-name').text().trim();
        localStorage.setItem('selectedCategory', categoryName);
        window.location.href = './Shop.html';
    });


    // ==========================================
    // QUICK VIEW MODAL FUNCTIONS
    // ==========================================


    // ==========================================
    // COMPLETE QUICK VIEW SOLUTION
    // Place this code at the TOP of home.js (before document.ready)
    // ==========================================

    // Global Quick View Functions
    window.openQuickView = function (button) {
        console.log('🔍 Opening Quick View...', button);

        // Get product card
        const productCard = button.closest('.product-card');
        if (!productCard) {
            console.error('❌ Product card not found');
            return;
        }

        console.log('✅ Product card found:', productCard);

        // Get product details
        const productImage = productCard.querySelector('.product-image');
        const productName = productCard.querySelector('.product-name');
        const productPrice = productCard.querySelector('.current-price');
        const oldPrice = productCard.querySelector('.old-price');
        const rating = productCard.querySelector('.stars');
        const badge = productCard.querySelector('.product-badge');

        console.log('Product details:', {
            name: productName?.textContent,
            price: productPrice?.textContent,
            image: productImage?.src
        });

        // Get modal elements
        const modal = document.getElementById('quickViewModal');
        const modalImage = document.getElementById('modalProductImage');
        const modalName = document.getElementById('modalProductName');
        const modalPrice = document.getElementById('modalProductPrice');
        const modalDescription = document.getElementById('modalProductDescription');
        const modalCategory = document.getElementById('modalProductCategory');
        const modalSKU = document.getElementById('modalProductSKU');
        const quantityInput = document.getElementById('quantityInput');

        if (!modal) {
            console.error('❌ Modal not found! Make sure #quickViewModal exists in HTML');
            return;
        }

        // Update modal content
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

        if (modalDescription && productName) {
            modalDescription.textContent = `${productName.textContent} - Fresh and organic product delivered right to your doorstep. Our products are carefully selected to ensure the highest quality and freshness.`;
        }

        if (quantityInput) {
            quantityInput.value = 1;
        }

        // Show modal
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            modal.classList.add('show');
        }, 10);

        console.log('✅ Modal opened successfully');
    };

    window.closeQuickView = function () {
        console.log('❌ Closing Quick View...');
        const modal = document.getElementById('quickViewModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 300);
        }
    };

    window.increaseQuantity = function () {
        const input = document.getElementById('quantityInput');
        if (input) {
            const currentValue = parseInt(input.value) || 1;
            input.value = Math.min(currentValue + 1, 99);
        }
    };

    window.decreaseQuantity = function () {
        const input = document.getElementById('quantityInput');
        if (input) {
            const currentValue = parseInt(input.value) || 1;
            input.value = Math.max(currentValue - 1, 1);
        }
    };

        window.addToCartFromModal = function () {
            const productName = document.getElementById('modalProductName');
            const productPrice = document.getElementById('modalProductPrice');
            const productImage = document.getElementById('modalProductImage');
            const quantity = document.getElementById('quantityInput');

            if (productName && quantity) {
                const weightText = window.qvHomeState?.weightLabel ||
                    (window.modalProductMeta ? `${window.modalProductMeta.quantity} ${window.modalProductMeta.unit}` : '');

                const unitPrice = Number(window.qvHomeState?.unitPriceNum || 0) || Number(productPrice?.textContent?.replace(/[^0-9.]/g, '')) || 0;

                const product = {
                    name: cleanProductName(productName.textContent),
                    weight: weightText,
                    price: `$${unitPrice.toFixed(2)}`,
                    image: productImage ? productImage.src : '',
                    quantity: parseInt(quantity.value) || 1
                };

                console.log(`🛒 Added ${quantity.value}x "${productName.textContent}" (${product.weight || 'default'}) to cart!`);

                if (typeof window.upsertCart === 'function') {
                    window.upsertCart(product);
                } else {
                    let cart = JSON.parse(localStorage.getItem('cart')) || [];
                    const existing = cart.find(item => item.name === product.name && item.weight === product.weight);
                    if (existing) {
                        existing.quantity += product.quantity;
                    } else {
                        cart.push(product);
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                }
                if (typeof updateAddToCartButtons === 'function') updateAddToCartButtons();

                const btn = document.querySelector('.modal-add-to-cart');
                if (btn) {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check"></i> Added!';
                    btn.style.background = '#02B290';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.background = '';
                    }, 1500);
                }

                setTimeout(() => {
                    window.closeQuickView();
                }, 1500);
            }
        };

    // ==========================================
    // EVENT LISTENERS SETUP
    // ==========================================
    document.addEventListener('DOMContentLoaded', function () {
        console.log('🚀 Setting up Quick View event listeners...');

        // Method 1: Direct click on eye button (works for static content)
        document.addEventListener('click', function (e) {
            // Check if clicked element or its parent is the eye button
            const actionBtn = e.target.closest('.action-btn');

            if (actionBtn) {
                const icon = actionBtn.querySelector('i');
                if (icon && (icon.classList.contains('fa-eye') || icon.classList.contains('far'))) {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('👁️ Eye button clicked!');
                    window.openQuickView(actionBtn);
                }
            }
        });

        // Close modal on overlay click
        const modal = document.getElementById('quickViewModal');
        if (modal) {
            modal.addEventListener('click', function (e) {
                if (e.target === this) {
                    window.closeQuickView();
                }
            });
        }

        // Close on Escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const modal = document.getElementById('quickViewModal');
                if (modal && modal.classList.contains('show')) {
                    window.closeQuickView();
                }
            }
        });

        // Quantity input validation
        const quantityInput = document.getElementById('quantityInput');
        if (quantityInput) {
            quantityInput.addEventListener('input', function () {
                let value = parseInt(this.value);
                if (isNaN(value) || value < 1) this.value = 1;
                if (value > 99) this.value = 99;
            });

            quantityInput.addEventListener('blur', function () {
                if (this.value === '' || isNaN(this.value)) this.value = 1;
            });
        }

        console.log('✅ Quick View event listeners set up successfully!');
    });

    console.log('✅ Quick View module loaded!');

    // ==========================================
    // QUANTITY CONTROLS
    // ==========================================
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

    // ==========================================
    // ADD TO CART FROM MODAL
    // ==========================================
    function addToCartFromModal() {
        const productName = document.getElementById('modalProductName');
        const quantity = document.getElementById('quantityInput');

        if (productName && quantity) {
            console.log(`Added ${quantity.value}x "${productName.textContent}" to cart!`);

            const btn = document.querySelector('.modal-add-to-cart');
            if (btn) {
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Added!';
                btn.style.background = '#02B290';

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

    // MAKE THEM GLOBAL 👇👇
    // window.openQuickView = openQuickView;
    // window.closeQuickView = closeQuickView;
    // window.increaseQuantity = increaseQuantity;
    // window.decreaseQuantity = decreaseQuantity;
    // window.addToCartFromModal = addToCartFromModal;


    // ==========================================
    // ADD TO WISHLIST (Fallback)
    // ==========================================
    if (typeof window.addToWishlist === 'undefined') {
        window.addToWishlist = function (button) {
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
        };
    }

    // ==========================================
    // ADD TO CART (Fallback)
    // ==========================================
    if (typeof window.addToCart === 'undefined') {
        window.addToCart = function (button) {
            const productCard = button.closest('.product-card');
            if (productCard) {
                const productName = productCard.querySelector('.product-name').textContent;
                const productPrice = productCard.querySelector('.current-price').textContent;
                console.log(`🛒 Added "${productName}" (${productPrice}) to cart!`);

                button.style.transform = 'scale(1.2)';
                button.style.background = '#02B290';
                button.style.color = 'white';

                setTimeout(() => {
                    button.style.transform = '';
                    button.style.background = '';
                    button.style.color = '';
                }, 300);
            }
        };
    }

    // ==========================================
    // MODAL CLOSE HANDLERS
    // ==========================================
    document.getElementById('quickViewModal')?.addEventListener('click', function (e) {
        if (e.target === this) closeQuickView();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('quickViewModal');
            if (modal && modal.classList.contains('show')) closeQuickView();
        }
    });

    // ==========================================
    // QUANTITY INPUT VALIDATION
    // ==========================================
    const quantityInput = document.getElementById('quantityInput');
    if (quantityInput) {
        quantityInput.addEventListener('input', function () {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) this.value = 1;
            if (value > 99) this.value = 99;
        });

        quantityInput.addEventListener('blur', function () {
            if (this.value === '' || isNaN(this.value)) this.value = 1;
        });
    }

    // ==========================================
    // HERO BUTTONS
    // ==========================================
    document.querySelectorAll('.hero-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('Explore More clicked');
        });
    });

    // ==========================================
    // FEATURE CARDS
    // ==========================================
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function (e) {
            if (e.target.tagName !== 'A') {
                const title = this.querySelector('.feature-title').textContent;
                console.log(`Feature selected: ${title}`);
            }
        });
    });

    // ==========================================
    // COLLECTION CARDS
    // ==========================================
    document.querySelectorAll('.collection-card').forEach(card => {
        card.addEventListener('click', function () {
            const title = this.querySelector('.collection-title').textContent;
            console.log(`Collection selected: ${title}`);
        });
    });

    // ==========================================
    // PREVENT DEFAULT FOR DEMO LINKS
    // ==========================================
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', e => e.preventDefault());
    });

    // ==========================================
    // SCROLL REVEAL ANIMATION
    // ==========================================
    function revealOnScroll() {
        const elements = document.querySelectorAll('.collection-card, .feature-card, .product-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            observer.observe(element);
        });
    }

    revealOnScroll();

    // ==========================================
    // PRODUCT CARD CLICK HANDLERS
    // ==========================================
    setupProductCardClicks();

    function setupProductCardClicks() {
        document.querySelectorAll('.product-card').forEach(card => {
            if (card.dataset.clickHandlerAdded === 'true') return;
            card.dataset.clickHandlerAdded = 'true';

            const buttons = card.querySelectorAll('button, .action-btn, .add-to-cart');
            buttons.forEach(btn => {
                btn.addEventListener('click', e => e.stopPropagation());
            });

            card.addEventListener('click', function (e) {
                if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.product-actions') ||
                    e.target.closest('.action-btn') || e.target.closest('.add-to-cart')) return;

                e.preventDefault();
                e.stopPropagation();
                handleProductCardClick(this);
            });
        });
    }

    setTimeout(() => setupProductCardClicks(), 500);

    if (typeof $.fn.owlCarousel !== 'undefined') {
        $('#bestSellers, #freshVeg').on('initialized.owl.carousel', () => {
            setTimeout(() => setupProductCardClicks(), 100);
        });
    }

    // ==========================================
    // HANDLE PRODUCT CARD CLICK
    // ==========================================
    function handleProductCardClick(cardElement) {
        const productNameElement = cardElement.querySelector('.product-name');
        if (!productNameElement) return;

        // Card titles may include weight in parentheses, e.g., "Wheat Flour (10 Kg)"
        // Strip trailing parentheses to match canonical names in ViewProduct.js
        const rawName = productNameElement.textContent.trim();
        const productName = rawName.replace(/\s*\(.*\)\s*$/, '').trim();

        if (typeof allProducts !== 'undefined' && allProducts.length > 0) {
            let productIndex = allProducts.findIndex(p => p.name.toLowerCase() === productName.toLowerCase());
            if (productIndex === -1) {
                productIndex = allProducts.findIndex(p =>
                    p.name.toLowerCase().includes(productName.toLowerCase()) ||
                    productName.toLowerCase().includes(p.name.toLowerCase())
                );
            }

            if (productIndex === -1) {
                const productImage = cardElement.querySelector('.product-image');
                const productPrice = cardElement.querySelector('.current-price');
                const oldPriceElement = cardElement.querySelector('.old-price');
                const ratingElement = cardElement.querySelector('.stars');

                // Heuristics for quantity/unit when card does not map to allProducts
                const heuristics = (function (n) {
                    const nameLower = (n || '').toLowerCase();
                    if (/(drink|soft|juice|oil|milk)/.test(nameLower)) return { quantity: 1, unit: 'L' };
                    if (/(diaper|egg|bread|cookie|kurkure|piece|pcs)/.test(nameLower)) return { quantity: 1, unit: 'pcs' };
                    return { quantity: 1, unit: 'Kg' };
                })(productName);

                const productData = {
                    name: productName,
                    price: productPrice ? productPrice.textContent.trim() : '$0.00',
                    oldPrice: oldPriceElement ? oldPriceElement.textContent.trim() : '',
                    img: productImage ? productImage.src : '',
                    rating: ratingElement ? ratingElement.textContent.trim() : '★★★★☆',
                    badge: '',
                    category: 'Vegetables',
                    sku: 'HOME-' + Date.now(),
                    description: `${productName} - Fresh and organic product delivered right to your doorstep.`,
                    quantity: heuristics.quantity,
                    unit: heuristics.unit
                };

                sessionStorage.setItem('selectedProductData', JSON.stringify(productData));
                window.location.href = './ProductDetails.html';
                return;
            }

            if (typeof viewProductDetails === 'function') {
                viewProductDetails(productIndex);
            } else {
                console.error('viewProductDetails function not found');
            }
        } else {
            console.error('allProducts array not loaded');
            const productImage = cardElement.querySelector('.product-image');
            const productPrice = cardElement.querySelector('.current-price');
            const oldPriceElement = cardElement.querySelector('.old-price');
            const ratingElement = cardElement.querySelector('.stars');

            const productData = {
                name: productName,
                price: productPrice ? productPrice.textContent.trim() : '$0.00',
                oldPrice: oldPriceElement ? oldPriceElement.textContent.trim() : '',
                img: productImage ? productImage.src : '',
                rating: ratingElement ? ratingElement.textContent.trim() : '★★★★☆',
                badge: '',
                category: 'Vegetables',
                sku: 'HOME-' + Date.now(),
                description: `${productName} - Fresh and organic product delivered right to your doorstep.`
            };

            sessionStorage.setItem('selectedProductData', JSON.stringify(productData));
            window.location.href = './ProductDetails.html';
        }
    }

    // ==========================================
    // SCROLL PRODUCTS FUNCTION
    // ==========================================
    function scrollProducts(sliderId, direction) {
        const slider = document.getElementById(sliderId);
        if (!slider) return;

        if (typeof $ !== 'undefined' && $(slider).hasClass('owl-carousel')) {
            if (direction === -1) {
                $(slider).trigger('prev.owl.carousel');
            } else {
                $(slider).trigger('next.owl.carousel');
            }
        } else {
            const scrollAmount = slider.offsetWidth * 0.8;
            slider.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    // ==========================================
    // RESET FILTERS
    // ==========================================
    function resetFilters() {
        const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        filterInputs.forEach(input => input.checked = false);

        const filterSelects = document.querySelectorAll('select.filter-select');
        filterSelects.forEach(select => select.selectedIndex = 0);

        console.log('Filters reset');
    }

    // ==========================================
    // LOGS
    // ==========================================
    console.log('✅ Home.js loaded successfully!');
    console.log('✅ Grocery Store - Owl Carousel Version Loaded Successfully!');
});

// UNIVERSAL SCROLL FUNCTION FOR ALL PRODUCT SLIDERS
function scrollProducts(id, direction) {
    var carousel = $("#" + id).data('owl.carousel');

    if (!carousel) return;

    if (direction === 1) {
        $("#" + id).trigger('next.owl.carousel');
    } else {
        $("#" + id).trigger('prev.owl.carousel');
    }
}

