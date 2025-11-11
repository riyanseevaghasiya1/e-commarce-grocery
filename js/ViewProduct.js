// Product Data - Shared across all pages
const allProducts = [
	{ name: "Organic Spring Mix", price: "$35.00", oldPrice: "", rating: "★★★★☆", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800", badge: "Sale 50%", category: "Greens", sku: "OSM-001", description: "Fresh and organic spring mix salad greens delivered right to your doorstep. Our products are carefully selected to ensure the highest quality and freshness. Perfect for healthy meals and snacks." },
	{ name: "Chocolate Sponge Cake", price: "$12.00", oldPrice: "", rating: "★★★★★", img: "https://images.immediate.co.uk/production/volatile/sites/2/2015/05/6522.jpg?resize=600%2C314", badge: "Save 30%", category: "Bakery", sku: "PCSC-002", description: "Delicious chocolate sponge cake from Pepperidge Farm. Moist and rich with premium chocolate flavor. Perfect for celebrations and everyday indulgence." },
	{ name: "Chocolate Chips Cookies", price: "$18.00", oldPrice: "$26.00", rating: "★★★★★", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", badge: "", category: "Bakery", sku: "PBC-003", description: "Premium chocolate chips cookies from Patna Baked Shop. Made with real chocolate chips and finest ingredients. Crispy on the outside, soft on the inside." },
	{ name: "Fresh Organic Apple", price: "$10.00", oldPrice: "$15.00", rating: "★★★★☆", img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800", badge: "New", category: "Fruits", sku: "FA-004", description: "Get farm-fresh organic apples directly sourced from certified orchards. Perfectly crisp, juicy, and full of natural flavor — a healthy snack for everyone!" },
	{ name: "Green Broccoli Bunch", price: "$8.50", oldPrice: "", rating: "★★★★★", img: "https://t4.ftcdn.net/jpg/14/42/26/37/360_F_1442263733_76JmOGACga2UsSUyumrVLhUArpTSUBzP.jpg", badge: "", category: "Vegetables", sku: "GB-005", description: "Fresh green broccoli bunches, rich in vitamins and minerals. Perfect for steaming, roasting, or adding to your favorite dishes." },
	{ name: "Farm Fresh Milk", price: "$5.00", oldPrice: "$6.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/7f/c1/c5/7fc1c5db95a9a9285dad77699f8eae7b.jpg", badge: "Sale", category: "Dairy", sku: "FFM-006", description: "Fresh farm milk, pasteurized and packed with essential nutrients. Perfect for daily consumption and cooking needs." },
	{ name: "Fresh Cheese (500g)", price: "$7.00", oldPrice: "$8.50", rating: "★★★★★", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-d5ddXQF5GIsEk0h2wzNQ9S3YnIT5PnmnTpWz3yhxRSsc1MqvKWFouJS3E7wL4lEPQI&usqp=CAU", badge: "Hot", category: "Dairy", sku: "OBE-007", description: "Premium fresh cheese, creamy and flavorful. Perfect for sandwiches, salads, and cooking. Made from high-quality dairy." },
	{ name: "Premium Basmati Rice (5kg)", price: "$25.00", oldPrice: "$30.00", rating: "★★★★★", img: "https://cpimg.tistatic.com/9505822/b/4/1121-basmati-rice.jpg", badge: "Save 20%", category: "Grains", sku: "PBR-008", description: "Premium quality basmati rice with long grains and aromatic flavor. Perfect for biryanis, pulao, and everyday meals." },
	{ name: "Whole Wheat Bread", price: "$3.00", oldPrice: "$4.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/9f/69/54/9f69540b19c0052b6fb8c5eeb9af5f5d.jpg", badge: "Fresh", category: "Bakery", sku: "WWB-009", description: "Freshly baked whole wheat bread, rich in fiber and nutrients. Perfect for sandwiches and toast. Made daily with natural ingredients." },
	{ name: "Natural Peanut Butter", price: "$9.00", oldPrice: "$12.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/48/92/cb/4892cb41f0344af0a8966aacdca23196.jpg", badge: "", category: "Pantry", sku: "NPB-010", description: "100% natural peanut butter with no added sugar or preservatives. Creamy and delicious, perfect for breakfast and snacks." },
	{ name: "Organic Carrots (1kg)", price: "$6.00", oldPrice: "$7.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/03/78/b2/0378b2f99b9e2eb84900b58c51a9f6dc.jpg", badge: "", category: "Vegetables", sku: "OC-011", description: "Fresh organic carrots, crunchy and sweet. Rich in beta-carotene and vitamins. Perfect for salads, juicing, and cooking." },
	{ name: "Fresh Bananas (Dozen)", price: "$4.50", oldPrice: "$5.00", rating: "★★★★★", img: "https://i.pinimg.com/1200x/d0/bf/38/d0bf380e33dd4f4482073028f86e2c6a.jpg", badge: "New", category: "Fruits", sku: "FB-012", description: "Fresh, ripe bananas packed with potassium and natural energy. Perfect for breakfast, snacks, and smoothies." },
	{ name: "Organic Honey Jar (500ml)", price: "$15.00", oldPrice: "$18.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/7f/4d/50/7f4d503f0ddf73a895a18e51e8e538ed.jpg", badge: "Hot", category: "Pantry", sku: "OHJ-013", description: "Pure organic honey, naturally sweet and full of health benefits. Great for tea, cooking, and as a natural sweetener." },
	{ name: "Almond Milk (1L)", price: "$6.50", oldPrice: "", rating: "★★★★☆", img: "https://i.pinimg.com/736x/48/c7/cf/48c7cf1e0337ddf5c4ba8450f6c26456.jpg", badge: "Vegan", category: "Dairy Alternatives", sku: "AM-014", description: "Creamy almond milk, plant-based and nutritious. Perfect for lactose-intolerant individuals and vegans. Rich in vitamins and minerals." },
	{ name: "Fresh Tomatoes (1kg)", price: "$5.00", oldPrice: "", rating: "★★★★☆", img: "https://i.pinimg.com/736x/ca/5f/89/ca5f89e67adf90b462dc4989268c5e32.jpg", badge: "", category: "Vegetables", sku: "FT-015", description: "Fresh, juicy tomatoes perfect for salads, cooking, and sauces. Rich in lycopene and vitamin C. Farm-fresh quality." },
	{ name: "Olive Oil Extra Virgin (1L)", price: "$20.00", oldPrice: "$25.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/5f/20/54/5f2054d87e1730e1e49adf27d4071ee7.jpg", badge: "Save 15%", category: "Pantry", sku: "OO-016", description: "Premium extra virgin olive oil, cold-pressed and rich in flavor. Perfect for cooking, salads, and dressings. High quality and healthy." },
	{ name: "Potato Chips (Salted)", price: "$3.50", oldPrice: "$4.00", rating: "★★★★☆", img: "https://www.shutterstock.com/image-photo/spicy-potato-chips-seasoning-600nw-2059162091.jpg", badge: "", category: "Snacks", sku: "PC-017", description: "Crispy salted potato chips, perfectly seasoned. Great for snacking and parties. Made from premium potatoes." },
	{ name: "Fresh Spinach (Bundle)", price: "$4.00", oldPrice: "", rating: "★★★★★", img: "https://cdn.britannica.com/30/82530-050-79911DD4/Spinach-leaves-vitamins-source-person.jpg", badge: "Fresh", category: "Greens", sku: "FS-018", description: "Fresh spinach leaves, rich in iron and vitamins. Perfect for salads, smoothies, and cooking. Organic and pesticide-free." },
	{ name: "Organic Brown Sugar (1kg)", price: "$9.00", oldPrice: "$11.00", rating: "★★★★☆", img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/15/turbinado-sugar-on-table.jpg.rend.hgtvcom.1280.1280.85.suffix/1708115391075.webp", badge: "", category: "Pantry", sku: "OBS-019", description: "Organic brown sugar with natural molasses flavor. Perfect for baking and sweetening. Natural and unrefined." },
	{ name: "Coconut Oil (500ml)", price: "$14.00", oldPrice: "$16.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/4d/ae/9d/4dae9de3f44d4ca5d0aefd8f6ee845ab.jpg", badge: "New", category: "Pantry", sku: "CPCO-020", description: "Cold-pressed coconut oil, pure and unrefined. Great for cooking, skincare, and hair care. Rich in healthy fats and nutrients." }
];

// Function to navigate to ProductDetails page with product index
function viewProductDetails(productIndex) {
	if (productIndex >= 0 && productIndex < allProducts.length) {
		const product = allProducts[productIndex];
		// Store product data directly in sessionStorage (same as home.html approach)
		sessionStorage.setItem('selectedProductData', JSON.stringify(product));
		// Also store product index for backward compatibility
		sessionStorage.setItem('selectedProductIndex', productIndex);
		// Navigate to ProductDetails page
		window.location.href = './ProductDetails.html';
	} else {
		console.error('Invalid product index:', productIndex);
	}
}

// Function to get product by index
function getProductByIndex(index) {
	if (index >= 0 && index < allProducts.length) {
		return allProducts[index];
	}
	return null;
}

// Function to get product by SKU
function getProductBySKU(sku) {
	return allProducts.find(p => p.sku === sku);
}

