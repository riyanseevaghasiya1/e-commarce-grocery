
// Product Data - Shared across all pages
const allProducts = [
  // 🥬 Fresh Produce
  { name: "Organic Spinach (250g)", price: "$3.50", rating: "★★★★★", img:"./images/Organic-Spinach.jpg", badge: "Fresh", category: "Fresh Produce", sku: "FP-001", description: "Fresh organic spinach leaves packed with nutrients." },
  { name: "Farm Fresh Tomatoes (1kg)", price: "$4.00", rating: "★★★★☆", img:"./images/fresh-tamato.jpg", badge: "New", category: "Fresh Produce", sku: "FP-002", description: "Juicy tomatoes straight from local farms." },

  // 🍞 Bakery & Dairy
  { name: "Whole Wheat Bread", price: "$3.00", rating: "★★★★☆", img: "./images/bread.jpg", badge: "Fresh", category: "Bakery & Dairy", sku: "BD-001", description: "Soft and freshly baked whole wheat bread." },
  { name: "Farm Fresh Milk (1L)", price: "$5.00", rating: "★★★★☆", img: "./images/fresh milk.webp", badge: "Hot", category: "Bakery & Dairy", sku: "BD-002", description: "Pure milk from local farms." },

  // 🌾 Staples & Grains
  { name: "Basmati Rice (5kg)", price: "$25.00", rating: "★★★★★", img: "./images/basmati-rice.webp", badge: "Save 20%", category: "Staples & Grains", sku: "SG-001", description: "Premium long-grain basmati rice." },
  { name: "Wheat Flour (10kg)", price: "$15.00", rating: "★★★★☆", img: "./images/Wheat-Flour.jpg", badge: "", category: "Staples & Grains", sku: "SG-002", description: "High-quality whole wheat flour for soft rotis." },

  // 🌶 Masala & Spices
  { name: "Turmeric Powder (200g)", price: "$4.00", rating: "★★★★★", img: "./images/turmericpowder.jpg", badge: "", category: "Masala & Spices", sku: "MS-001", description: "Pure turmeric powder for everyday cooking." },
  { name: "Cumin Seeds (250g)", price: "$5.50", rating: "★★★★★", img: "./images/cuminsseeds.jpg", badge: "Hot", category: "Masala & Spices", sku: "MS-002", description: "Aromatic cumin seeds packed with flavor." },

  // 🍿 Snacks & Branded Foods
  { name: "Potato Chips (Salted)", price: "$3.00", rating: "★★★★☆", img: "./images/potatochipssalted.png", badge: "", category: "Snacks & Branded Foods", sku: "SB-001", description: "Crispy and salty chips for perfect snacking." },
  { name: "Salted Cashews (250g)", price: "$9.50", rating: "★★★★★", img: "./images/SaltedCashews.jpg", badge: "New", category: "Snacks & Branded Foods", sku: "SB-002", description: "Crunchy salted cashews, a healthy snack." },

  // 🥫 Packaged & Canned Foods
  { name: "Baked Beans (400g)", price: "$4.00", rating: "★★★★☆", img: "./images/bakedbeens.jpg", badge: "", category: "Packaged & Canned Foods", sku: "PC-001", description: "Ready-to-eat baked beans rich in protein." },
  { name: "Sweet Corn (Tin)", price: "$3.50", rating: "★★★★★", img: "./images/sweetcorn.webp", badge: "Fresh", category: "Packaged & Canned Foods", sku: "PC-002", description: "Sweet corn kernels in brine for instant use." },

  // ☕ Beverages
  { name: "Orange Juice (1L)", price: "$7.00", rating: "★★★★★", img: "./images/orangejuice.webp", badge: "Hot", category: "Beverages", sku: "BV-001", description: "Refreshing orange juice with no preservatives." },
  { name: "Cold Coffee (300ml)", price: "$3.50", rating: "★★★★☆", img: "./images/coldcoffee.jpg", badge: "", category: "Beverages", sku: "BV-002", description: "Ready-to-drink cold coffee with rich taste." },

  // 🧴 Household Essentials
  { name: "Multipurpose Cleaner (1L)", price: "$7.00", rating: "★★★★★", img: "./images/MultipurposeCleaner.jpg", badge: "Hot", category: "Household Essentials", sku: "HE-001", description: "Powerful cleaner for all surfaces." },
  { name: "Organic Dish Wash (500ml)", price: "$4.50", rating: "★★★★☆", img: "./images/OrganicDishWash.jpg", badge: "", category: "Household Essentials", sku: "HE-002", description: "Natural dishwashing liquid safe for hands." },

  // 💆 Personal Care
  { name: "Herbal Shampoo (250ml)", price: "$6.00", rating: "★★★★☆", img: "./images/HerbalShampoo.png", badge: "New", category: "Personal Care", sku: "PC-003", description: "Natural herbal shampoo for soft hair." },
  { name: "Aloe Vera Face Wash", price: "$5.50", rating: "★★★★★", img: "./images/AloeVeraFaceWash.jpg", badge: "", category: "Personal Care", sku: "PC-004", description: "Gentle aloe-based face wash for daily use." },

  // 🐾 Pet Care
  { name: "Dog Biscuits (500g)", price: "$6.50", rating: "★★★★★", img: "./images/Dog Biscuits.jpg", badge: "Hot", category: "Pet Care", sku: "PT-001", description: "Crunchy and healthy dog biscuits." },
  { name: "Cat Food Pouch (85g)", price: "$2.50", rating: "★★★★☆", img: "./images/CatFoodPouch.jpg", badge: "", category: "Pet Care", sku: "PT-002", description: "Nutritious cat food in gravy." },

  // 👶 Baby Care
  { name: "Baby Lotion (200ml)", price: "$4.50", rating: "★★★★★", img: "./images/BabyLotion.webp", badge: "", category: "Baby Care", sku: "BC-001", description: "Gentle baby lotion with natural oils." },
  { name: "Baby Diapers (Small 20pcs)", price: "$8.50", rating: "★★★★★", img: "./images/BabyDiapers.jpg", badge: "New", category: "Baby Care", sku: "BC-002", description: "Soft and leak-proof baby diapers." },

  // 🌿 Organic & Health Products
  { name: "Organic Honey (500ml)", price: "$14.00", rating: "★★★★★", img: "./images/OrganicHoney.webp", badge: "", category: "Organic & Health Products", sku: "OH-001", description: "Pure organic honey from natural farms." },
  { name: "Cold Pressed Coconut Oil (1L)", price: "$16.00", rating: "★★★★★", img: "./images/ColdPressedCoconut Oil.webp", badge: "Hot", category: "Organic & Health Products", sku: "OH-002", description: "Unrefined coconut oil for cooking and skincare." },

  // ❄️ Frozen Foods
  { name: "Frozen Peas (500g)", price: "$5.00", rating: "★★★★☆", img: "./images/FrozenPeas.webp", badge: "Fresh", category: "Frozen Foods", sku: "FF-001", description: "Frozen green peas for quick cooking." },
  { name: "French Fries (1kg)", price: "$6.50", rating: "★★★★★", img: "./images/Frozenfranchfries.jpg", badge: "Hot", category: "Frozen Foods", sku: "FF-002", description: "Crispy frozen french fries ready to fry." }
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

