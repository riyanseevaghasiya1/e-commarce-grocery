// Product Data - Shared across all pages
// Product Data - Shared across all pages
const allProducts = [
  // 🥬 Fresh Produce
  { name: "Organic Spinach (250g)", price: "$3.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/30/7c/1a/307c1a8d221f7817e3eb8ff6cfed4c2f.jpg", badge: "Fresh", category: "Fresh Produce", sku: "FP-001", description: "Fresh organic spinach leaves packed with nutrients." },
  { name: "Farm Fresh Tomatoes (1kg)", price: "$4.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/ca/5f/89/ca5f89e67adf90b462dc4989268c5e32.jpg", badge: "New", category: "Fresh Produce", sku: "FP-002", description: "Juicy tomatoes straight from local farms." },

  // 🍞 Bakery & Dairy
  { name: "Whole Wheat Bread", price: "$3.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/9f/69/54/9f69540b19c0052b6fb8c5eeb9af5f5d.jpg", badge: "Fresh", category: "Bakery & Dairy", sku: "BD-001", description: "Soft and freshly baked whole wheat bread." },
  { name: "Farm Fresh Milk (1L)", price: "$5.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/7f/c1/c5/7fc1c5db95a9a9285dad77699f8eae7b.jpg", badge: "Hot", category: "Bakery & Dairy", sku: "BD-002", description: "Pure milk from local farms." },

  // 🌾 Staples & Grains
  { name: "Basmati Rice (5kg)", price: "$25.00", rating: "★★★★★", img: "https://cpimg.tistatic.com/9505822/b/4/1121-basmati-rice.jpg", badge: "Save 20%", category: "Staples & Grains", sku: "SG-001", description: "Premium long-grain basmati rice." },
  { name: "Wheat Flour (10kg)", price: "$15.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/7a/03/4b/7a034b60c73983f601e20f67a3c0df1c.jpg", badge: "", category: "Staples & Grains", sku: "SG-002", description: "High-quality whole wheat flour for soft rotis." },

  // 🌶 Masala & Spices
  { name: "Turmeric Powder (200g)", price: "$4.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/00/30/14/00301409b2552a92326f76092ff5a58c.jpg", badge: "", category: "Masala & Spices", sku: "MS-001", description: "Pure turmeric powder for everyday cooking." },
  { name: "Cumin Seeds (250g)", price: "$5.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/6f/42/46/6f4246f139ffb8e06198a3288a53f407.jpg", badge: "Hot", category: "Masala & Spices", sku: "MS-002", description: "Aromatic cumin seeds packed with flavor." },

  // 🍿 Snacks & Branded Foods
  { name: "Potato Chips (Salted)", price: "$3.00", rating: "★★★★☆", img: "https://www.shutterstock.com/image-photo/spicy-potato-chips-seasoning-600nw-2059162091.jpg", badge: "", category: "Snacks & Branded Foods", sku: "SB-001", description: "Crispy and salty chips for perfect snacking." },
  { name: "Salted Cashews (250g)", price: "$9.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/9d/77/7b/9d777b6d4acb6358b214b17df4cb2e2e.jpg", badge: "New", category: "Snacks & Branded Foods", sku: "SB-002", description: "Crunchy salted cashews, a healthy snack." },

  // 🥫 Packaged & Canned Foods
  { name: "Baked Beans (400g)", price: "$4.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/b8/4a/90/b84a90633b7473b62062368d1fbdc716.jpg", badge: "", category: "Packaged & Canned Foods", sku: "PC-001", description: "Ready-to-eat baked beans rich in protein." },
  { name: "Sweet Corn (Tin)", price: "$3.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/15/38/5c/15385c5a3b8cebe818d0c7808e1a041d.jpg", badge: "Fresh", category: "Packaged & Canned Foods", sku: "PC-002", description: "Sweet corn kernels in brine for instant use." },

  // ☕ Beverages
  { name: "Orange Juice (1L)", price: "$7.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/ed/37/8d/ed378dfd2931aaf49a8cf08b534d4a1c.jpg", badge: "Hot", category: "Beverages", sku: "BV-001", description: "Refreshing orange juice with no preservatives." },
  { name: "Cold Coffee (300ml)", price: "$3.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/63/2c/3b/632c3bcb89edb86b6c9a2a50f68cefa2.jpg", badge: "", category: "Beverages", sku: "BV-002", description: "Ready-to-drink cold coffee with rich taste." },

  // 🧴 Household Essentials
  { name: "Multipurpose Cleaner (1L)", price: "$7.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/10/18/06/1018066b6aab6305f2b7cbe4cf92af68.jpg", badge: "Hot", category: "Household Essentials", sku: "HE-001", description: "Powerful cleaner for all surfaces." },
  { name: "Organic Dish Wash (500ml)", price: "$4.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/28/b5/a4/28b5a4f2724d77a4d0c0b303fd8206a7.jpg", badge: "", category: "Household Essentials", sku: "HE-002", description: "Natural dishwashing liquid safe for hands." },

  // 💆 Personal Care
  { name: "Herbal Shampoo (250ml)", price: "$6.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/3e/53/26/3e5326f5442f1e4747dd5b2c8a2ed0ac.jpg", badge: "New", category: "Personal Care", sku: "PC-003", description: "Natural herbal shampoo for soft hair." },
  { name: "Aloe Vera Face Wash", price: "$5.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/8b/55/ff/8b55ff7b3f6bfc5bca97b0d0a15c0ec1.jpg", badge: "", category: "Personal Care", sku: "PC-004", description: "Gentle aloe-based face wash for daily use." },

  // 🐾 Pet Care
  { name: "Dog Biscuits (500g)", price: "$6.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/7c/62/8b/7c628be47375b2f53c9970071839e74d.jpg", badge: "Hot", category: "Pet Care", sku: "PT-001", description: "Crunchy and healthy dog biscuits." },
  { name: "Cat Food Pouch (85g)", price: "$2.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/0f/fb/6d/0ffb6d7b4f253b879ebcd3bdfa0adbe5.jpg", badge: "", category: "Pet Care", sku: "PT-002", description: "Nutritious cat food in gravy." },

  // 👶 Baby Care
  { name: "Baby Lotion (200ml)", price: "$4.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/b0/3f/11/b03f1185c3fd55699fa7081b7dcb0d93.jpg", badge: "", category: "Baby Care", sku: "BC-001", description: "Gentle baby lotion with natural oils." },
  { name: "Baby Diapers (Small 20pcs)", price: "$8.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/87/0d/6a/870d6ae5f15b3e3abf8eb51b2e9e0d0f.jpg", badge: "New", category: "Baby Care", sku: "BC-002", description: "Soft and leak-proof baby diapers." },

  // 🌿 Organic & Health Products
  { name: "Organic Honey (500ml)", price: "$14.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/7f/4d/50/7f4d503f0ddf73a895a18e51e8e538ed.jpg", badge: "", category: "Organic & Health Products", sku: "OH-001", description: "Pure organic honey from natural farms." },
  { name: "Cold Pressed Coconut Oil (1L)", price: "$16.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/4d/ae/9d/4dae9de3f44d4ca5d0aefd8f6ee845ab.jpg", badge: "Hot", category: "Organic & Health Products", sku: "OH-002", description: "Unrefined coconut oil for cooking and skincare." },

  // ❄️ Frozen Foods
  { name: "Frozen Peas (500g)", price: "$5.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/4a/46/b2/4a46b257b509d69f9b3941d4f4a1525d.jpg", badge: "Fresh", category: "Frozen Foods", sku: "FF-001", description: "Frozen green peas for quick cooking." },
  { name: "French Fries (1kg)", price: "$6.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/dc/d3/63/dcd36328f66cf029504446e2a39e1b74.jpg", badge: "Hot", category: "Frozen Foods", sku: "FF-002", description: "Crispy frozen french fries ready to fry." }
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

