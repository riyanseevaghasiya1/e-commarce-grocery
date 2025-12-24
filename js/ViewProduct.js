
// Product Data - Shared across all pages
const allProducts = [
  {
    name: "Organic Spinach",
    basePrice: 14.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/Organic-Spinach.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 250,
    unit: "g",
    sku: "FP-001",
    description: "Fresh organic spinach leaves packed with nutrients.",
    images: ["./images/Organic-Spinach.jpg", "./images/Organic-Spinach1.jpg", "./images/Organic-Spinach2.jpg"],
    options: [
      { label: "250g", multiplier: 0.25 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Farm Fresh Tomatoes",
    basePrice: 4.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/fresh-tamato.jpg",
    badge: "Save 5%",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-002",
    description: "Juicy tomatoes straight from local farms.",
    images: ["./images/fresh-tamato.jpg", "./images/fresh-tamato1.jpg", "./images/fresh-tamato2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Whole Wheat Bread",
    basePrice: 3.0,
    baseUnit: "pcs",
    rating: "★★★★☆",
    img: "./images/bread.jpg",
    badge: "Fresh",
    category: "Bakery & Dairy",
    quantity: 1,
    unit: "pcs",
    sku: "BD-001",
    description: "Soft and freshly baked whole wheat bread.",
    images: ["./images/bread.jpg", "./images/bread1.jpg", "./images/bread2.jpg"],
    options: [
      { label: "1 pcs", multiplier: 1 },
      { label: "2 pcs", multiplier: 2 },
      { label: "5 pcs", multiplier: 5 },
      { label: "10 pcs", multiplier: 10 }
    ]
  },
  {
    name: "Farm Fresh Milk",
    basePrice: 5.0,
    baseUnit: "L",
    rating: "★★★★☆",
    img: "./images/fresh milk.webp",
    badge: "",
    category: "Bakery & Dairy",
    quantity: 1,
    unit: "L",
    sku: "BD-002",
    description: "Pure milk from local farms.",
    images: ["./images/fresh milk.webp", "./images/fresh milk1.avif", "./images/fresh milk2.png"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Basmati Rice",
    basePrice: 5.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/basmati-rice.webp",
    badge: "Save 20%",
    category: "Staples & Grains",
    quantity: 5,
    unit: "Kg",
    sku: "SG-001",
    description: "Premium long-grain basmati rice.",
    images: ["./images/basmati-rice.webp", "./images/basmati-rice1.jpg", "./images/basmati-rice2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Wheat Flour",
    basePrice: 6.8,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/Wheat-Flour.jpg",
    badge: "Save 8%",
    category: "Staples & Grains",
    quantity: 1,
    unit: "Kg",
    sku: "SG-002",
    description: "High-quality whole wheat flour for soft rotis.",
    images: ["./images/Wheat-Flour.jpg", "./images/Wheat-Flour1.png", "./images/Wheat-Flour2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Turmeric Powder",
    basePrice: 20.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/turmericpowder.jpg",
    badge: "",
    category: "Masala & Spices",
    quantity: 200,
    unit: "g",
    sku: "MS-001",
    description: "Pure turmeric powder for everyday cooking.",
    images: ["./images/turmericpowder.jpg", "./images/turmericpowder1.jpg", "./images/turmericpowder2.jpg"],
    options: [
      { label: "100g", multiplier: 0.1 },
      { label: "200g", multiplier: 0.2 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 }
    ]
  },
  {
    name: "Cumin Seeds",
    basePrice: 22.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/cuminsseeds.jpg",
    badge: "Hot",
    category: "Masala & Spices",
    quantity: 250,
    unit: "g",
    sku: "MS-002",
    description: "Aromatic cumin seeds packed with flavor.",
    images: ["./images/cuminsseeds.jpg", "./images/cuminsseeds1.png", "./images/cuminsseeds2.jpg"],
    options: [
      { label: "250g", multiplier: 0.25 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Potato Chips",
    basePrice: 3.0,
    baseUnit: "pcs",
    rating: "★★★★☆",
    img: "./images/potatochipssalted.png",
    badge: "Save 12%",
    category: "Snacks & Branded Foods",
    quantity: 1,
    unit: "pcs",
    sku: "SB-001",
    description: "Crispy and salty chips for perfect snacking.",
    images: ["./images/potatochipssalted.png", "./images/potatochipssalted1.jpg", "./images/potatochipssalted2.jpg"],
    options: [
      { label: "1 pcs", multiplier: 1 },
      { label: "2 pcs", multiplier: 2 },
      { label: "5 pcs", multiplier: 5 },
      { label: "10 pcs", multiplier: 10 }
    ]
  },
  {
    name: "Salted Cashews",
    basePrice: 38.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/SaltedCashews.jpg",
    badge: "New",
    category: "Snacks & Branded Foods",
    quantity: 250,
    unit: "g",
    sku: "SB-002",
    description: "Crunchy salted cashews, a healthy snack.",
    images: ["./images/SaltedCashews.jpg", "./images/SaltedCashews1.png", "./images/SaltedCashews2.jpg"],
    options: [
      { label: "250g", multiplier: 0.25 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Masoor Dal",
    basePrice: 8.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/masoordal.png",
    badge: "Save 5%",
    category: "Packaged & Canned Foods",
    quantity: 500,
    unit: "g",
    sku: "PC-001",
    description: "Ready-to-eat baked beans rich in protein.",
    images: ["./images/masoordal.png", "./images/masoordal1.jpg", "./images/masoordal2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Sweet Corn",
    basePrice: 3.5,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/sweetcorn.webp",
    badge: "Fresh",
    category: "Packaged & Canned Foods",
    quantity: 1,
    unit: "Kg",
    sku: "PC-002",
    description: "Sweet corn kernels in brine for instant use.",
    images: ["./images/sweetcorn.webp", "./images/sweetcorn1.jpg", "./images/sweetcorn2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Orange Juice",
    basePrice: 7.0,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/orangejuice.webp",
    badge: "Save 2%",
    category: "Beverages",
    quantity: 1,
    unit: "L",
    sku: "BV-001",
    description: "Refreshing orange juice with no preservatives.",
    images: ["./images/orangejuice.webp", "./images/orangejuice1.jpg", "./images/orangejuice2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Cold Coffee",
    basePrice: 14.0,
    baseUnit: "L",
    rating: "★★★★☆",
    img: "./images/coldcoffee.jpg",
    badge: "",
    category: "Beverages",
    quantity: 250,
    unit: "ml",
    sku: "BV-002",
    description: "Ready-to-drink cold coffee with rich taste.",
    images: ["./images/coldcoffee.jpg", "./images/coldcoffee1.jpg", "./images/coldcoffee2.avif"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Multipurpose Cleaner",
    basePrice: 7.0,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/MultipurposeCleaner.jpg",
    badge: "Hot",
    category: "Household Essentials",
    quantity: 1,
    unit: "L",
    sku: "HE-001",
    description: "Powerful cleaner for all surfaces.",
    images: ["./images/MultipurposeCleaner.jpg", "./images/MultipurposeCleaner1.jpg", "./images/MultipurposeCleaner2.png"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Organic Dish Wash",
    basePrice: 9.0,
    baseUnit: "L",
    rating: "★★★★☆",
    img: "./images/OrganicDishWash.jpg",
    badge: "Save 18%",
    category: "Household Essentials",
    quantity: 500,
    unit: "ml",
    sku: "HE-002",
    description: "Natural dishwashing liquid safe for hands.",
    images: ["./images/OrganicDishWash.jpg", "./images/OrganicDishWash1.jpg", "./images/OrganicDishWash2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Herbal Shampoo",
    basePrice: 24.0,
    baseUnit: "L",
    rating: "★★★★☆",
    img: "./images/HerbalShampoo.png",
    badge: "Save 30%",
    category: "Personal Care",
    quantity: 250,
    unit: "ml",
    sku: "PC-003",
    description: "Natural herbal shampoo for soft hair.",
    images: ["./images/HerbalShampoo.png", "./images/HerbalShampoo1.jpg", "./images/HerbalShampoo2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Aloe Vera Face Wash",
    basePrice: 5.5,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/AloeVeraFaceWash.jpg",
    badge: "Save 5%",
    category: "Personal Care",
    quantity: 1,
    unit: "L",
    sku: "PC-004",
    description: "Gentle aloe-based face wash for daily use.",
    images: ["./images/AloeVeraFaceWash.jpg", "./images/AloeVeraFaceWash1.jpg", "./images/AloeVeraFaceWash2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Dog Biscuits",
    basePrice: 13.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/Dog Biscuits.jpg",
    badge: "Hot",
    category: "Pet Care",
    quantity: 500,
    unit: "g",
    sku: "PT-001",
    description: "Crunchy and healthy dog biscuits.",
    images: ["./images/Dog Biscuits.jpg", "./images/Dog Biscuits1.jpg", "./images/Dog Biscuits2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Cat Food Pouch",
    basePrice: 29.41,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/CatFoodPouch.jpg",
    badge: "",
    category: "Pet Care",
    quantity: 85,
    unit: "g",
    sku: "PT-002",
    description: "Nutritious cat food in gravy.",
    images: ["./images/CatFoodPouch.jpg", "./images/CatFoodPouch1.avif", "./images/CatFoodPouch2.jpg"],
    options: [
      { label: "85g", multiplier: 0.085 },
      { label: "170g", multiplier: 0.17 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 }
    ]
  },
  {
    name: "Baby Lotion",
    basePrice: 22.5,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/BabyLotion.webp",
    badge: "Save 18%",
    category: "Baby Care",
    quantity: 200,
    unit: "ml",
    sku: "BC-001",
    description: "Gentle baby lotion with natural oils.",
    images: ["./images/BabyLotion.webp", "./images/BabyLotion1.png", "./images/BabyLotion2.jpg"],
    options: [
      { label: "200 ml", multiplier: 0.2 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Baby Diapers",
    basePrice: 0.425,
    baseUnit: "pcs",
    rating: "★★★★★",
    img: "./images/BabyDiapers.jpg",
    badge: "New",
    category: "Baby Care",
    quantity: 20,
    unit: "pcs",
    sku: "BC-002",
    description: "Soft and leak-proof baby diapers.",
    images: ["./images/BabyDiapers.jpg", "./images/BabyDiapers1.png", "./images/BabyDiapers2.png"],
    options: [
      { label: "10 pcs", multiplier: 10 },
      { label: "20 pcs", multiplier: 20 },
      { label: "30 pcs", multiplier: 30 },
      { label: "40 pcs", multiplier: 40 }
    ]
  },
  {
    name: "Organic Honey",
    basePrice: 28.0,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/OrganicHoney.webp",
    badge: "Save 6%",
    category: "Organic & Health Products",
    quantity: 500,
    unit: "ml",
    sku: "OH-001",
    description: "Pure organic honey from natural farms.",
    images: ["./images/OrganicHoney.webp", "./images/OrganicHoney1.jpg", "./images/OrganicHoney2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Cold Pressed Coconut Oil",
    basePrice: 16.0,
    baseUnit: "L",
    rating: "★★★★★",
    img: "./images/ColdPressedCoconut Oil.webp",
    badge: "Hot",
    category: "Organic & Health Products",
    quantity: 1,
    unit: "L",
    sku: "OH-002",
    description: "Unrefined coconut oil for cooking and skincare.",
    images: ["./images/ColdPressedCoconut Oil.webp", "./images/ColdPressedCoconut Oil1.jpg", "./images/ColdPressedCoconut Oil2.jpg"],
    options: [
      { label: "250 ml", multiplier: 0.25 },
      { label: "500 ml", multiplier: 0.5 },
      { label: "1 L", multiplier: 1 },
      { label: "2 L", multiplier: 2 }
    ]
  },
  {
    name: "Frozen Peas ",
    basePrice: 10.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/FrozenPeas.webp",
    badge: "Save 10%",
    category: "Frozen Foods",
    quantity: 500,
    unit: "g",
    sku: "FF-001",
    description: "Frozen green peas for quick cooking.",
    images: ["./images/FrozenPeas.webp", "./images/FrozenPeas1.webp", "./images/FrozenPeas2.webp"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "French Fries",
    basePrice: 6.5,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/Frozenfranchfries.jpg",
    badge: "Hot",
    category: "Frozen Foods",
    quantity: 1,
    unit: "Kg",
    sku: "FF-002",
    description: "Crispy frozen french fries ready to fry.",
    images: ["./images/Frozenfranchfries.jpg", "./images/Frozenfranchfries1.png", "./images/Frozenfranchfries2.png"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Green Grapes",
    basePrice: 8.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/green-grapes.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 500,
    unit: "g",
    sku: "FP-003",
    description: "Fresh and juicy green grapes.",
    images: ["./images/green-grapes.jpg", "./images/green-grapes1.jpg", "./images/green-grapes2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Walnut Inshell",
    basePrice: 48.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/walnut-inshell.jpg",
    badge: "New",
    category: "Snacks & Branded Foods",
    quantity: 250,
    unit: "g",
    sku: "SB-003",
    description: "Crunchy and nutritious walnut inshell.",
    images: ["./images/walnut-inshell.jpg", "./images/walnut-inshell1.jpg", "./images/walnut-inshell2.jpg"],
    options: [
      { label: "250g", multiplier: 0.25 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Organic Onions",
    basePrice: 28.5,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/onion.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-004",
    description: "Fresh organic onions for cooking.",
    images: ["./images/onion.jpg", "./images/onion1.jpg", "./images/onion2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Baked croissants",
    basePrice: 1.25,
    baseUnit: "pcs",
    rating: "★★★★★",
    img: "./images/croissant.jpg",
    badge: "Fresh",
    category: "Bakery & Dairy",
    quantity: 4,
    unit: "pcs",
    sku: "BD-003",
    description: "Buttery and flaky baked croissants.",
    images: ["./images/croissant.jpg", "./images/croissant1.jpg", "./images/croissant2.jpg"],
    options: [
      { label: "1 pcs", multiplier: 1 },
      { label: "4 pcs", multiplier: 4 },
      { label: "8 pcs", multiplier: 8 },
      { label: "12 pcs", multiplier: 12 }
    ]
  },
  {
    name: "Fresh Organic Carrots",
    basePrice: 3.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/carrots.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-005",
    description: "Fresh and organic carrots for cooking.",
    images: ["./images/carrots.jpg", "./images/carrots1.jpg", "./images/carrots2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Black Pepper Powder",
    basePrice: 30.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/black-pepper.jpg",
    badge: "Hot",
    category: "Masala & Spices",
    quantity: 200,
    unit: "g",
    sku: "MS-003",
    description: "Aromatic black pepper powder for enhanced flavor.",
    images: ["./images/black-pepper.jpg", "./images/black-pepper1.jpg", "./images/black-pepper2.jpg"],
    options: [
      { label: "200g", multiplier: 0.2 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Mix Dryfruits",
    basePrice: 45.0,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/dryfruits.jpg",
    badge: "New",
    category: "Snacks & Branded Foods",
    quantity: 250,
    unit: "g",
    sku: "SB-004",
    description: "Healthy mix of assorted dry fruits.",
    images: ["./images/dryfruits.jpg", "./images/dryfruits1.jpg", "./images/dryfruits2.jpg"],
    options: [
      { label: "250g", multiplier: 0.25 },
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 }
    ]
  },
  {
    name: "Packed Green Beans",
    basePrice: 12.0,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/green-beans.jpg",
    badge: "Fresh",
    category: "Frozen Foods",
    quantity: 500,
    unit: "g",
    sku: "FF-003",
    description: "Fresh green beans packed for convenience.",
    images: ["./images/green-beans.jpg", "./images/green-beans1.jpg", "./images/green-beans2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Sparkling Soft Drinks",
    basePrice: 20.00,
    baseUnit: "l",
    rating: "★★★★☆",
    img: "./images/soft-drinks.jpg",
    badge: "Cold",
    category: "Beverages",
    quantity: 1,
    unit: "bottle",
    sku: "BV-004",
    description: "Refreshing sparkling soft drinks.",
    images: ["./images/soft-drinks.jpg", "./images/soft-drinks1.jpg", "./images/soft-drinks2.jpg"],
    options: [
      { label: "1 bottle", multiplier: 1 },
      { label: "2 bottles", multiplier: 2 },
      { label: "6 bottles", multiplier: 6 },
      { label: "12 bottles", multiplier: 12 }
    ]
  },
  {
    name: "Organic Orange",
    basePrice: 8.80,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/orange.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-006",
    description: "Fresh and organic orange for cooking.",
    images: ["./images/orange.jpg", "./images/orange1.jpg", "./images/orange2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Organic Green Cabbage",
    basePrice: 3.50,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/green-cabbage.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-007",
    description: "Fresh and organic green cabbage for cooking.",
    images: ["./images/green-cabbage.jpg", "./images/green-cabbage1.jpg", "./images/green-cabbage2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Organic Fresh Strawberry",
    basePrice: 7.50,
    baseUnit: "kg",
    rating: "★★★★★",
    img: "./images/strawberry.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-008",
    description: "Fresh and organic strawberry for cooking.",
    images: ["./images/strawberry.jpg", "./images/strawberry1.jpg", "./images/strawberry2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
  },
  {
    name: "Organic Broccoli",
    basePrice: 8.00,
    baseUnit: "kg",
    rating: "★★★★☆",
    img: "./images/broccoli.jpg",
    badge: "Fresh",
    category: "Fresh Produce",
    quantity: 1,
    unit: "Kg",
    sku: "FP-009",
    description: "Fresh and organic broccoli for cooking.",
    images: ["./images/broccoli.jpg", "./images/broccoli1.jpg", "./images/broccoli2.jpg"],
    options: [
      { label: "500g", multiplier: 0.5 },
      { label: "1 Kg", multiplier: 1 },
      { label: "2 Kg", multiplier: 2 },
      { label: "5 Kg", multiplier: 5 }
    ]
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

