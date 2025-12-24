// Search functionality for header search bar
(function() {
    'use strict';

    // Wait for DOM, inputs are discovered dynamically even if header loads later
    function initSearch() {
        // Get search input elements (desktop and mobile)
        const desktopSearchInput = document.getElementById('headerSearchDesktop') || 
            document.querySelector('header input[type="text"][placeholder*="looking for"]');
        const mobileSearchInput = document.getElementById('headerSearchMobile') || 
            document.querySelector('#offcanvas input[type="text"][placeholder*="looking for"]');

        if (!desktopSearchInput && !mobileSearchInput) {
            setTimeout(initSearch, 300);
            return;
        }

        // Create search results containers
        let desktopSearchContainer = null;
        let mobileSearchContainer = null;

        function getCurrentPage() {
            const p = window.location.pathname.split('/').pop().toLowerCase();
            return p || '';
        }
        function normalizeId(s) {
            return String(s || '').toLowerCase().trim();
        }
        function mapCartItems() {
            let items = [];
            try { items = JSON.parse(localStorage.getItem('cart') || '[]'); } catch (e) { items = []; }
            return items.map(it => ({
                name: it.name || 'Product',
                img: it.image || '',
                price: it.price || '$0.00',
                oldPrice: '',
                rating: '★★★★★',
                badge: 'In Cart',
                __source: 'cart',
                __key: normalizeId(it.id || it.name)
            }));
        }
        function mapWishlistItems() {
            let items = [];
            try { items = JSON.parse(localStorage.getItem('wishlist') || '[]'); } catch (e) { items = []; }
            return items.map(it => ({
                name: it.name || 'Product',
                img: it.image || it.img || '',
                price: it.price || '$0.00',
                oldPrice: '',
                rating: '★★★★★',
                badge: 'Wishlist',
                __source: 'wishlist',
                __key: normalizeId(it.id || it.name)
            }));
        }
        function getSearchDataset() {
            const page = getCurrentPage();
            if (page === 'cart.html') return mapCartItems();
            if (page === 'wishlist.html') return mapWishlistItems();
            return (allProducts || []).map(p => Object.assign({ __source: 'all', __key: normalizeId(p.name) }, p));
        }
        function reorderContainer(containerSelector, query) {
            const container = document.querySelector(containerSelector);
            if (!container) return;
            const q = String(query || '').toLowerCase().trim();
            if (!q) {
                if (typeof loadCartItems === 'function' && containerSelector === '#cartItemsContainer') {
                    try { loadCartItems(); } catch (e) {}
                    return;
                }
                if (typeof renderWishlistPage === 'function' && containerSelector === '#wishlistContainer') {
                    try { renderWishlistPage(); } catch (e) {}
                    return;
                }
            }
            const rows = Array.from(container.children).filter(el => el && el.nodeType === 1);
            const readName = (row) => {
                const h3 = row.querySelector('h3');
                if (h3) return h3.textContent.trim();
                const btn = row.querySelector('button.text-left');
                if (btn) return btn.textContent.trim();
                return (row.textContent || '').trim();
            };
            const matched = [];
            const rest = [];
            rows.forEach(r => {
                const name = readName(r).toLowerCase();
                if (name.includes(q)) matched.push(r); else rest.push(r);
            });
            const newOrder = matched.concat(rest);
            newOrder.forEach(r => container.appendChild(r));
        }
        function reorderPageList(query) {
            const page = getCurrentPage();
            if (page === 'cart.html') reorderContainer('#cartItemsContainer', query);
            else if (page === 'wishlist.html') reorderContainer('#wishlistContainer', query);
        }

        // Function to create search results container
        function createSearchResultsContainer(isMobile = false) {
            const containerId = isMobile ? 'mobileSearchResultsContainer' : 'desktopSearchResultsContainer';
            let container = document.getElementById(containerId);
            
            if (container) return container;

            container = document.createElement('div');
            container.id = containerId;
            container.className = 'search-results-container';
            container.style.cssText = `
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                max-height: 600px;
                overflow-y: auto;
                z-index: 1000;
                margin-top: 8px;
                display: none;
            `;
            
            if (isMobile) {
                mobileSearchContainer = container;
            } else {
                desktopSearchContainer = container;
            }
            
            return container;
        }

        // Function to search products
        function searchProducts(query) {
            if (!query || query.trim().length === 0) {
                return [];
            }

            const searchTerm = query.toLowerCase().trim();
            const dataset = getSearchDataset();
            return dataset.filter(product => {
                const nameMatch = (product.name || '').toLowerCase().includes(searchTerm);
                if (product.__source === 'all') {
                    const categoryMatch = (product.category || '').toLowerCase().includes(searchTerm);
                    const descriptionMatch = (product.description || '').toLowerCase().includes(searchTerm);
                    return nameMatch || categoryMatch || descriptionMatch;
                }
                return nameMatch;
            });
        }

        // Function to render product card
        function renderProductCard(product, index) {
            return `
                <div class="search-product-card" data-index="${index}" style="
                    padding: 16px;
                    border-bottom: 1px solid #f3f4f6;
                    cursor: pointer;
                    transition: background-color 0.2s;
                " onmouseover="this.style.backgroundColor='#f9fafb'" onmouseout="this.style.backgroundColor='white'">
                    <div style="display: flex; gap: 16px; align-items: center;">
                        <img src="${product.img}" alt="${product.name}" style="
                            width: 80px;
                            height: 80px;
                            object-fit: cover;
                            border-radius: 8px;
                        ">
                        <div style="flex: 1;">
                            <h4 style="
                                font-size: 16px;
                                font-weight: 600;
                                color: #111827;
                                margin: 0 0 8px 0;
                            ">${product.name}</h4>
                            <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
                                <span style="
                                    font-size: 18px;
                                    font-weight: 700;
                                    color: #02B290;
                                ">$ ${product.basePrice}</span>
                                <span style="
                                    font-size: 14px;
                                    color: #fbbf24;
                                ">${product.rating}</span>
                            </div>
                            ${product.badge ? `<span style="
                                display: inline-block;
                                background: #02B290;
                                color: white;
                                font-size: 12px;
                                padding: 4px 8px;
                                border-radius: 4px;
                                margin-top: 8px;
                            ">${product.badge}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        }

        // Function to show search results
        function showSearchResults(query, searchInput) {
            const results = searchProducts(query);
            const isMobile = searchInput.id === 'headerSearchMobile';
            const container = createSearchResultsContainer(isMobile);
            const dataset = getSearchDataset();
            const isAll = dataset.length && dataset[0].__source === 'all';

            // Clear previous results
            container.innerHTML = '';

            if (results.length === 0) {
                container.innerHTML = `
                    <div style="padding: 40px; text-align: center; color: #6b7280;">
                        <i class="fas fa-search" style="font-size: 48px; margin-bottom: 16px; opacity: 0.5;"></i>
                        <p style="font-size: 16px; margin: 0;">No products found for "${query}"</p>
                    </div>
                `;
            } else {
                // Add header
                const header = document.createElement('div');
                header.style.cssText = `
                    padding: 12px 16px;
                    background: #f9fafb;
                    border-bottom: 1px solid #e5e7eb;
                    font-weight: 600;
                    color: #374151;
                    font-size: 14px;
                `;
                header.textContent = `Found ${results.length} product${results.length !== 1 ? 's' : ''}`;
                container.appendChild(header);

                // Add product cards
                results.forEach((product, idx) => {
                    const productIndex = product.__source === 'all' ? allProducts.indexOf(product) : idx;
                    const cardDiv = document.createElement('div');
                    cardDiv.innerHTML = renderProductCard(product, productIndex);
                    
                    // Add click handler
                    const cardElement = cardDiv.firstElementChild;
                    cardElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (product.__source === 'all') {
                            if (typeof viewProductDetails === 'function') {
                                viewProductDetails(productIndex);
                            } else {
                                sessionStorage.setItem('selectedProductData', JSON.stringify(product));
                                sessionStorage.setItem('selectedProductIndex', productIndex);
                                window.location.href = './ProductDetails.html';
                            }
                        } else if (product.__source === 'cart') {
                            const key = product.__key;
                            const row = document.querySelector(`#cartItemsContainer [data-id="${key}"]`) || Array.from(document.querySelectorAll('#cartItemsContainer .grid')).find(el => (el.textContent || '').toLowerCase().includes(product.name.toLowerCase()));
                            if (row) {
                                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                row.style.transition = 'background-color 0.3s';
                                row.style.backgroundColor = '#f0fdf4';
                                setTimeout(() => { row.style.backgroundColor = ''; }, 1200);
                            }
                        } else if (product.__source === 'wishlist') {
                            const key = product.__key;
                            const row = document.querySelector(`#wishlistContainer [data-id="${key}"]`) || Array.from(document.querySelectorAll('#wishlistContainer .p-6')).find(el => (el.textContent || '').toLowerCase().includes(product.name.toLowerCase()));
                            if (row) {
                                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                row.style.transition = 'background-color 0.3s';
                                row.style.backgroundColor = '#f0fdf4';
                                setTimeout(() => { row.style.backgroundColor = ''; }, 1200);
                            }
                        }
                        hideAllSearchResults();
                    });

                    container.appendChild(cardDiv);
                });

                if (isAll && results.length > 5) {
                    const viewAllDiv = document.createElement('div');
                    viewAllDiv.style.cssText = `
                        padding: 12px 16px;
                        text-align: center;
                        background: #f9fafb;
                        border-top: 1px solid #e5e7eb;
                    `;
                    const viewAllLink = document.createElement('a');
                    viewAllLink.href = `./Shop.html?search=${encodeURIComponent(query)}`;
                    viewAllLink.textContent = `View all ${results.length} results`;
                    viewAllLink.style.cssText = `
                        color: #02B290;
                        font-weight: 600;
                        text-decoration: none;
                    `;
                    viewAllDiv.appendChild(viewAllLink);
                    container.appendChild(viewAllDiv);
                }
            }

            // Position and show container
            const searchWrapper = searchInput.closest('.relative') || searchInput.parentElement;
            if (searchWrapper) {
                searchWrapper.style.position = 'relative';
                if (!searchWrapper.contains(container)) {
                    searchWrapper.appendChild(container);
                }
                container.style.display = 'block';
            }
        }

        // Function to hide search results
        function hideSearchResults(isMobile = false) {
            const container = isMobile ? mobileSearchContainer : desktopSearchContainer;
            if (container) {
                container.style.display = 'none';
            }
        }

        // Function to hide all search results
        function hideAllSearchResults() {
            if (desktopSearchContainer) {
                desktopSearchContainer.style.display = 'none';
            }
            if (mobileSearchContainer) {
                mobileSearchContainer.style.display = 'none';
            }
        }

        // Setup search for desktop
        if (desktopSearchInput) {
            let searchTimeout;
            
            desktopSearchInput.addEventListener('input', function(e) {
                const query = e.target.value;
                clearTimeout(searchTimeout);
                
                if (query.trim().length === 0) {
                    hideSearchResults(false);
                    reorderPageList('');
                    return;
                }

                // Debounce search
                searchTimeout = setTimeout(() => {
                    showSearchResults(query, desktopSearchInput);
                    reorderPageList(query);
                }, 300);
            });

            desktopSearchInput.addEventListener('focus', function(e) {
                const query = e.target.value;
                if (query.trim().length > 0) {
                    showSearchResults(query, desktopSearchInput);
                }
            });

            // Hide results when clicking outside
            document.addEventListener('click', function(e) {
                if (!desktopSearchInput.contains(e.target) && 
                    (!desktopSearchContainer || !desktopSearchContainer.contains(e.target))) {
                    hideSearchResults(false);
                }
            });
        }

        // Setup search for mobile
        if (mobileSearchInput) {
            let mobileSearchTimeout;
            
            mobileSearchInput.addEventListener('input', function(e) {
                const query = e.target.value;
                clearTimeout(mobileSearchTimeout);
                
                if (query.trim().length === 0) {
                    hideSearchResults(true);
                    reorderPageList('');
                    return;
                }

                // Debounce search
                mobileSearchTimeout = setTimeout(() => {
                    showSearchResults(query, mobileSearchInput);
                    reorderPageList(query);
                }, 300);
            });

            mobileSearchInput.addEventListener('focus', function(e) {
                const query = e.target.value;
                if (query.trim().length > 0) {
                    showSearchResults(query, mobileSearchInput);
                }
            });

            // Hide results when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileSearchInput.contains(e.target) && 
                    (!mobileSearchContainer || !mobileSearchContainer.contains(e.target))) {
                    hideSearchResults(true);
                }
            });
        }

        // Handle Enter key to navigate to shop page with search
        function handleEnterKey(input) {
            input.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    const query = e.target.value.trim();
                    if (query.length > 0) {
                        e.preventDefault();
                        const dataset = getSearchDataset();
                        const isAll = dataset.length && dataset[0].__source === 'all';
                        if (isAll) {
                            window.location.href = `./Shop.html?search=${encodeURIComponent(query)}`;
                        } else {
                            showSearchResults(query, input);
                            reorderPageList(query);
                        }
                    }
                }
            });
        }

        if (desktopSearchInput) handleEnterKey(desktopSearchInput);
        if (mobileSearchInput) handleEnterKey(mobileSearchInput);
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSearch);
    } else {
        initSearch();
    }

    // Also try to initialize after a short delay in case scripts load in different order
    setTimeout(initSearch, 500);
})();

