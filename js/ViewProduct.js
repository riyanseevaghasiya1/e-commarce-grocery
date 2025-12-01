
// Product Data - Shared across all pages
const allProducts = [
  // Fresh Produce
  {
    name: "Organic Spinach (250g)", price: "$3.50", rating: "★★★★★", img: "./images/Organic-Spinach.jpg", badge: "Fresh", category: "Fresh Produce", sku: "FP-001", description: "Fresh organic spinach leaves packed with nutrients.",
    images: ["./images/Organic-Spinach.jpg", "./images/Organic-Spinach1.jpg", "./images/Organic-Spinach2.jpg"]
  },
  {
    name: "Farm Fresh Tomatoes (1kg)", price: "$4.00", rating: "★★★★☆", img: "./images/fresh-tamato.jpg", badge: "New", category: "Fresh Produce", sku: "FP-002", description: "Juicy tomatoes straight from local farms.",
    images: ["./images/fresh-tamato.jpg", "./images/fresh-tamato1.jpg", "./images/fresh-tamato2.jpg",]
  },

  // Bakery & Dairy
  {
    name: "Whole Wheat Bread", price: "$3.00", rating: "★★★★☆", img: "./images/bread.jpg", badge: "Fresh", category: "Bakery & Dairy", sku: "BD-001", description: "Soft and freshly baked whole wheat bread.",
    images: ["./images/bread.jpg", "./images/bread1.jpg", "./images/bread2.jpg",]
  },
  {
    name: "Farm Fresh Milk (1L)", price: "$5.00", rating: "★★★★☆", img: "./images/fresh milk.webp", badge: "Hot", category: "Bakery & Dairy", sku: "BD-002", description: "Pure milk from local farms.",
    images: ["./images/fresh milk.webp", "./images/fresh milk1.avif", "./images/fresh milk2.png",]
  },

  // Staples & Grains
  {
    name: "Basmati Rice (5kg)", price: "$25.00", rating: "★★★★★", img: "./images/basmati-rice.webp", badge: "Save 20%", category: "Staples & Grains", sku: "SG-001", description: "Premium long-grain basmati rice.",
    images: ["./images/basmati-rice.webp", "./images/basmati-rice1.jpg", "./images/basmati-rice2.jpg",]
  },
  {
    name: "Wheat Flour (10kg)", price: "$15.00", rating: "★★★★☆", img: "./images/Wheat-Flour.jpg", badge: "", category: "Staples & Grains", sku: "SG-002", description: "High-quality whole wheat flour for soft rotis.",
    images: ["./images/Wheat-Flour.jpg", "./images/Wheat-Flour1.png", "./images/Wheat-Flour2.jpg",]
  },

  // Masala & Spices
  {
    name: "Turmeric Powder (200g)", price: "$4.00", rating: "★★★★★", img: "./images/turmericpowder.jpg", badge: "", category: "Masala & Spices", sku: "MS-001", description: "Pure turmeric powder for everyday cooking.",
    images: ["./images/turmericpowder.jpg", "./images/turmericpowder1.jpg", "./images/turmericpowder2.jpg",]
  },
  {
    name: "Cumin Seeds (250g)", price: "$5.50", rating: "★★★★★", img: "./images/cuminsseeds.jpg", badge: "Hot", category: "Masala & Spices", sku: "MS-002", description: "Aromatic cumin seeds packed with flavor.",
    images: ["./images/cuminsseeds.jpg", "./images/cuminsseeds1.png", "./images/cuminsseeds2.jpg",]
  },

  // Snacks & Branded Foods
  {
    name: "Potato Chips (Salted)", price: "$3.00", rating: "★★★★☆", img: "./images/potatochipssalted.png", badge: "", category: "Snacks & Branded Foods", sku: "SB-001", description: "Crispy and salty chips for perfect snacking.",
    images: ["./images/potatochipssalted.png", "./images/potatochipssalted1.jpg", "./images/potatochipssalted2.jpg",]
  },
  {
    name: "Salted Cashews (250g)", price: "$9.50", rating: "★★★★★", img: "./images/SaltedCashews.jpg", badge: "New", category: "Snacks & Branded Foods", sku: "SB-002", description: "Crunchy salted cashews, a healthy snack.",
    images: ["./images/SaltedCashews.jpg", "./images/SaltedCashews1.png", "./images/SaltedCashews2.jpg",]
  },

  // Packaged & Canned Foods
  {
    name: "Baked Beans (400g)", price: "$4.00", rating: "★★★★☆", img: "./images/bakedbeens.jpg", badge: "", category: "Packaged & Canned Foods", sku: "PC-001", description: "Ready-to-eat baked beans rich in protein.",
    images: ["./images/bakedbeens.jpg", "./images/bakedbeens1.jpg", "./images/bakedbeens2.jpg",]
  },
  {
    name: "Sweet Corn (Tin)", price: "$3.50", rating: "★★★★★", img: "./images/sweetcorn.webp", badge: "Fresh", category: "Packaged & Canned Foods", sku: "PC-002", description: "Sweet corn kernels in brine for instant use.",
    images: ["./images/sweetcorn.webp", "./images/sweetcorn1.jpg", "./images/sweetcorn2.jpg",]
  },

  // Beverages
  {
    name: "Orange Juice (1L)", price: "$7.00", rating: "★★★★★", img: "./images/orangejuice.webp", badge: "Hot", category: "Beverages", sku: "BV-001", description: "Refreshing orange juice with no preservatives.",
    images: ["./images/orangejuice.webp", "./images/orangejuice1.jpg", "./images/orangejuice2.jpg",]
  },
  {
    name: "Cold Coffee (300ml)", price: "$3.50", rating: "★★★★☆", img: "./images/coldcoffee.jpg", badge: "", category: "Beverages", sku: "BV-002", description: "Ready-to-drink cold coffee with rich taste.",
    images: ["./images/coldcoffee.jpg", "./images/coldcoffee1.jpg", "./images/coldcoffee2.avif",]
  },

  // Household Essentials
  {
    name: "Multipurpose Cleaner (1L)", price: "$7.00", rating: "★★★★★", img: "./images/MultipurposeCleaner.jpg", badge: "Hot", category: "Household Essentials", sku: "HE-001", description: "Powerful cleaner for all surfaces.",
    images: ["./images/MultipurposeCleaner.jpg", "./images/MultipurposeCleaner1.jpg", "./images/MultipurposeCleaner2.png",]
  },
  {
    name: "Organic Dish Wash (500ml)", price: "$4.50", rating: "★★★★☆", img: "./images/OrganicDishWash.jpg", badge: "", category: "Household Essentials", sku: "HE-002", description: "Natural dishwashing liquid safe for hands.",
    images: ["./images/OrganicDishWash.jpg", "./images/OrganicDishWash1.jpg", "./images/OrganicDishWash2.jpg",]
  },

  // Personal Care
  {
    name: "Herbal Shampoo (250ml)", price: "$6.00", rating: "★★★★☆", img: "./images/HerbalShampoo.png", badge: "New", category: "Personal Care", sku: "PC-003", description: "Natural herbal shampoo for soft hair.",
    images: ["./images/HerbalShampoo.png", "./images/HerbalShampoo1.jpg", "./images/HerbalShampoo2.jpg",]
  },
  {
    name: "Aloe Vera Face Wash", price: "$5.50", rating: "★★★★★", img: "./images/AloeVeraFaceWash.jpg", badge: "", category: "Personal Care", sku: "PC-004", description: "Gentle aloe-based face wash for daily use.",
    images: ["./images/AloeVeraFaceWash.jpg", "./images/AloeVeraFaceWash1.jpg", "./images/AloeVeraFaceWash2.jpg",]
  },

  // Pet Care
  {
    name: "Dog Biscuits (500g)", price: "$6.50", rating: "★★★★★", img: "./images/Dog Biscuits.jpg", badge: "Hot", category: "Pet Care", sku: "PT-001", description: "Crunchy and healthy dog biscuits.",
    images: ["./images/Dog Biscuits.jpg", "./images/Dog Biscuits1.jpg", "./images/Dog Biscuits2.jpg",]
  },
  {
    name: "Cat Food Pouch (85g)", price: "$2.50", rating: "★★★★☆", img: "./images/CatFoodPouch.jpg", badge: "", category: "Pet Care", sku: "PT-002", description: "Nutritious cat food in gravy.",
    images: ["./images/CatFoodPouch.jpg", "./images/CatFoodPouch1.avif", "./images/CatFoodPouch2.jpg",]
  },

  // Baby Care
  {
    name: "Baby Lotion (200ml)", price: "$4.50", rating: "★★★★★", img: "./images/BabyLotion.webp", badge: "", category: "Baby Care", sku: "BC-001", description: "Gentle baby lotion with natural oils.",
    images: ["./images/BabyLotion.webp", "./images/BabyLotion1.png", "./images/BabyLotion2.jpg",]
  },
  {
    name: "Baby Diapers (Small 20pcs)", price: "$8.50", rating: "★★★★★", img: "./images/BabyDiapers.jpg", badge: "New", category: "Baby Care", sku: "BC-002", description: "Soft and leak-proof baby diapers.",
    images: ["./images/BabyDiapers.jpg", "./images/BabyDiapers1.png", "./images/BabyDiapers2.png",]
  },

  // Organic & Health Products
  {
    name: "Organic Honey (500ml)", price: "$14.00", rating: "★★★★★", img: "./images/OrganicHoney.webp", badge: "", category: "Organic & Health Products", sku: "OH-001", description: "Pure organic honey from natural farms.",
    images: ["./images/OrganicHoney.webp", "./images/OrganicHoney1.jpg", "./images/OrganicHoney2.jpg",]
  },
  {
    name: "Cold Pressed Coconut Oil (1L)", price: "$16.00", rating: "★★★★★", img: "./images/ColdPressedCoconut Oil.webp", badge: "Hot", category: "Organic & Health Products", sku: "OH-002", description: "Unrefined coconut oil for cooking and skincare.",
    images: ["./images/ColdPressedCoconut Oil.webp", "./images/ColdPressedCoconut Oil1.jpg", "./images/ColdPressedCoconut Oil2.jpg",]
  },

  // Frozen Foods
  {
    name: "Frozen Peas (500g)", price: "$5.00", rating: "★★★★☆", img: "./images/FrozenPeas.webp", badge: "Fresh", category: "Frozen Foods", sku: "FF-001", description: "Frozen green peas for quick cooking.",
    images: ["./images/FrozenPeas.webp", "./images/FrozenPeas1.webp", "./images/FrozenPeas2.webp",]
  },
  {
    name: "French Fries (1kg)", price: "$6.50", rating: "★★★★★", img: "./images/Frozenfranchfries.jpg", badge: "Hot", category: "Frozen Foods", sku: "FF-002", description: "Crispy frozen french fries ready to fry.",
    images: ["./images/Frozenfranchfries.jpg", "./images/Frozenfranchfries1.png", "./images/Frozenfranchfries2.png",]
  }
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

