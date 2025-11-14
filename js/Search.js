// Search functionality for header search bar
(function() {
    'use strict';

    // Wait for DOM and allProducts to be available
    function initSearch() {
        // Check if allProducts is available
        if (typeof allProducts === 'undefined') {
            console.warn('allProducts not found. Retrying in 100ms...');
            setTimeout(initSearch, 100);
            return;
        }

        // Get search input elements (desktop and mobile)
        const desktopSearchInput = document.getElementById('headerSearchDesktop') || 
            document.querySelector('header input[type="text"][placeholder*="looking for"]');
        const mobileSearchInput = document.getElementById('headerSearchMobile') || 
            document.querySelector('#offcanvas input[type="text"][placeholder*="looking for"]');

        // Create search results containers
        let desktopSearchContainer = null;
        let mobileSearchContainer = null;

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
            return allProducts.filter(product => {
                const nameMatch = product.name.toLowerCase().includes(searchTerm);
                const categoryMatch = product.category.toLowerCase().includes(searchTerm);
                const descriptionMatch = product.description.toLowerCase().includes(searchTerm);
                return nameMatch || categoryMatch || descriptionMatch;
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
                                ">${product.price}</span>
                                ${product.oldPrice ? `<span style="
                                    font-size: 14px;
                                    color: #9ca3af;
                                    text-decoration: line-through;
                                ">${product.oldPrice}</span>` : ''}
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
                    const productIndex = allProducts.indexOf(product);
                    const cardDiv = document.createElement('div');
                    cardDiv.innerHTML = renderProductCard(product, productIndex);
                    
                    // Add click handler
                    const cardElement = cardDiv.firstElementChild;
                    cardElement.addEventListener('click', function(e) {
                        e.stopPropagation();
                        if (typeof viewProductDetails === 'function') {
                            viewProductDetails(productIndex);
                        } else {
                            // Fallback: use sessionStorage
                            sessionStorage.setItem('selectedProductData', JSON.stringify(product));
                            sessionStorage.setItem('selectedProductIndex', productIndex);
                            window.location.href = './ProductDetails.html';
                        }
                        hideAllSearchResults();
                    });

                    container.appendChild(cardDiv);
                });

                // Add "View All Results" link if more than 5 results
                if (results.length > 5) {
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
                    return;
                }

                // Debounce search
                searchTimeout = setTimeout(() => {
                    showSearchResults(query, desktopSearchInput);
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
                    return;
                }

                // Debounce search
                mobileSearchTimeout = setTimeout(() => {
                    showSearchResults(query, mobileSearchInput);
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
                        window.location.href = `./Shop.html?search=${encodeURIComponent(query)}`;
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

