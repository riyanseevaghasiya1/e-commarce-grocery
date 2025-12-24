
// Product Data - Shared across all pages
const allProducts = [
  // Fresh Produce
  {
    name: "Organic Spinach",
    price: "$3.50",
    rating: "★★★★★",
    img: "./images/Organic-Spinach.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 250,
    unit: "g",
    sku: "FP-001",
    description: "Fresh organic spinach leaves packed with nutrients.",
    images: ["./images/Organic-Spinach.jpg", "./images/Organic-Spinach1.jpg", "./images/Organic-Spinach2.jpg"]
  },
  {
    name: "Farm Fresh Tomatoes",
    price: "$4.00",
    rating: "★★★★☆",
    img: "./images/fresh-tamato.jpg",
    badge: "Save 5%",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-002",
    description: "Juicy tomatoes straight from local farms.",
    images: ["./images/fresh-tamato.jpg", "./images/fresh-tamato1.jpg", "./images/fresh-tamato2.jpg",]
  },

  // Bakery & Dairy
  {
    name: "Whole Wheat Bread",
    price: "$3.00",
    rating: "★★★★☆",
    img: "./images/bread.jpg",
    badge: "Fresh",
    category: "Bakery & Dairy",
    quantity: 1,
    unit: "pcs",
    sku: "BD-001",
    description: "Soft and freshly baked whole wheat bread.",
    images: ["./images/bread.jpg", "./images/bread1.jpg", "./images/bread2.jpg",]
  },
  {
    name: "Farm Fresh Milk",
    price: "$5.00",
    rating: "★★★★☆",
    img: "./images/fresh milk.webp",
    badge: "",
    category: "Bakery & Dairy",
    quantity: 1,
    unit: "L",
    sku: "BD-002",
    description: "Pure milk from local farms.",
    images: ["./images/fresh milk.webp", "./images/fresh milk1.avif", "./images/fresh milk2.png",]
  },

  // Staples & Grains
  {
    name: "Basmati Rice",
    price: "$25.00",
    rating: "★★★★★",
    img: "./images/basmati-rice.webp",
    badge: "Save 20%",
    category: "Staples & Grains",
    quantity: 5,
    unit: "Kg",
    sku: "SG-001",
    description: "Premium long-grain basmati rice.",
    images: ["./images/basmati-rice.webp", "./images/basmati-rice1.jpg", "./images/basmati-rice2.jpg",]
  },
  {
    name: "Wheat Flour",
    price: "$68.00",
    rating: "★★★★☆",
    img: "./images/Wheat-Flour.jpg",
    badge: "Save 8%",
    category: "Staples & Grains",
    quantity: 10,
    unit: "Kg",
    sku: "SG-002",
    description: "High-quality whole wheat flour for soft rotis.",
    images: ["./images/Wheat-Flour.jpg", "./images/Wheat-Flour1.png", "./images/Wheat-Flour2.jpg",]
  },

  // Masala & Spices
  {
    name: "Turmeric Powder",
    price: "$4.00",
    rating: "★★★★★",
    img: "./images/turmericpowder.jpg",
    badge: "",
    category: "Masala & Spices",
    quantity: 200,
    unit: "g",
    sku: "MS-001",
    description: "Pure turmeric powder for everyday cooking.",
    images: ["./images/turmericpowder.jpg", "./images/turmericpowder1.jpg", "./images/turmericpowder2.jpg",]
  },
  {
    name: "Cumin Seeds",
    price: "$5.50",
    rating: "★★★★★",
    img: "./images/cuminsseeds.jpg",
    badge: "Hot",
    category: "Masala & Spices",
    quantity: 250,
    unit: "g",
    sku: "MS-002",
    description: "Aromatic cumin seeds packed with flavor.",
    images: ["./images/cuminsseeds.jpg", "./images/cuminsseeds1.png", "./images/cuminsseeds2.jpg",]
  },

  // Snacks & Branded Foods
  {
    name: "Potato Chips",
    price: "$3.00",
    rating: "★★★★☆",
    img: "./images/potatochipssalted.png",
    badge: "Save 12%",
    category: "Snacks & Branded Foods",
    quantity: 1,
    unit: "pcs",
    sku: "SB-001",
    description: "Crispy and salty chips for perfect snacking.",
    images: ["./images/potatochipssalted.png", "./images/potatochipssalted1.jpg", "./images/potatochipssalted2.jpg",]
  },
  {
    name: "Salted Cashews",
    price: "$9.50",
    rating: "★★★★★",
    img: "./images/SaltedCashews.jpg",
    badge: "New",
    category: "Snacks & Branded Foods",
    quantity: 250,
    unit: "g",
    sku: "SB-002",
    description: "Crunchy salted cashews, a healthy snack.",
    images: ["./images/SaltedCashews.jpg", "./images/SaltedCashews1.png", "./images/SaltedCashews2.jpg",]
  },

  // Packaged & Canned Foods
  {
    name: "Masoor Dal",
    price: "$4.00",
    rating: "★★★★☆",
    img: "./images/masoordal.png",
    badge: "Save 5%",
    category: "Packaged & Canned Foods",
    quantity: 500,
    unit: "g",
    sku: "PC-001",
    description: "Ready-to-eat baked beans rich in protein.",
    images: ["./images/masoordal.png", "./images/masoordal1.jpg", "./images/masoordal2.jpg",]
  },
  {
    name: "Sweet Corn",
    price: "$3.50",
    rating: "★★★★★",
    img: "./images/sweetcorn.webp",
    badge: "Fresh",
    category: "Packaged & Canned Foods",
    quantity: 1,
    unit: "Kg",
    sku: "PC-002",
    description: "Sweet corn kernels in brine for instant use.",
    images: ["./images/sweetcorn.webp", "./images/sweetcorn1.jpg", "./images/sweetcorn2.jpg",]
  },

  // Beverages
  {
    name: "Orange Juice",
    price: "$7.00",
    rating: "★★★★★",
    img: "./images/orangejuice.webp",
    badge: "Save 2%",
    category: "Beverages",
    quantity: 1,
    unit: "L",
    sku: "BV-001",
    description: "Refreshing orange juice with no preservatives.",
    images: ["./images/orangejuice.webp", "./images/orangejuice1.jpg", "./images/orangejuice2.jpg",]
  },
  {
    name: "Cold Coffee",
    price: "$3.50",
    rating: "★★★★☆",
    img: "./images/coldcoffee.jpg",
    badge: "",
    category: "Beverages",
    quantity: 250,
    unit: "ml",
    sku: "BV-002",
    description: "Ready-to-drink cold coffee with rich taste.",
    images: ["./images/coldcoffee.jpg", "./images/coldcoffee1.jpg", "./images/coldcoffee2.avif",]
  },

  // Household Essentials
  {
    name: "Multipurpose Cleaner",
    price: "$7.00",
    rating: "★★★★★",
    img: "./images/MultipurposeCleaner.jpg",
    badge: "Hot",
    category: "Household Essentials",
    quantity: 1,
    unit: "L",
    sku: "HE-001",
    description: "Powerful cleaner for all surfaces.",
    images: ["./images/MultipurposeCleaner.jpg", "./images/MultipurposeCleaner1.jpg", "./images/MultipurposeCleaner2.png",]
  },
  {
    name: "Organic Dish Wash",
    price: "$4.50",
    rating: "★★★★☆",
    img: "./images/OrganicDishWash.jpg",
    badge: "Save 18%",
    category: "Household Essentials",
    quantity: 500,
    unit: "ml",
    sku: "HE-002",
    description: "Natural dishwashing liquid safe for hands.",
    images: ["./images/OrganicDishWash.jpg", "./images/OrganicDishWash1.jpg", "./images/OrganicDishWash2.jpg",]
  },

  // Personal Care
  {
    name: "Herbal Shampoo",
    price: "$6.00",
    rating: "★★★★☆",
    img: "./images/HerbalShampoo.png",
    badge: "Save 30%",
    category: "Personal Care",
    quantity: 250,
    unit: "ml",
    sku: "PC-003",
    description: "Natural herbal shampoo for soft hair.",
    images: ["./images/HerbalShampoo.png", "./images/HerbalShampoo1.jpg", "./images/HerbalShampoo2.jpg",]
  },
  {
    name: "Aloe Vera Face Wash",
    price: "$5.50",
    rating: "★★★★★",
    img: "./images/AloeVeraFaceWash.jpg",
    badge: "Save 5%",
    category: "Personal Care",
    quantity: 1,
    unit: "L",
    sku: "PC-004",
    description: "Gentle aloe-based face wash for daily use.",
    images: ["./images/AloeVeraFaceWash.jpg", "./images/AloeVeraFaceWash1.jpg", "./images/AloeVeraFaceWash2.jpg",]
  },

  // Pet Care
  {
    name: "Dog Biscuits",
    price: "$6.50",
    rating: "★★★★★",
    img: "./images/Dog Biscuits.jpg",
    badge: "Hot",
    category: "Pet Care",
    quantity: 500,
    unit: "g",
    sku: "PT-001",
    description: "Crunchy and healthy dog biscuits.",
    images: ["./images/Dog Biscuits.jpg", "./images/Dog Biscuits1.jpg", "./images/Dog Biscuits2.jpg",]
  },
  {
    name: "Cat Food Pouch",
    price: "$2.50",
    rating: "★★★★☆",
    img: "./images/CatFoodPouch.jpg",
    badge: "",
    category: "Pet Care",
    quantity: 85,
    unit: "g",
    sku: "PT-002",
    description: "Nutritious cat food in gravy.",
    images: ["./images/CatFoodPouch.jpg", "./images/CatFoodPouch1.avif", "./images/CatFoodPouch2.jpg",]
  },

  // Baby Care
  {
    name: "Baby Lotion",
    price: "$4.50",
    rating: "★★★★★",
    img: "./images/BabyLotion.webp",
    badge: "Save 18%",
    category: "Baby Care",
    quantity: 200,
    unit: "ml",
    sku: "BC-001",
    description: "Gentle baby lotion with natural oils.",
    images: ["./images/BabyLotion.webp", "./images/BabyLotion1.png", "./images/BabyLotion2.jpg",]
  },
  {
    name: "Baby Diapers",
    price: "$8.50",
    rating: "★★★★★",
    img: "./images/BabyDiapers.jpg",
    badge: "New",
    category: "Baby Care",
    quantity: 20,
    unit: "pcs",
    sku: "BC-002",
    description: "Soft and leak-proof baby diapers.",
    images: ["./images/BabyDiapers.jpg", "./images/BabyDiapers1.png", "./images/BabyDiapers2.png",]
  },

  // Organic & Health Products
  {
    name: "Organic Honey",
    price: "$14.00",
    rating: "★★★★★",
    img: "./images/OrganicHoney.webp",
    badge: "Save 6%",
    category: "Organic & Health Products",
    quantity: 500,
    unit: "ml",
    sku: "OH-001",
    description: "Pure organic honey from natural farms.",
    images: ["./images/OrganicHoney.webp", "./images/OrganicHoney1.jpg", "./images/OrganicHoney2.jpg",]
  },
  {
    name: "Cold Pressed Coconut Oil",
    price: "$16.00",
    rating: "★★★★★",
    img: "./images/ColdPressedCoconut Oil.webp",
    badge: "Hot",
    category: "Organic & Health Products",
    quantity: 1,
    unit: "L",
    sku: "OH-002",
    description: "Unrefined coconut oil for cooking and skincare.",
    images: ["./images/ColdPressedCoconut Oil.webp", "./images/ColdPressedCoconut Oil1.jpg", "./images/ColdPressedCoconut Oil2.jpg",]
  },

  // Frozen Foods
  {
    name: "Frozen Peas ",
    price: "$5.00",
    rating: "★★★★☆",
    img: "./images/FrozenPeas.webp",
    badge: "Save 10%",
    category: "Frozen Foods",
    quantity: 500,
    unit: "g",
    sku: "FF-001",
    description: "Frozen green peas for quick cooking.",
    images: ["./images/FrozenPeas.webp", "./images/FrozenPeas1.webp", "./images/FrozenPeas2.webp",]
  },
  {
    name: "French Fries",
    price: "$6.50",
    rating: "★★★★★",        
    img: "./images/Frozenfranchfries.jpg",
    badge: "Hot",
    category: "Frozen Foods",
    quantity: 1,
    unit: "Kg",
    sku: "FF-002",
    description: "Crispy frozen french fries ready to fry.",
    images: ["./images/Frozenfranchfries.jpg", "./images/Frozenfranchfries1.png", "./images/Frozenfranchfries2.png",]
  },
  {
    name: "Green Grapes",
    price: "$4.00",
    rating: "★★★★☆",
    img: "./images/green-grapes.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 500,  
    unit: "g",
    sku: "FP-003",
    description: "Fresh and juicy green grapes.",
    images: ["./images/green-grapes.jpg", "./images/green-grapes1.jpg", "./images/green-grapes2.jpg"]
  },
  {
    name: "Walnut Inshell",
    price: "$12.00",
    rating: "★★★★★",
    img: "./images/walnut-inshell.jpg",
    badge: "New",
    category: "Snacks & Branded Foods",
    quantity: 250,
    unit: "g",
    sku: "SB-003",
    description: "Crunchy and nutritious walnut inshell.",
    images: ["./images/walnut-inshell.jpg", "./images/walnut-inshell1.jpg", "./images/walnut-inshell2.jpg"]
  },
  {
    name: "Organic Onions",
    price: "$2.50",
    rating: "★★★★☆",
    img: "./images/onion.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-004",
    description: "Fresh organic onions for cooking.",
    images: ["./images/onion.jpg", "./images/onion1.jpg", "./images/onion2.jpg"]
  },
  {
    name: "Baked croissants",
    price: "$5.00",
    rating: "★★★★★",
    img: "./images/croissant.jpg",
    badge: "Fresh",
    category: "Bakery & Dairy",
    quantity: 4,
    unit: "pcs",
    sku: "BD-003",
    description: "Buttery and flaky baked croissants.",
    images: ["./images/croissant.jpg", "./images/croissant1.jpg", "./images/croissant2.jpg"]
  },
  {
    name: "Fresh Organic Carrots",
    price: "$3.00",
    rating: "★★★★☆",
    img: "./images/carrots.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-005",
    description: "Fresh and organic carrots for cooking.",
    images: ["./images/carrots.jpg", "./images/carrots1.jpg", "./images/carrots2.jpg"]
  },
  {
    name: "Black Pepper Powder",
    price: "$6.00",
    rating: "★★★★★",
    img: "./images/black-pepper.jpg",
    badge: "Hot",
    category: "Masala & Spices",
    quantity: 200,
    unit: "g",
    sku: "MS-003",
    description: "Aromatic black pepper powder for enhanced flavor.",
    images: ["./images/black-pepper.jpg", "./images/black-pepper1.jpg", "./images/black-pepper2.jpg"]
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

